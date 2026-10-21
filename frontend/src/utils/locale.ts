export const APP_LOCALES = ["zh", "en"] as const

export type AppLocale = (typeof APP_LOCALES)[number]

const LOCALE_STORAGE_KEY = "app-locale"
const LOCALE_PREFIX_PATTERN = /^\/(zh|en)(?=\/|$)/

export function isAppLocale(value: unknown): value is AppLocale {
  return typeof value === "string" && APP_LOCALES.includes(value as AppLocale)
}

export function getLocaleFromPath(path: string): AppLocale | undefined {
  const locale = path.match(LOCALE_PREFIX_PATTERN)?.[1]
  return isAppLocale(locale) ? locale : undefined
}

export function stripLocalePrefix(path: string) {
  const strippedPath = path.replace(LOCALE_PREFIX_PATTERN, "")
  return strippedPath || "/"
}

export function localizePath(path: string, locale: AppLocale) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`
  const pathWithoutLocale = stripLocalePrefix(normalizedPath)
  return pathWithoutLocale === "/" ? `/${locale}` : `/${locale}${pathWithoutLocale}`
}

export function getPreferredLocale(): AppLocale {
  if (typeof window === "undefined") {
    return "zh"
  }

  const pathLocale = getLocaleFromPath(window.location.pathname)
  if (pathLocale) {
    return pathLocale
  }

  const storedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY)
  if (isAppLocale(storedLocale)) {
    return storedLocale
  }

  return window.navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en"
}

export function persistLocale(locale: AppLocale) {
  window.localStorage.setItem(LOCALE_STORAGE_KEY, locale)
  document.documentElement.lang = locale === "zh" ? "zh-CN" : "en"
}
