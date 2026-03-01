import { useState, useEffect } from "react"

export function useActiveSection(selector = "[data-section]") {
    const [activeSection, setActiveSection] = useState("")

    useEffect(() => {
        const handleScroll = () => {
            const sections = Array.from(document.querySelectorAll(selector)) as HTMLElement[]
            const scrollY = window.scrollY
            let newActiveSection = ""

            sections.forEach((section, index) => {
                const sectionOffsetTop = section.offsetTop
                const sectionHeight = section.offsetHeight

                if (index === 0 && scrollY < sectionOffsetTop + sectionHeight) {
                    newActiveSection = section.id
                }

                if (scrollY >= sectionOffsetTop - 100 && scrollY < sectionOffsetTop + sectionHeight) {
                    newActiveSection = section.id
                }
            })

            setActiveSection(newActiveSection)
        }

        window.addEventListener("scroll", handleScroll)
        handleScroll() // Initial check

        return () => window.removeEventListener("scroll", handleScroll)
    }, [selector])

    return { activeSection }
}
