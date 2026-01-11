import { useTags } from "@/hooks/useTags"
import PostTag from "./PostTag"
import { useSearchParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"

export default function PostAside() {
    const { tagString } = useTags()
    const [searchParams, setSearchParams] = useSearchParams()
    const { t } = useTranslation()
    const tags = tagString?.split(",") || []
    const currentTag = searchParams.get("tag")

    const handleClick = (item: string) => {
        if (currentTag === item) {
            searchParams.delete("tag")
            setSearchParams(searchParams)
        } else {
            setSearchParams({ tag: item })
        }
    }

    return (
        <aside className="mt-8 md:sticky md:top-16 md:h-fit md:self-start text-white text-sm">
            <p>{t("posts.tag")}</p>
            <div className="flex flex-wrap mt-4">
                {tags.map((item, index) => (
                    <div
                        key={index}
                        className="cursor-pointer transition-colors duration-300 m-1"
                        onClick={() => handleClick(item)}
                    >
                        <PostTag
                            className={cn(
                                currentTag === item ? "!bg-accent/30 !text-accent" : "hover:text-white"
                            )}
                        >
                            {item}
                        </PostTag>
                    </div>
                ))}
            </div>
        </aside>
    )
}
