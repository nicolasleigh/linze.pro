import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Book as BookIcon,
    Check as CheckIcon,
    ChevronDown,
    Folder as FolderIcon,
    Home as HomeIcon,
    Languages as LanguagesIcon,
    Loader2 as Loader2Icon,
    MessageSquare as MessagesSquareIcon,
    User as UserIcon,
} from "lucide-react"
import { HeaderDropdownLink } from "./HeaderDropdownLink"
import { useTranslation } from "react-i18next"
import { useState } from "react"

export default function HeaderDropdownMenu() {
    const { i18n, t } = useTranslation()
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

    const dropdownItemStyle =
        "focus:bg-neutral-950 p-3 rounded-xl bg-neutral-950/70 focus:text-neutral-100"

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    className="py-2 pl-4 pr-3 group text-neutral-300 hover:text-neutral-200 transition-colors flex items-center justify-center gap-1.5"
                >
                    {t("header.dropdown.menu")}
                    <ChevronDown strokeWidth={1} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-56 bg-neutral-800/70 text-neutral-200 border-none p-3 rounded-xl min-w-80 flex flex-col gap-2 backdrop-blur-2xl"
                align="end"
            >
                <DropdownMenuItem className={dropdownItemStyle}>
                    <HeaderDropdownLink
                        title={t('header.dropdown.home')}
                        subtitle={t('header.dropdown.home_sub')}
                        to="/"
                    >
                        <HomeIcon />
                    </HeaderDropdownLink>
                </DropdownMenuItem>

                <DropdownMenuItem className={dropdownItemStyle}>
                    <HeaderDropdownLink
                        title={t('header.dropdown.projects')}
                        subtitle={t('header.dropdown.projects_sub')}
                        to="/projects"
                    >
                        <FolderIcon />
                    </HeaderDropdownLink>
                </DropdownMenuItem>

                <DropdownMenuItem className={dropdownItemStyle}>
                    <HeaderDropdownLink
                        title={t('header.dropdown.posts')}
                        subtitle={t('header.dropdown.posts_sub')}
                        to="/posts"
                    >
                        <BookIcon />
                    </HeaderDropdownLink>
                </DropdownMenuItem>

                <DropdownMenuItem className={dropdownItemStyle}>
                    <HeaderDropdownLink
                        title={t('header.dropdown.about')}
                        subtitle={t('header.dropdown.about_sub')}
                        to="/about"
                    >
                        <UserIcon />
                    </HeaderDropdownLink>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-neutral-700" />

                <DropdownMenuGroup className="flex gap-3 flex-col">
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger
                            className={`${dropdownItemStyle} data-[state=open]:bg-neutral-950`}
                        >
                            <div className="flex w-full items-start gap-3">
                                <div
                                    className="mt-0.5 p-3 bg-neutral-900 text-neutral-300 rounded-xl [&>svg]:size-4 [&>svg]:stroke-1"
                                >
                                    <LanguagesIcon />
                                </div>
                                <div className="grow">
                                    <div className="flex items-center gap-2 justify-between">
                                        <p
                                            className="text-base text-neutral-100 underline decoration-transparent transition-colors"
                                        >
                                            {t("header.dropdown.language")}
                                        </p>
                                    </div>
                                    <p className="text-neutral-400 mt-0.5">{t("header.dropdown.language_sub")}</p>
                                </div>
                            </div>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent
                                className="bg-neutral-800/60 border-none text-neutral-200 hover:text-neutral-50 transition-colors mt-3 backdrop-blur-md"
                            >
                                <DropdownMenuItem
                                    className="focus:bg-neutral-600 focus:text-neutral-100 flex items-center gap-3"
                                    onClick={() => changeLanguage('zh')}
                                    disabled={zh || loadingLanguage !== null}
                                >
                                    {loadingLanguage === 'zh' ? (
                                        <Loader2Icon className="animate-spin size-4" />
                                    ) : zh ? (
                                        <CheckIcon />
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
                                        <Loader2Icon className="animate-spin size-4" />
                                    ) : en ? (
                                        <CheckIcon />
                                    ) : (
                                        <div className="size-4" />
                                    )}
                                    English
                                </DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>

                    <DropdownMenuItem className={dropdownItemStyle}>
                        <HeaderDropdownLink
                            title={t('header.dropdown.messages')}
                            subtitle={t('header.dropdown.messages_sub')}
                            to="/comments"
                        >
                            <MessagesSquareIcon />
                        </HeaderDropdownLink>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
