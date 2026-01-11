import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"

export function useHideHeader(scrollY: number) {
    const location = useLocation()
    const [isHidden, setIsHidden] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            // Logic copied from Vue: if home ("/" or name="home"), do not hide (or reset to show?)
            // Vue code: if (route.name === "home") return;
            // This implies on home page, the listener does nothing.
            // IF logic relies on initial state being false, then it means header stays shown.
            if (location.pathname === "/") {
                setIsHidden(false) // Safe beat to ensure it shows on home
                return
            }

            const scrollPosition = window.scrollY

            if (scrollPosition >= scrollY) {
                setIsHidden(true)
            } else {
                setIsHidden(false)
            }
        }

        // Call once to set initial state correctly
        handleScroll()

        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [location.pathname, scrollY])

    return { isHidden }
}
