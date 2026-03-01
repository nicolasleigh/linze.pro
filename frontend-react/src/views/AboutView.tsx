import { useTranslation } from "react-i18next"
import { User2 } from "lucide-react"
import AboutArticle from "./about/AboutArticle"
import Aside from "./about/Aside"
import { getSectionTitleAndSlug, getSectionTitleAndSlugChinese } from "@/utils/helper"
import { useActiveSection } from "@/hooks/useActiveSection"

const sectionTitleEn = [
    "Background & Education",
    "Programming Journey",
    "Learning Journey",
    "Current Focus",
    "Tech Stack",
    "Contact",
]

const sectionTitleZh = [
    "背景与教育经历",
    "编程旅程",
    "学习历程",
    "当前专注方向",
    "技术栈",
    "联系方式",
]

export default function AboutView() {
    const { t, i18n } = useTranslation()
    const currentLanguage = i18n.language
    const { activeSection } = useActiveSection()

    const section = currentLanguage === "zh"
        ? getSectionTitleAndSlugChinese(sectionTitleZh)
        : getSectionTitleAndSlug(sectionTitleEn)

    return (
        <main className="layout">
            <div className="relative">
                <div className="layout text-center pb-12 pt-28 md:pb-20 md:pt-36 flex flex-col items-center justify-center">
                    <div className="size-11 rounded-xl flex items-center justify-center relative bg-neutral-900/80 backdrop-blur-sm">
                        <User2 className="text-accent" size={20} strokeWidth={1} />
                    </div>
                    <h1 className="mt-4 text-5xl sm:text-6xl">
                        <span className="text-neutral-300 font-semibold"> {t("about.title_about")} </span>
                        <span className="font-semibold transition-colors bg-gradient-to-br from-accent/30 via-accent/90 to-accent/30 bg-clip-text text-transparent">
                            {t("about.title_me")}
                        </span>
                    </h1>
                    <p className="mt-3">
                        <span className="transition-colors bg-gradient-to-r from-neutral-300/[35%] via-neutral-300/90 to-neutral-300/[35%] bg-clip-text text-transparent">
                            {t("about.about")}
                        </span>
                    </p>
                </div>
            </div>
            <section className="mt-6 lg:grid lg:grid-cols-[minmax(0,1fr),250px] lg:gap-8">
                <AboutArticle />
                <Aside section={section} activeSection={activeSection} />
            </section>
        </main>
    )
}
