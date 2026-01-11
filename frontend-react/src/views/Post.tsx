import { usePost } from "@/hooks/usePost"
import { useGetPostLike, usePostLike, usePostView } from "@/hooks/useLikeAndView"
import { useDateFormat } from "@/utils/helper"
import { Calendar, CalendarDays, ChevronRight, Eye, Heart } from "lucide-react"
import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import PostTag from "@/components/PostTag"
import LikedButton from "@/components/LikedButton"
// Placeholder for MdPreview
const MdPreview = ({ content, isLoading }: { content?: string, isLoading: boolean }) => (
    <div className="prose prose-invert max-w-none mt-8 text-neutral-300">
        {isLoading ? "Loading..." : content}
    </div>
)

export default function Post() {
    const { slug } = useParams<{ slug: string }>()
    const { post, isLoading } = usePost()
    const { viewNum } = usePostView()
    const { likeNum, updatePostLike } = usePostLike()
    const { likeNum: initialLike } = useGetPostLike()
    const { t, i18n } = useTranslation()
    const currentLanguage = i18n.language
    const dateFormat = useDateFormat()

    const [isLiked, setIsLiked] = useState(
        localStorage.getItem(`like-post-${slug}`) === "true" || false
    )

    const handleLike = () => {
        const likeState = localStorage.getItem(`like-post-${slug}`)
        if (likeState === "true") {
            setIsLiked(true)
            return
        }
        localStorage.setItem(`like-post-${slug}`, "true")
        setIsLiked(true)
        updatePostLike()
    }

    return (
        <section className="relative">
            <div>
                <figure
                    className="overflow-hidden absolute left-0 top-0 z-[-1] h-[16rem] w-full pointer-events-none"
                >
                    <div className="relative pt-[40%] lg:translate-y-[-20%]">
                        <div className="absolute inset-0 top-1/2">
                            <img className="w-full -translate-y-1/2" src={post?.photo || ""} alt="cover" />
                        </div>
                    </div>
                </figure>
                <div
                    className="absolute left-0 top-0 h-[16rem] w-full bg-gradient-to-b from-neutral-950/60 to-neutral-950 z-[-1]"
                />
            </div>
            <div className="layout pb-12 pt-32 md:pb-20 md:pt-64">
                <div className="pb-4">
                    <div className="flex flex-wrap gap-x-2 gap-y-1 text-sm text-gray-100">
                        {post?.tags.map((item, index) => (
                            <PostTag key={index}>{item}</PostTag>
                        ))}
                    </div>
                    {currentLanguage === 'en' && (
                        <>
                            <h1 className="mt-6 leading-tight text-neutral-100 text-4xl sm:text-5xl font-semibold selection:bg-accent-dark">
                                {post?.titleEn}
                            </h1>
                            <p className="mt-1 text-neutral-400 selection:bg-accent-dark">
                                {post?.aboutEn}
                            </p>
                        </>
                    )}
                    {currentLanguage === 'zh' && (
                        <>
                            <h1 className="mt-6 leading-tight text-neutral-100 text-4xl sm:text-5xl font-semibold selection:bg-accent-dark">
                                {post?.titleZh}
                            </h1>
                            <p className="mt-1 text-neutral-400 selection:bg-accent-dark">
                                {post?.aboutZh}
                            </p>
                        </>
                    )}

                    <div className="mt-12 flex gap-3 items-center">
                        <div className="size-10 rounded-full overflow-hidden">
                            <figure
                                className="isolate z-[1] overflow-hidden select-none pointer-events-none object-cover"
                            >
                                <img src="/avatar.webp" alt="avatar" />
                            </figure>
                        </div>
                        <div>
                            <p className="text-neutral-100 capitalize">{post?.user.username}</p>
                            <p className="mt-0.5 text-neutral-400 text-xs">{post?.user.email}</p>
                        </div>
                    </div>
                    <div
                        className="mt-12 py-4 border-y text-white border-neutral-800 flex items-center gap-5 flex-wrap"
                    >
                        <p className="text-neutral-400 text-xs flex items-center gap-2 pointer-events-none">
                            <Calendar size={15} className="text-neutral-600" />
                            <span>{dateFormat(post?.created_at || "")}</span>
                        </p>
                        <p
                            className={`text-neutral-400 text-xs flex items-center gap-2 pointer-events-none ${post?.created_at === post?.updated_at ? 'hidden' : ''}`}
                        >
                            <CalendarDays size={15} className="text-neutral-600" />
                            <span>{dateFormat(post?.updated_at || "")}</span>
                        </p>
                        <p className="text-neutral-400 text-xs flex items-center gap-2 ml-auto pointer-events-none">
                            <Eye size={15} className="text-neutral-600" />
                            <span>{viewNum} {t("posts.view")}</span>
                        </p>
                        <button
                            className="text-neutral-400 text-xs flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                            onClick={handleLike}
                            disabled={isLiked}
                        >
                            <Heart size={15} className={isLiked ? 'text-red-600' : 'text-neutral-600'} />
                            <span>{likeNum ? likeNum : initialLike} {t("posts.like")}</span>
                        </button>
                    </div>
                </div>
                <section>
                    {currentLanguage === 'en' && (
                        <MdPreview content={post?.contentEn} isLoading={isLoading} />
                    )}
                    {currentLanguage === 'zh' && (
                        <MdPreview content={post?.contentZh} isLoading={isLoading} />
                    )}
                </section>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-10 mt-12">
                    <div>
                        <LikedButton handleLike={handleLike} isLiked={isLiked} />
                    </div>
                    <div>
                        <Link
                            to={`/edit-post/${slug}`}
                            className="relative group px-4 py-3 rounded-xl border inline-flex items-center gap-3 cursor-pointer text-neutral-100 hover:bg-neutral-100 hover:text-neutral-800 transition-colors duration-300"
                        >
                            <span className="font-semibold"> {t("posts.edit_button")} </span>
                            <ChevronRight strokeWidth={2} size={20} />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
