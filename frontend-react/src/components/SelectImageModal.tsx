import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import { useImages } from "@/hooks/useImages"
import { ImageDown } from "lucide-react"

interface SelectImageModalProps {
    onChange: (url: string) => void
}

export default function SelectImageModal({ onChange }: SelectImageModalProps) {
    const { images, isLoading } = useImages()

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button
                    type="button"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-300 hover:bg-neutral-800 transition-colors text-sm cursor-pointer"
                >
                    <ImageDown size={16} />
                    Select Image
                </button>
            </DialogTrigger>
            <DialogContent className="max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Select Image</DialogTitle>
                    <DialogDescription className="sr-only">Select Image</DialogDescription>
                </DialogHeader>
                <div className="max-h-[500px] overflow-auto flex flex-wrap gap-2 items-center">
                    {isLoading && <p className="text-neutral-400 p-4">Loading...</p>}
                    {!isLoading && images?.length === 0 && (
                        <p className="text-neutral-400 p-4">No images uploaded yet.</p>
                    )}
                    {images?.map((item, index) => (
                        <DialogClose key={index} asChild>
                            <button
                                type="button"
                                onClick={() => onChange(item.url)}
                                className="cursor-pointer hover:opacity-80 transition-opacity"
                            >
                                <img
                                    src={item.url}
                                    alt={`Image ${index + 1}`}
                                    className="aspect-video h-[50px] rounded-sm object-cover"
                                />
                            </button>
                        </DialogClose>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    )
}
