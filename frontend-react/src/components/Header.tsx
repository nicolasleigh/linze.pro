import { Link } from "react-router-dom"
import LanguageButton from "./LanguageButton"
import { useTranslation } from "react-i18next"
import { MessageSquare } from "lucide-react"
import HeaderDropdownMenu from "./HeaderDropdownMenu"

export default function Header() {
    const { t } = useTranslation()
    const linkStyle = "py-3 px-2 hover:text-accent transition-colors font-medium"

    return (
        <header className="pointer-events-none fixed top-0 inset-x-0 z-50 transition-opacity duration-300 opacity-100 hover:!opacity-100">
            <nav className="flex min-[570px]:hidden mt-8 w-full text-sm md:text-base flex-col pointer-events-none px-4">
                <div className="ml-auto bg-neutral-800/70 backdrop-blur-sm rounded-lg pointer-events-auto">
                    <HeaderDropdownMenu />
                </div>
            </nav>
            <nav className="hidden min-[570px]:flex pointer-events-auto mt-8 px-3 rounded-lg bg-neutral-800/60 w-fit mx-auto text-sm md:text-base">
                <ul className="flex items-center gap-4 text-neutral-200">
                    <Link to="/" className={linkStyle}> {t("header.home_link")} </Link>
                    <Link to="/projects" className={linkStyle}> {t("header.projects_link")} </Link>
                    <Link to="/posts" className={linkStyle}> {t("header.posts_link")} </Link>
                    <Link to="/about" className={linkStyle}> {t("header.about_link")} </Link>
                    <div className="w-px bg-neutral-500 h-[18px]" />
                    <LanguageButton />
                    <Link to="/comments" className={linkStyle}>
                        <MessageSquare className="mt-0.5 size-4 transition" />
                    </Link>
                </ul>
            </nav>
        </header>
    )
}
