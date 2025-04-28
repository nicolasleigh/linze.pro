import { ref, onMounted, onUnmounted } from "vue"

export function useActiveSection(selector = "[data-section]") {
  const sections = ref<HTMLElement[]>([])
  const activeSection = ref("")

  const handleScroll = () => {
    const scrollY = window.scrollY
    let newActiveSection = ""

    sections.value.forEach((section, index) => {
      const sectionOffsetTop = section.offsetTop
      const sectionHeight = section.offsetHeight

      if (index === 0 && scrollY < sectionOffsetTop + sectionHeight) {
        newActiveSection = section.id
      }

      if (scrollY >= sectionOffsetTop - 100 && scrollY < sectionOffsetTop + sectionHeight) {
        newActiveSection = section.id
      }
    })

    activeSection.value = newActiveSection
  }

  onMounted(() => {
    sections.value = Array.from(document.querySelectorAll(selector)) as HTMLElement[]
    window.addEventListener("scroll", handleScroll)
  })

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll)
  })

  return {
    activeSection,
  }
}
