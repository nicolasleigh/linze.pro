import { NavLink } from "react-router-dom"
import LanguageButton from "./LanguageButton"
import { useTranslation } from "react-i18next"
import { MessageSquare, Sun, Moon } from "lucide-react"
import HeaderDropdownMenu from "./HeaderDropdownMenu"
import { useTheme } from "../hooks/useTheme"

export default function Header() {
    const { t } = useTranslation()
    const { theme, toggleTheme } = useTheme()
    const linkStyle = "py-3 px-2 hover:text-accent transition-colors font-medium dark:text-neutral-200 text-neutral-700"
    const activeLinkStyle = "py-3 px-2 hover:text-accent transition-colors font-medium text-accent"

    return (
        <header className="pointer-events-none fixed top-0 inset-x-0 z-50 transition-opacity duration-300 opacity-100 hover:!opacity-100">
            <nav className="flex min-[570px]:hidden mt-8 w-full text-sm md:text-base flex-col pointer-events-none px-4">
                <div className="ml-auto dark:bg-neutral-800/70 bg-neutral-200/70 backdrop-blur-sm rounded-lg pointer-events-auto flex items-center gap-2">
                    <button
                        onClick={toggleTheme}
                        className="p-2 hover:text-accent transition-colors dark:text-neutral-200 text-neutral-700 z-[60] relative"
                        aria-label="Toggle theme"
                        type="button"
                    >
                        {theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
                    </button>
                    <HeaderDropdownMenu />
                </div>
            </nav>
            <nav className="hidden min-[570px]:flex pointer-events-auto mt-8 px-3 rounded-lg dark:bg-neutral-800/60 bg-neutral-200/60 w-fit mx-auto text-sm md:text-base">
                <ul className="flex items-center gap-4 dark:text-neutral-200 text-neutral-700">
                    <NavLink to="/" className={({ isActive }) => isActive ? activeLinkStyle : linkStyle}> {t("header.home_link")} </NavLink>
                    <NavLink to="/projects" className={({ isActive }) => isActive ? activeLinkStyle : linkStyle}> {t("header.projects_link")} </NavLink>
                    <NavLink to="/posts" className={({ isActive }) => isActive ? activeLinkStyle : linkStyle}> {t("header.posts_link")} </NavLink>
                    <NavLink to="/about" className={({ isActive }) => isActive ? activeLinkStyle : linkStyle}> {t("header.about_link")} </NavLink>
                    <div className="w-px dark:bg-neutral-500 bg-neutral-600 h-[18px]" />
                    <button
                        onClick={toggleTheme}
                        className="p-2 hover:text-accent transition-colors dark:text-neutral-200 text-neutral-700"
                        aria-label="Toggle theme"
                        type="button"
                    >
                        {theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
                    </button>
                    <LanguageButton />
                    <NavLink to="/comments" className={({ isActive }) => isActive ? activeLinkStyle : linkStyle}>
                        <MessageSquare className="mt-0.5 size-4 transition" />
                    </NavLink>
                </ul>
            </nav>
        </header>
    )
}
