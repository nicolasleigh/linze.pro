import { onMounted, onUnmounted, ref } from "vue"

export function useHideHeader(scrollY: number) {
  let isHidden = ref(false)
  const handleScroll = () => {
    const scrollPosition = window.scrollY

    if (scrollPosition >= scrollY) {
      isHidden.value = true
    } else {
      isHidden.value = false
    }
  }

  onMounted(() => {
    window.addEventListener("scroll", handleScroll)
  })

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll)
  })

  return { isHidden }
}
