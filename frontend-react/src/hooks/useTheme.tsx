import { createContext, useContext, useState, useEffect, ReactNode } from "react"

type Theme = "light" | "dark"

interface ThemeContextType {
    theme: Theme
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType>({
    theme: "dark",
    toggleTheme: () => {},
})

function getInitialTheme(): Theme {
    if (typeof window === "undefined") return "dark"
    const saved = localStorage.getItem("theme") as Theme
    if (saved) return saved
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

function applyTheme(theme: Theme) {
    const root = document.documentElement
    if (theme === "dark") {
        root.classList.add("dark")
    } else {
        root.classList.remove("dark")
    }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>(getInitialTheme)

    // Apply theme on mount
    useEffect(() => {
        applyTheme(theme)
    }, [])

    // Apply theme when theme changes
    useEffect(() => {
        applyTheme(theme)
        localStorage.setItem("theme", theme)
    }, [theme])

    const toggleTheme = () => {
        setTheme((prev) => {
            const newTheme = prev === "dark" ? "light" : "dark"
            applyTheme(newTheme) // Apply immediately
            return newTheme
        })
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    return useContext(ThemeContext)
}
