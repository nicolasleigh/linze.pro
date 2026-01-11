import PostAside from "@/components/PostAside"
import PostCard from "@/components/PostCard"
import { usePosts } from "@/hooks/usePosts"
import { usePostsByTag } from "@/hooks/usePostsByTag"
import { useTranslation } from "react-i18next"
import { Book } from "lucide-react"
import { useSearchParams } from "react-router-dom"
import { useMemo } from "react"

export default function Posts() {
    const [searchParams] = useSearchParams()
    const tag = searchParams.get("tag")
    const page = Number(searchParams.get("page")) || 1

    const { posts: allPosts, error, isLoading } = usePosts({ page })
    const { posts: postsByTag } = usePostsByTag(page, tag)

    const { t, i18n } = useTranslation()
    const currentLanguage = i18n.language

    const resultPost = useMemo(() => {
        return tag && postsByTag?.length ? postsByTag : allPosts
    }, [tag, postsByTag, allPosts])

    return (
        <section className="relative overflow-x-clip">
            <div className="relative">
                <div
                    className="layout text-center pb-12 pt-28 md:pb-20 md:pt-36 flex flex-col items-center justify-center"
                >
                    <div
                        className="size-11 rounded-xl flex items-center justify-center relative bg-neutral-900/80 backdrop-blur-sm"
                    >
                        <Book className="text-accent" size={20} strokeWidth={1} />
                    </div>
                    <h1 className="mt-4 text-5xl sm:text-6xl">
                        <span
                            className="font-semibold transition-colors bg-gradient-to-br from-accent/30 via-accent/90 to-accent/30 bg-clip-text text-transparent"
                        >{t("posts.posts")}</span
                        >
                    </h1>
                    <p className="mt-3">
                        <span
                            className="transition-colors bg-gradient-to-r from-neutral-300/[35%] via-neutral-300/90 to-neutral-300/[35%] bg-clip-text text-transparent"
                        >
                            {t("posts.about")}
                        </span>
                    </p>
                </div>
            </div>
            <div className="border-t border-neutral-900 bg-black">
                <div className="layout">
                    <div
                        className="grid md:grid-cols-[1fr,18rem] md:gap-8 md:[&>aside]:order-1 min-h-[calc(100vh-28rem)]"
                    >
                        <PostAside />
                        <ul className="md:border-r border-neutral-900 md:pr-8 grid py-6">
                            {resultPost && resultPost.length > 0 ? resultPost.map((item, index) => (
                                <li key={index}>
                                    {currentLanguage === 'zh' && item.aboutZh && (
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
                                    )}
                                    {currentLanguage === 'en' && item.aboutEn && (
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
                            )) : (
                                <div className="text-neutral-400 p-10 text-center">
                                    {/* Placeholder for no posts or loading state */}
                                    {isLoading ? "Loading..." : "No posts found."}
                                </div>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}
