import { getPreferredLocale, isAppLocale, localizePath, type AppLocale } from "@/utils/locale"
import { computed } from "vue"
import { useRoute } from "vue-router"

export function useLocalizedPath() {
  const route = useRoute()
  const locale = computed<AppLocale>(() => {
    const routeLocale = route.params.locale
    return isAppLocale(routeLocale) ? routeLocale : getPreferredLocale()
  })

  const localizedPath = (path: string) => localizePath(path, locale.value)

  return { locale, localizedPath }
}
