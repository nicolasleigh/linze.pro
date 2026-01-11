import { useTranslation } from "react-i18next"
import { Heart } from "lucide-react"

interface LikedButtonProps {
    isLiked: boolean
    handleLike?: () => void
}

export default function LikedButton({ isLiked, handleLike }: LikedButtonProps) {
    const { t } = useTranslation()

    return (
        <button
            onClick={handleLike}
            className="relative group px-4 py-3 rounded-xl border inline-flex items-center gap-3 cursor-pointer text-neutral-100 hover:bg-neutral-100 hover:text-neutral-800 transition-colors duration-300 disabled:cursor-not-allowed disabled:hover:text-neutral-100 disabled:hover:bg-neutral-950"
            disabled={isLiked}
        >
            {isLiked ? (
                <span className="font-semibold"> {t("posts.liked_button")} </span>
            ) : (
                <span className="font-semibold"> {t("posts.like_button")} </span>
            )}
            <Heart strokeWidth={2} size={20} className={isLiked ? 'text-red-600' : ''} />
        </button>
    )
}
