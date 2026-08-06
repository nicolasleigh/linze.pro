import { useEffect, useState } from "react"
import { FilePenLine } from "lucide-react"
import { toast } from "sonner"
import { usePostForEdit } from "@/hooks/usePostForEdit"
import { useUpdatePost } from "@/hooks/useUpdatePost"
import InputTags from "@/components/InputTags"
import MarkdownEditor from "@/components/MarkdownEditor"

const wrapperStyle = "flex flex-col gap-2"
const gridWrapperStyle = "grid gap-2 grid-cols-1 sm:grid-cols-2"
const inputStyle =
    "border border-neutral-800 rounded-md p-2 focus:outline-none focus:border-neutral-600 bg-neutral-950 text-neutral-100"
const labelStyle = "text-sm font-medium text-neutral-300"

export default function EditPostView() {
    const { post, isLoading } = usePostForEdit()
    const { updatePost, isPending } = useUpdatePost()

    const [titleEn, setTitleEn] = useState("")
    const [titleZh, setTitleZh] = useState("")
    const [aboutEn, setAboutEn] = useState("")
    const [aboutZh, setAboutZh] = useState("")
    const [contentEn, setContentEn] = useState("")
    const [contentZh, setContentZh] = useState("")
    const [tags, setTags] = useState<string[]>([])

    // Prefill the form once the post loads (React Query data arrives async).
    useEffect(() => {
        if (!post) return
        setTitleEn(post.titleEn)
        setTitleZh(post.titleZh)
        setAboutEn(post.aboutEn)
        setAboutZh(post.aboutZh)
        setContentEn(post.contentEn)
        setContentZh(post.contentZh)
        setTags(post.tags)
    }, [post])

    const handleSubmit = () => {
        if (!titleEn.trim()) return toast.error("Please enter English title")
        if (!titleZh.trim()) return toast.error("Please enter Chinese title")
        if (!aboutEn.trim()) return toast.error("Please enter English about")
        if (!aboutZh.trim()) return toast.error("Please enter Chinese about")
        if (!contentEn.trim()) return toast.error("Please enter English content")
        if (!contentZh.trim()) return toast.error("Please enter Chinese content")
        if (tags.length === 0) return toast.error("Please enter tags")

        updatePost({
            slug: post?.slug || "",
            post: {
                titleEn: titleEn.trim(),
                titleZh: titleZh.trim(),
                aboutEn: aboutEn.trim(),
                aboutZh: aboutZh.trim(),
                contentEn,
                contentZh,
                tags,
            },
        })
    }

    if (isLoading) {
        return <div className="layout pt-32 text-neutral-400">Loading...</div>
    }

    if (!post) {
        return (
            <div className="layout pt-32 pb-24">
                <h1 className="text-neutral-100 text-4xl">Post not found</h1>
            </div>
        )
    }

    return (
        <section className="relative">
            <div className="relative">
                <div className="layout text-center pb-12 pt-28 md:pb-20 md:pt-36 flex flex-col items-center justify-center">
                    <div className="size-11 rounded-xl flex items-center justify-center relative bg-neutral-900/80 backdrop-blur-sm">
                        <FilePenLine className="text-accent" size={20} strokeWidth={1} />
                    </div>
                    <h1 className="mt-4 text-6xl">
                        <span className="text-neutral-300 font-semibold"> Edit </span>
                        <span className="font-semibold transition-colors bg-gradient-to-br from-accent/30 via-accent/90 to-accent/30 bg-clip-text text-transparent">
                            Posts
                        </span>
                    </h1>
                </div>
            </div>

            <div className="border-t border-neutral-900 bg-black pt-20">
                <div className="layout pb-24">
                    <div className="flex flex-col gap-6 text-neutral-100">
                        <div className={gridWrapperStyle}>
                            <div className={wrapperStyle}>
                                <label htmlFor="titleEn" className={labelStyle}>
                                    Title – English
                                </label>
                                <input
                                    id="titleEn"
                                    className={inputStyle}
                                    value={titleEn}
                                    onChange={(e) => setTitleEn(e.target.value)}
                                />
                            </div>
                            <div className={wrapperStyle}>
                                <label htmlFor="titleZh" className={labelStyle}>
                                    Title – 中文
                                </label>
                                <input
                                    id="titleZh"
                                    className={inputStyle}
                                    value={titleZh}
                                    onChange={(e) => setTitleZh(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className={gridWrapperStyle}>
                            <div className={wrapperStyle}>
                                <label htmlFor="aboutEn" className={labelStyle}>
                                    About – English
                                </label>
                                <textarea
                                    id="aboutEn"
                                    className={inputStyle}
                                    value={aboutEn}
                                    onChange={(e) => setAboutEn(e.target.value)}
                                />
                            </div>
                            <div className={wrapperStyle}>
                                <label htmlFor="aboutZh" className={labelStyle}>
                                    About – 中文
                                </label>
                                <textarea
                                    id="aboutZh"
                                    className={inputStyle}
                                    value={aboutZh}
                                    onChange={(e) => setAboutZh(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className={gridWrapperStyle}>
                            <div className={wrapperStyle}>
                                <label htmlFor="tags" className={labelStyle}>
                                    Tags
                                </label>
                                <InputTags tags={tags} onUpdate={setTags} />
                            </div>
                            <div className={wrapperStyle}>
                                <label className={labelStyle}>Slug</label>
                                <p className="text-sm text-neutral-400 break-all">{post.slug}</p>
                            </div>
                        </div>

                        <div className={wrapperStyle}>
                            <label className={labelStyle}>Content – English</label>
                            <MarkdownEditor initialContent={contentEn} onChange={setContentEn} />
                        </div>

                        <div className={wrapperStyle}>
                            <label className={labelStyle}>Content – 中文</label>
                            <MarkdownEditor initialContent={contentZh} onChange={setContentZh} />
                        </div>

                        <div className="mt-2">
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={isPending}
                                className="w-56 hover:bg-neutral-700 bg-neutral-900 border border-neutral-800 text-neutral-400 transition-colors px-4 py-2 rounded-lg font-medium disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                            >
                                Update Blog Post
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
