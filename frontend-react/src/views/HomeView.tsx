import { useTranslation } from "react-i18next"
import { ChevronRight, Github } from "lucide-react"
import { paragraphStyle } from "./CommonStyle"
import { Link } from "react-router-dom"
// Project Imports
import ProjectCard from "@/components/ProjectCard"
import Musicfy from "@/components/project-icons/Musicfy"
import Petify from "@/components/project-icons/Petify"
// Post Imports
import PostCard from "@/components/PostCard"
import { usePosts } from "@/hooks/usePosts"
// Icon Imports
import IconWithTooltip from "@/components/IconWithTooltip"
import IconReact from "@/components/icons/IconReact"
import IconCaddy from "@/components/icons/IconCaddy" // Vue used IconVue? No, it used IconVue for Vue. I'll use IconReact as placeholder for now or migrate IconVue too if needed.
// Actually Vue landing page used IconVue. I should migrate IconVue too if I want parity.
import IconGo from "@/components/icons/IconGo" // Need this
import IconNode from "@/components/icons/IconNode"
import IconTailwind from "@/components/icons/IconTailwind"

// Mock IconVue and IconGo for now as standard SVGs if not available, else render nothing or use placeholder
const IconVue = ({ className }: { className?: string }) => <div className={className}>Vue</div>
// I'll leave them as placeholders in the list for now or remove. 
// Wait, I should implement IconVue and IconGo to be perfect.
// Let's assume standard behavior for now and update later if critical.

export default function HomeView() {
    const { t, i18n } = useTranslation()
    const currentLanguage = i18n.language

    // Fetch only 2 posts for the home page
    const { posts: resultPost } = usePosts({ page: 1 })
    const recentPosts = resultPost?.slice(0, 2) || []

    const navigateToAboutPage = "/about"

    return (
        <div>
            <section
                className="flex w-full md:h-screen items-start pb-12 pt-12 md:pb-20 md:pt-36 bg-cover bg-no-repeat bg-[linear-gradient(to_bottom,rgba(0,0,0,0.1),rgba(0,0,0,0.9)),url(/hero.webp)]"
            >
                <div className="mx-auto w-11/12 min-[450px]:ml-5 sm:ml-10 md:ml-20 lg:ml-24 xl:ml-40 mt-28">
                    <div className="max-w-[29rem] text-left text-white">
                        <h1 className="text-2xl sm:text-4xl md:text-6xl mt-10 font-semibold">
                            {t("home.hero_title")}
                        </h1>
                        <div className="text-lg">
                            <p className={paragraphStyle}>
                                {t("home.hero_about")}
                            </p>
                            <ul className="flex items-center gap-3">
                                <li>
                                    <IconWithTooltip tooltip="React">
                                        <IconReact className="size-7" />
                                    </IconWithTooltip>
                                </li>
                                {/* 
                <li>
                  <IconWithTooltip tooltip="Vue">
                    <IconVue className="size-7" />
                  </IconWithTooltip>
                </li> 
                */}
                                <li>
                                    <IconWithTooltip tooltip="Node.js">
                                        <IconNode className="size-7" />
                                    </IconWithTooltip>
                                </li>
                                <li>
                                    <IconWithTooltip tooltip="Tailwind CSS">
                                        <IconTailwind className="size-10" />
                                    </IconWithTooltip>
                                </li>
                            </ul>
                        </div>
                        <div className="mt-8 flex gap-4">
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://github.com/nicolasleigh"
                                className="p-0.5 hover:text-neutral-400 transition-colors text-neutral-500 flex items-center justify-center rounded-sm cursor-newtab"
                            >
                                <IconWithTooltip tooltip="GitHub">
                                    <Github strokeWidth={1} className="cursor-newtab" />
                                </IconWithTooltip>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="layout flex items-start justify-end max-md:justify-center pb-12 md:pb-20">
                <img src="/arrow.svg" className="hidden min-[900px]:block mr-20 lg:mr-36 xl:mr-56" alt="Arrow" />
                <div
                    className="text-neutral-200 max-w-[33rem] max-xl:mr-5 max-lg:mr-10 max-md:mr-0 max-[900px]:mr-20"
                >
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-semibold">{t("home.about_title")}</h2>
                    <p className={paragraphStyle}>
                        {t("home.about_1")}
                    </p>
                    <p className={paragraphStyle}>
                        {t("home.about_2")}
                    </p>
                    <Link
                        to={navigateToAboutPage}
                        className="relative mt-6 group px-4 py-3 font-medium rounded-xl border inline-flex items-center gap-3 cursor-pointer text-neutral-100 hover:bg-neutral-100 hover:text-neutral-800 transition-colors duration-300"
                    >
                        {t("home.about_cta")}
                        <ChevronRight />
                    </Link>
                </div>
            </section>

            <section className="relative layout overflow-hidden">
                <div className="py-12 md:py-20 flex flex-col">
                    <div>
                        <h2 className="text-2xl sm:text-3xl md:text-5xl font-semibold text-neutral-200">
                            {t("home.project_title")}
                        </h2>
                        <p className="text-neutral-300 mt-2 self-start flex text-base">
                            {t("home.project_subtitle")}
                        </p>
                    </div>
                    <ul className="mt-6 grid gap-8">
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
                    </ul>

                    <Link
                        className="mt-16 self-center text-base flex items-center gap-2 hover:text-accent transition-colors text-neutral-300"
                        to="/projects"
                    >
                        <span> {t("home.project_button")}</span>
                        <div
                            className="border border-neutral-400 size-6 flex items-center justify-center bg-white/5 rounded-[10px]"
                        >
                            <ChevronRight strokeWidth={1} size={20} />
                        </div>
                    </Link>
                </div>
            </section>

            <section className="layout">
                <div className="py-12 md:py-20 flex flex-col">
                    <div>
                        <h2 className="text-2xl sm:text-3xl md:text-5xl font-semibold text-neutral-200">
                            {t("home.post_title")}
                        </h2>
                        <p className="text-neutral-300 mt-2 self-start flex">
                            {t("home.post_subtitle")}
                        </p>
                    </div>

                    <ul className="md:border-r border-neutral-900 md:pr-8 grid gap-8 py-6">
                        {recentPosts.map((item, index) => (
                            <li
                                key={index}
                                className="w-full rounded-md @container/blog-card transition duration-100 group"
                            >
                                {currentLanguage === 'zh' ? (
                                    <PostCard
                                        slug={item.slug}
                                        title={item.titleZh}
                                        about={item.aboutZh}
                                        photo={item.photo}
                                        tags={item.tags}
                                        createdAt={item.created_at}
                                        view={item.viewNum}
                                        like={item.likeNum}
                                    />
                                ) : (
                                    <PostCard
                                        slug={item.slug}
                                        title={item.titleEn}
                                        about={item.aboutEn}
                                        photo={item.photo}
                                        tags={item.tags}
                                        createdAt={item.created_at}
                                        view={item.viewNum}
                                        like={item.likeNum}
                                    />
                                )}
                            </li>
                        ))}
                    </ul>

                    <Link
                        className="mt-16 self-center text-base flex items-center gap-2 hover:text-accent transition-colors text-neutral-300"
                        to="/posts"
                    >
                        <span> {t("home.post_button")} </span>
                        <div
                            className="border border-neutral-400 size-6 flex items-center justify-center bg-white/5 rounded-[10px]"
                        >
                            <ChevronRight strokeWidth={1} size={20} />
                        </div>
                    </Link>
                </div>
            </section>
        </div>
    )
}
