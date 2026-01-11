import { Link } from "react-router-dom"
import type { PostCardProps } from "@/types/post"
import { Eye, Heart } from "lucide-react"
import PostTag from "@/components/PostTag"
import { useDateFormat } from "@/utils/helper"
import { useTranslation } from "react-i18next"

export default function PostCard(props: PostCardProps) {
    const { slug, photo, createdAt, title, about, view, like, tags } = props
    const { t } = useTranslation()
    // React hook usage must be at top level
    const dateFormat = useDateFormat()
    // Wait, `useDateFormat` returns a function, so this is correct.

    return (
        <>
            <Link
                to={'/posts/' + slug}
                className="w-full rounded-md transition duration-300 group cursor-pointer block"
            >
                <div className="flex flex-col md:flex-row-reverse md:items-center gap-4 py-3 md:gap-6">
                    <figure
                        className="isolate z-[1] pointer-events-none overflow-hidden flex justify-center items-center md:max-w-44 md:w-full md:h-32"
                    >
                        {photo ? (
                            <img src={photo} alt="cover photo" className="rounded-md" />
                        ) : (
                            <img src="/default-cover-photo.webp" alt="cover photo" className="rounded-md" />
                        )}
                    </figure>
                    <div className="w-full">
                        <div className="flex items-center gap-3">
                            <p className="text-neutral-400 text-sm flex items-center justify-center gap-3">
                                {dateFormat(createdAt)}
                            </p>
                        </div>

                        <h3 className="text-lg mt-3 relative">
                            <span
                                className="bg-gradient-to-r font-semibold from-accent via-accent/60 to-accent box-decoration-clone group-hover:opacity-30 opacity-0 transition text-transparent absolute inset-0"
                                aria-hidden="true"
                            >
                                {title}
                            </span>
                            <span className="font-semibold text-white relative z-10 block group-hover:text-transparent transition-colors duration-300">
                                {/* The visual effect in Vue was:
                    - Gradient text is hidden (opacity 0) normally. Hover -> opacity 0.3.
                    - White text is visible normally. 
                    Replicating exact CSS behavior might be tricky with just classes if not careful.
                    In Vue code:
                     span 1 (gradient): group-hover:opacity-30 opacity-0
                     span 2 (white): absolute left-0 top-0 ... wait.
                     
                     The Vue structure:
                     <h3 relative>
                        <span (gradient) text-transparent ...>Title</span>
                        <span (white) absolute left-0 top-0>Title</span>
                     </h3>
                     
                     Let's mimic that exactly.
                 */}
                                {/* Actually, let's fix the structure to match Vue exactly */}
                            </span>
                        </h3>

                        <h3 className="text-lg mt-3 relative">
                            <span
                                className="bg-gradient-to-r font-semibold from-accent via-accent/60 to-accent box-decoration-clone group-hover:opacity-30 opacity-0 transition text-transparent"
                                aria-hidden="true"
                            >
                                {title}
                            </span>
                            <span className="absolute left-0 top-0 font-semibold text-white"> {title} </span>
                        </h3>

                        <p className="b2 txt-secondary mt-1 text-neutral-300">
                            {about}
                        </p>

                        <div className="flex justify-between mt-5">
                            <div className="flex gap-5">
                                <div className="text-neutral-300 flex items-center justify-center gap-2 text-xs">
                                    <Eye size={15} className="text-accent" />
                                    <p className="">{view} {t("posts.view")}</p>
                                </div>
                                <div className="text-neutral-300 flex items-center justify-center gap-2 text-xs">
                                    <Heart size={15} className="text-accent" />
                                    <p className="">{like} {t("posts.like")}</p>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                {tags.map((item, index) => (
                                    <div key={index}>
                                        <PostTag>
                                            {item}
                                        </PostTag>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
            <hr className="border-dashed border-neutral-900 my-8" />
        </>
    )
}
