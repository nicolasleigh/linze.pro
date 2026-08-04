import { cn } from "@/lib/utils"

interface PostTagProps {
    className?: string
    children: React.ReactNode
}

export default function PostTag({ className, children }: PostTagProps) {
    const style =
        "flex items-center px-2 py-1 text-xs bg-neutral-900 font-semibold text-neutral-400 rounded-md capitalize"

    return (
        <span className={cn(style, className)}>
            {children}
        </span>
    )
}
