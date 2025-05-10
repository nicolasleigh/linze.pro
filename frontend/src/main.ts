import "./assets/main.css"
import { createApp } from "vue"
import { createPinia } from "pinia"
import { VueQueryPlugin } from "@tanstack/vue-query"
import i18next from "i18next"
import I18NextVue from "i18next-vue"
import LanguageDetector from "i18next-browser-languagedetector"
import Backend from "i18next-http-backend"
import App from "./App.vue"
import router from "./router"

i18next
  .use(Backend)
  .use(LanguageDetector)
  .init({
    // lng: "en",
    interpolation: {
      escapeValue: false,
    },
    fallbackLng: "en",
    // debug: true,
  })

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin)
app.use(I18NextVue, { i18next })

app.mount("#app")
