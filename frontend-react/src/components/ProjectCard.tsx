import IconGithub from "@/components/icons/IconGithub"
import IconLink from "@/components/icons/IconLink"
import { useTranslation } from "react-i18next"
import { ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
    title: string
    about: string
    image: string
    repo: string
    website?: string
    reverse?: boolean
    link: string
    children?: React.ReactNode
}

export default function ProjectCard({
    title,
    about,
    image,
    repo,
    website,
    reverse,
    link,
    children
}: ProjectCardProps) {
    const { t } = useTranslation()

    return (
        <li className={cn("lg:flex gap-8", reverse ? "flex-row-reverse" : "flex-row")}>
            <div className="shrink-0 relative aspect-video lg:h-full">
                <figure
                    className="overflow-hidden relative isolate z-[1] pointer-events-none h-full border border-neutral-900 rounded-xl"
                >
                    <img className="absolute w-full h-full object-cover" src={image} alt={title} />
                </figure>
            </div>
            <div
                className="grow p-6 border-neutral-900 border border-dashed rounded-xl rounded-t-none lg:rounded-t-xl"
            >
                <h3 className="text-2xl md:text-4xl text-neutral-200 font-semibold">{title}</h3>
                <p className="mt-4 text-neutral-300">
                    {about}
                </p>
                <div className="flex items-center gap-2 mt-4 text-neutral-300">
                    <p className="text-sm">{t("projects.tool")}</p>
                    <ul className="flex items-center gap-2 text-xl text-neutral-50">
                        {children}
                    </ul>
                </div>
                <div className="w-full flex flex-wrap justify-between gap-4 items-center mt-6 mb-6">
                    <Link
                        to={link}
                        state={{ about }}
                        className="relative group px-4 py-3 rounded-xl border inline-flex items-center gap-3 cursor-pointer text-neutral-100 hover:bg-neutral-100 hover:text-neutral-800 transition-colors duration-300"
                    >
                        <span className="font-semibold"> {t("projects.cta")} </span>
                        <ChevronRight strokeWidth={2} size={20} />
                    </Link>
                    <div className="flex items-center gap-6">
                        <a
                            href={repo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-neutral-400 h-10 flex gap-2 items-center hover:text-accent text-xs hover:underline decoration-white underline-offset-4 cursor-newtab"
                        >
                            <div className="">
                                <IconGithub />
                            </div>
                            <span className="text-neutral-200">{t("projects.github_link")}</span>
                        </a>
                        {website && (
                            <a
                                href={website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-neutral-400 h-10 flex gap-2 items-center hover:text-accent text-xs hover:underline decoration-white underline-offset-4 cursor-newtab"
                            >
                                <div className="">
                                    <IconLink />
                                </div>
                                <span className="text-neutral-200">{t("projects.website_link")}</span>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </li>
    )
}
