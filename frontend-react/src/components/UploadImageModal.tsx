import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useUploadImage } from "@/hooks/useUploadImage"
import { cn } from "@/lib/utils"
import { ImageUp, Loader2 } from "lucide-react"

const commonImageStyle = "flex justify-center items-center border rounded aspect-video cursor-pointer"

export default function UploadImageModal() {
    const [photo, setPhoto] = useState<File>()
    const [preview, setPreview] = useState("")
    const [open, setOpen] = useState(false)
    const { uploadImage, isPending } = useUploadImage()

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        setPhoto(file)
        setPreview(URL.createObjectURL(file))
    }

    const handleUpload = () => {
        if (!photo) return
        uploadImage(photo)
        // Reset and close; the uploaded image becomes available in the image library.
        setOpen(false)
        setPhoto(undefined)
        setPreview("")
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button
                    type="button"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-300 hover:bg-neutral-800 transition-colors text-sm cursor-pointer"
                >
                    <ImageUp size={16} />
                    Upload Image
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Upload Image</DialogTitle>
                    <DialogDescription className="sr-only">Upload Image</DialogDescription>
                </DialogHeader>
                <div>
                    <input
                        id="image-upload"
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    <label
                        htmlFor="image-upload"
                        tabIndex={0}
                        className={cn(commonImageStyle, "block cursor-pointer")}
                    >
                        {preview ? (
                            <img src={preview} className={commonImageStyle} alt="Preview" />
                        ) : (
                            <span className="text-neutral-500">Select image</span>
                        )}
                    </label>
                </div>
                <DialogFooter>
                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="px-4 py-2 rounded-lg border border-neutral-700 text-neutral-400 hover:bg-neutral-800 transition-colors text-sm cursor-pointer"
                    >
                        Close
                    </button>
                    <button
                        type="button"
                        onClick={handleUpload}
                        disabled={!photo || isPending}
                        className="px-4 py-2 rounded-lg border border-neutral-400 text-neutral-300 hover:bg-neutral-100 hover:text-neutral-800 transition-colors text-sm cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isPending ? <Loader2 className="inline animate-spin size-4" /> : "Upload"}
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
