import { useTranslation } from "react-i18next"
import Giscus from "@giscus/react"
import { MessagesSquare } from "lucide-react"

export default function Comments() {
    const { i18n } = useTranslation()
    const currentLanguage = i18n.language

    return (
        <main className="layout">
            <section className="relative">
                <div className="layout text-center pb-12 pt-28 md:pb-20 md:pt-36 flex flex-col items-center justify-center">
                    <div className="size-11 rounded-xl flex items-center justify-center relative bg-neutral-900/80 backdrop-blur-sm">
                        <MessagesSquare className="text-accent" size={20} strokeWidth={1} />
                    </div>
                    <h1 className="mt-4 text-5xl sm:text-6xl">
                        <span className="font-semibold transition-colors bg-gradient-to-br from-accent/30 via-accent/90 to-accent/30 bg-clip-text text-transparent">
                            {currentLanguage === "zh" ? "评论" : "Comments"}
                        </span>
                    </h1>
                    <p className="mt-3">
                        <span className="transition-colors bg-gradient-to-r from-neutral-300/[35%] via-neutral-300/90 to-neutral-300/[35%] bg-clip-text text-transparent">
                            {currentLanguage === "zh" ? "欢迎在下方留言交流" : "Feel free to leave a comment below"}
                        </span>
                    </p>
                </div>
            </section>
            <section>
                <Giscus
                    id="comments"
                    repo="nicolasleigh/linze.pro"
                    repoId="R_kgDOOYUVzg"
                    category="General"
                    categoryId="DIC_kwDOOYUVzs4Cpr5b"
                    mapping="pathname"
                    reactionsEnabled="1"
                    emitMetadata="0"
                    strict="0"
                    inputPosition="bottom"
                    theme="dark"
                    lang={currentLanguage === "zh" ? "zh-CN" : "en"}
                    loading="eager"
                    crossOrigin="anonymous"
                />
            </section>
        </main>
    )
}
