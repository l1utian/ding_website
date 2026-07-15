export type Locale = 'zh' | 'en'

export const LOCALES = ['zh', 'en'] as const
export const DEFAULT_LOCALE: Locale = 'zh'

export function isLocale(value: string | undefined | null): value is Locale {
  return value === 'zh' || value === 'en'
}

/** Build a locale-aware path. `path` should start with `/`. */
export function localePath(locale: Locale, path = '/'): string {
  const normalized = normalizePath(path)

  if (locale === DEFAULT_LOCALE) {
    return normalized
  }

  if (normalized === '/') {
    return '/en/'
  }

  return `/en${normalized}`
}

/**
 * Map current pathname to the equivalent path in another locale.
 * Preserves product slug segments; strips or adds `/en` prefix.
 */
export function switchLocalePath(pathname: string, next: Locale): string {
  const clean = pathname.split('?')[0]?.split('#')[0] ?? '/'
  const withoutTrailing = clean.replace(/\/+$/, '') || '/'
  const isEn = withoutTrailing === '/en' || withoutTrailing.startsWith('/en/')
  const bare = isEn
    ? withoutTrailing === '/en'
      ? '/'
      : withoutTrailing.slice('/en'.length) || '/'
    : withoutTrailing

  return localePath(next, bare.endsWith('/') || bare === '/' ? bare : `${bare}/`)
}

export function localeFromPathname(pathname: string): Locale {
  const clean = pathname.split('?')[0]?.split('#')[0] ?? '/'
  return clean === '/en' || clean.startsWith('/en/') ? 'en' : 'zh'
}

function normalizePath(path: string): string {
  if (!path || path === '/') {
    return '/'
  }

  const withLeading = path.startsWith('/') ? path : `/${path}`
  return withLeading.endsWith('/') ? withLeading : `${withLeading}/`
}
