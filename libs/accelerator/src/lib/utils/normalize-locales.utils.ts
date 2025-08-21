export function normalizeLocales(locales: string[] | undefined): string[] {
  if (!locales || locales.length === 0) return []
  const expanded: string[] = []
  for (const locale of locales) {
    if (!expanded.includes(locale)) expanded.push(locale)
    const lang = locale.split(/[-_]/)
    for (const l of lang) {
      if (!expanded.includes(l)) expanded.push(l)
    }
  }
  return expanded
}
