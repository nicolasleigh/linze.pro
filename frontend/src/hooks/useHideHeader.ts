import { onMounted, onUnmounted, ref } from "vue"
import { useRoute } from "vue-router"

export function useHideHeader(scrollY: number) {
  const route = useRoute()
  const isHidden = ref(false)
  const handleScroll = () => {
    if (route.name === "home") {
      return
    }
    const scrollPosition = window.scrollY

    if (scrollPosition >= scrollY) {
      isHidden.value = true
    } else {
      isHidden.value = false
    }
  }

  onMounted(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll)
  })

  return { isHidden }
}
