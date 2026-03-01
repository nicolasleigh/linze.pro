import { useTranslation } from "react-i18next"
import { BriefcaseBusiness, ChevronRight } from "lucide-react"
import ProjectCard from "@/components/ProjectCard"
import Cabinfy from "@/components/project-icons/Cabinfy"
import Musicfy from "@/components/project-icons/Musicfy"
import Petify from "@/components/project-icons/Petify"

export default function Projects() {
    const { t } = useTranslation()

    return (
        <section className="relative overflow-x-clip">
            <div className="relative">
                <div
                    className="layout text-center pb-12 pt-28 md:pb-20 md:pt-36 flex flex-col items-center justify-center"
                >
                    <div
                        className="size-11 rounded-xl flex items-center justify-center relative bg-neutral-900/80 backdrop-blur-sm"
                    >
                        <BriefcaseBusiness className="text-accent" size={20} strokeWidth={1.5} />
                    </div>
                    <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl">
                        <span className="text-neutral-300 font-semibold mr-3"> {t("projects.full_stack")} </span>
                        <span
                            className="font-semibold transition-colors bg-gradient-to-br from-accent/30 via-accent/90 to-accent/30 bg-clip-text text-transparent"
                        >{t("projects.projects")}</span
                        >
                    </h1>
                    <p className="mt-3">
                        <span
                            className="transition-colors bg-gradient-to-r from-neutral-300/[35%] via-neutral-300/90 to-neutral-300/[35%] bg-clip-text text-transparent"
                        >
                            {t("projects.about")}
                        </span>
                    </p>
                </div>
            </div>
            <div className="layout">
                <ul className="mt-6 grid gap-16">
                    <ProjectCard
                        title={t("projects.musicfy_title")}
                        about={t("projects.musicfy_about")}
                        image="https://file.linze.pro/images/musicfy/11.webp"
                        repo="https://github.com/nicolasleigh/musicfy"
                        link="/projects/musicfy"
                    >
                        <Musicfy />
                    </ProjectCard>
                    <ProjectCard
                        title={t("projects.petify_title")}
                        about={t("projects.petify_about")}
                        image="https://file.linze.pro/images/petify/1.webp"
                        repo="https://github.com/nicolasleigh/petify"
                        website="https://pet.linze.pro"
                        link="/projects/petify"
                        reverse
                    >
                        <Petify />
                    </ProjectCard>
                    <ProjectCard
                        title={t("projects.cabinfy_title")}
                        about={t("projects.cabinfy_about")}
                        image="https://file.linze.pro/images/cabinfy/1.webp"
                        repo="https://github.com/nicolasleigh/cabinfy"
                        website="https://cabin.linze.pro"
                        link="/projects/cabinfy"
                    >
                        <Cabinfy />
                    </ProjectCard>
                </ul>
            </div>
        </section>
    )
}
