import "./assets/main.css"
import { createApp } from "vue"
import { VueQueryPlugin } from "@tanstack/vue-query"
import i18next from "i18next"
import I18NextVue from "i18next-vue"
import Backend from "i18next-http-backend"
import App from "./App.vue"
import router from "./router"
import {
  getPreferredLocale,
  isAppLocale,
  localizePath,
  persistLocale,
  type AppLocale,
} from "./utils/locale"

i18next.use(Backend).init({
  lng: getPreferredLocale(),
  interpolation: {
    escapeValue: false,
  },
  // fallbackLng: "en",
  fallbackLng: "zh",
  // debug: true,
})

const app = createApp(App)

function syncLocale(locale: AppLocale) {
  persistLocale(locale)
  if (i18next.language !== locale) {
    void i18next.changeLanguage(locale)
  }
}

router.afterEach((to) => {
  if (isAppLocale(to.params.locale)) {
    syncLocale(to.params.locale)
  }
})

i18next.on("languageChanged", (language) => {
  const locale: AppLocale = language.toLowerCase().startsWith("zh") ? "zh" : "en"
  persistLocale(locale)

  const currentRoute = router.currentRoute.value
  if (currentRoute.name && currentRoute.params.locale !== locale) {
    void router.replace({
      path: localizePath(currentRoute.path, locale),
      query: currentRoute.query,
      hash: currentRoute.hash,
    })
  }
})

app.use(router)
app.use(VueQueryPlugin)
app.use(I18NextVue, { i18next })

app.mount("#app")
