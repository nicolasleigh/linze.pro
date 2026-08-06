import { useEffect, useState } from "react"
import MDEditor, { image as imageCommand, getCommands, type ICommand } from "@uiw/react-md-editor"
import "@uiw/react-md-editor/markdown-editor.css"
import "@uiw/react-markdown-preview/markdown.css"
import { uploadImageApi } from "@/api/post"
import { useTheme } from "@/hooks/useTheme"

interface MarkdownEditorProps {
    initialContent?: string
    onChange: (value: string) => void
}

// Swap the default `image` command (which only inserts a `(url)` placeholder) with one
// that opens a file picker, uploads the image, and inserts `![image](<uploaded-url>)`.
function createUploadImageCommand(): ICommand {
    return {
        ...imageCommand,
        execute: (_state, api) => {
            const input = document.createElement("input")
            input.type = "file"
            input.accept = "image/*"
            input.onchange = () => {
                const file = input.files?.[0]
                if (!file) return
                uploadImageApi(file)
                    .then((url) => {
                        api.replaceSelection(`\n![image](${url})\n`)
                    })
                    .catch(() => {
                        // Failure toast is handled inside uploadImageApi
                    })
            }
            input.click()
        },
    }
}

const uploadImage = createUploadImageCommand()

export default function MarkdownEditor({ initialContent, onChange }: MarkdownEditorProps) {
    const { theme } = useTheme()
    const [value, setValue] = useState(initialContent || "")

    // Sync when the editor is opened with different initial content (e.g. Edit page prefill).
    useEffect(() => {
        setValue(initialContent || "")
    }, [initialContent])

    const handleChange = (next?: string) => {
        const content = next || ""
        setValue(content)
        onChange(content)
    }

    const commands = getCommands().map((cmd) => (cmd.name === "image" ? uploadImage : cmd))

    return (
        <div data-color-mode={theme}>
            <MDEditor
                value={value}
                onChange={handleChange}
                height={420}
                commands={commands}
            />
        </div>
    )
}
