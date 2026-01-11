import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTranslation } from "react-i18next"
import { Check, ChevronDown, Languages, Loader2 } from "lucide-react"
import { useState } from "react"

export default function LanguageButton() {
    const { i18n } = useTranslation()
    const currentLanguage = i18n.language
    const [loadingLanguage, setLoadingLanguage] = useState<string | null>(null)

    const zh = currentLanguage === "zh"
    const en = currentLanguage === "en"

    async function changeLanguage(lang: string) {
        if (currentLanguage !== lang) {
            setLoadingLanguage(lang)
            try {
                await i18n.changeLanguage(lang)
            } catch (error) {
                console.error("Failed to change language", error)
            } finally {
                setLoadingLanguage(null)
            }
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="bg-inherit hover:bg-inherit py-3 px-2 group text-neutral-300 hover:text-accent transition-colors flex items-center justify-center gap-1.5"
                >
                    <Languages className="mt-0.5 size-4 transition" />
                    <ChevronDown className="mt-0.5 size-4 transition" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="bg-neutral-800/60 border-none text-neutral-200 hover:text-neutral-50 transition-colors mt-3"
            >
                <DropdownMenuItem
                    className="focus:bg-neutral-600 focus:text-neutral-100 flex items-center gap-3"
                    onClick={() => changeLanguage('zh')}
                    disabled={zh || loadingLanguage !== null}
                >
                    {loadingLanguage === 'zh' ? (
                        <Loader2 className="animate-spin size-4" />
                    ) : zh ? (
                        <Check className="size-4" />
                    ) : (
                        <div className="size-4" />
                    )}
                    简体中文
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="focus:bg-neutral-600 focus:text-neutral-100 flex items-center gap-3"
                    onClick={() => changeLanguage('en')}
                    disabled={en || loadingLanguage !== null}
                >
                    {loadingLanguage === 'en' ? (
                        <Loader2 className="animate-spin size-4" />
                    ) : en ? (
                        <Check className="size-4" />
                    ) : (
                        <div className="size-4" />
                    )}
                    English
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
