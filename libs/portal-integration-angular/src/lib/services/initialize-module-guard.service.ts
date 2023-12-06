import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import { filter, from, map, mergeMap, Observable, of } from 'rxjs'
import { AppStateService } from './app-state.service'
import { ConfigurationService } from './configuration.service'
import { UserService } from './user.service'

@Injectable()
export class InitializeModuleGuard implements CanActivate {
  private SUPPORTED_LANGS = ['en', 'de']
  private DEFAULT_LANG = 'en'
  constructor(
    private txService: TranslateService,
    private config: ConfigurationService,
    private appStateService: AppStateService,
    private userService: UserService
  ) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.loadTranslations().pipe(
      mergeMap(() => from(this.config.isInitialized)),
      mergeMap(() => from(this.appStateService.currentPortal$.isInitialized)),
      map(() => true)
    )
  }

  getBestMatchLanguage(lang: string) {
    if (this.SUPPORTED_LANGS.includes(lang)) {
      return lang
    } else {
      console.log(`${lang} is not supported. Using ${this.DEFAULT_LANG} as a fallback.`)
    }
    return this.DEFAULT_LANG
  }

  loadTranslations(): Observable<boolean> {
    return this.userService.lang$.pipe(
      filter((v) => v !== undefined),
      mergeMap((lang) => this.txService.use(this.getBestMatchLanguage(lang as string))),
      mergeMap(() => of(true))
    )
  }
}
