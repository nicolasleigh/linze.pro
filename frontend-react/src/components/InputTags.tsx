import { useState } from "react"
import { cn } from "@/lib/utils"

interface InputTagsProps {
    tags: string[]
    onUpdate: (tags: string[]) => void
    className?: string
}

export default function InputTags({ tags, onUpdate, className }: InputTagsProps) {
    const [pending, setPending] = useState("")

    const addPending = () => {
        if (!pending.trim()) return
        const next = new Set([...tags, pending.trim().toLowerCase()])
        onUpdate(Array.from(next))
        setPending("")
    }

    // Vue's InputTags watched the pending input and split on commas; keep that behaviour.
    const handleChange = (value: string) => {
        if (value.includes(",")) {
            const chunks = value
                .split(",")
                .map((c) => c.trim().toLowerCase())
                .filter(Boolean)
            if (chunks.length) {
                const next = new Set([...tags, ...chunks])
                onUpdate(Array.from(next))
            }
            setPending("")
        } else {
            setPending(value)
        }
    }

    const removeTag = (index: number) => {
        onUpdate(tags.filter((_, i) => i !== index))
    }

    return (
        <div className={cn("flex flex-wrap gap-2 border border-neutral-800 rounded-md p-2", className)}>
            {tags.map((tag, index) => (
                <span
                    key={index}
                    className="flex items-center px-2 py-1 text-sm bg-neutral-800 rounded-md capitalize"
                >
                    {tag}
                    <button
                        type="button"
                        className="ml-2 text-neutral-500 hover:text-neutral-300"
                        onClick={() => removeTag(index)}
                        aria-label={`Remove tag ${tag}`}
                    >
                        ✕
                    </button>
                </span>
            ))}
            <input
                value={pending}
                onChange={(e) => handleChange(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault()
                        addPending()
                    }
                }}
                onBlur={addPending}
                type="text"
                className="flex-grow min-w-[80px] outline-none border-none text-neutral-100 bg-neutral-950"
            />
        </div>
    )
}
