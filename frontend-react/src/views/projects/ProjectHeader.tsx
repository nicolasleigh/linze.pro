import IconGithub from "@/components/icons/IconGithub"
import IconLink from "@/components/icons/IconLink"
import { Eye, Heart, User } from "lucide-react"
import { useGetProjectLike, useProjectLike, useProjectView } from "@/hooks/useLikeAndView"
import { useTranslation } from "react-i18next"

interface ProjectHeaderProps {
    title: string
    about: string
    website?: string
    repo: string
}

export default function ProjectHeader({ title, about, website, repo }: ProjectHeaderProps) {
    const { t } = useTranslation()
    const { viewNum } = useProjectView()
    const { likeNum, updateProjectLike } = useProjectLike()
    const { likeNum: initialLike } = useGetProjectLike()

    const isLiked = typeof window !== "undefined" && localStorage.getItem(`like-project-${title.toLowerCase()}`) === "true"

    const handleLike = () => {
        const key = `like-project-${title.toLowerCase()}`
        const likeState = localStorage.getItem(key)
        if (likeState !== "true") {
            localStorage.setItem(key, "true")
            updateProjectLike()
        }
    }

    return (
        <header className="">
            <h1 className="text-neutral-100 text-4xl sm:text-5xl font-semibold mt-6 leading-tight">
                {title}
            </h1>
            <p className="text-neutral-400 text-base mt-2">{about}</p>
            <div className="mt-9 py-4 border-y text-neutral-300 text-xs border-neutral-800 flex items-center gap-5 flex-wrap">
                <p className="flex items-center gap-2 pointer-events-none">
                    <User size={15} className="text-neutral-600" />
                    <span>{t("projects.team")}</span>
                </p>
                <p className="flex items-center gap-2 pointer-events-none">
                    <Eye size={15} className="text-neutral-600" />
                    <span> {viewNum} {t("projects.view")}</span>
                </p>
                <button
                    className="flex items-center gap-2 mr-auto"
                    onClick={handleLike}
                    disabled={isLiked}
                >
                    <Heart size={15} className={isLiked ? "text-red-600" : "text-neutral-600"} />
                    <span>{likeNum ? likeNum : initialLike} {t("projects.like")}</span>
                </button>
                {website && (
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={website}
                        className="hover:underline hover:text-accent text-neutral-500 transition-colors flex items-center gap-1.5 cursor-newtab"
                    >
                        <IconLink />
                        <span className="text-neutral-300">{t("projects.website_link")}</span>
                    </a>
                )}
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={repo}
                    className="hover:underline hover:text-accent text-neutral-500 transition-colors flex items-center gap-1.5 cursor-newtab"
                >
                    <IconGithub />
                    <span className="text-neutral-300">{t("projects.github_link")}</span>
                </a>
            </div>
        </header>
    )
}
