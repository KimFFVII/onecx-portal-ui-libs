import { inject, Injectable } from '@angular/core'
import { MissingTranslationHandler, MissingTranslationHandlerParams, Translation } from '@ngx-translate/core'
import { getNormalizedBrowserLocales } from '@onecx/accelerator'
import { UserService } from '@onecx/angular-integration-interface'
import { Observable, of, throwError } from 'rxjs'
import { catchError, map, mergeMap, shareReplay, take } from 'rxjs/operators'

// in angularaccelerator should extend this
@Injectable()
export class CustomMissingTranslationHandler implements MissingTranslationHandler {
  private readonly userService = inject(UserService)
  handle(params: MissingTranslationHandlerParams): Translation | Observable<Translation> {
    const locales$ = this.userService.profile$.pipe(
      map((p) => {
        if (p.accountSettings?.localeAndTimeSettings?.locales) {
          return p.accountSettings?.localeAndTimeSettings?.locales
        }
        return getNormalizedBrowserLocales()
      }),
      take(1),
      shareReplay(1)
    )

    return loadTranslations(locales$, params)
  }
}

function dummyLoad(lang: string, params: MissingTranslationHandlerParams): Observable<any> {
  console.log('dummyLoad', lang)
  // translateService -> reloadLang
  // check if the key is there check the type
  // if interpolateFunction then call this with interpolatparams
  // or string return

  return params.translateService.reloadLang(lang).pipe(
    map((interpolatableTranslationObject) => {
      if (params.key in interpolatableTranslationObject) {
        return interpolatableTranslationObject[params.key]
      } else {
        return throwError(() => 'no key found')
      }
    })
  )
}

export function loadTranslations(
  langConfig: Observable<string[]>,
  params: MissingTranslationHandlerParams
): Observable<Translation> {
  return langConfig.pipe(
    mergeMap((l) => {
      const langs = [...l]
      const chain = (o: Observable<string[]>): Observable<any> => {
        return o.pipe(
          mergeMap((lang) => {
            return dummyLoad(lang[0], params)
          }),
          catchError(() => {
            langs.shift()
            if (langs.length) {
              return chain(of(langs))
            }
            return throwError(() => 'not found')
          })
        )
      }
      return chain(of(langs))
    })
  )
}
