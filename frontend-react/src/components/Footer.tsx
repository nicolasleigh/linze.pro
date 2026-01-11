import { useTranslation } from "react-i18next"
import { Mail, Github } from "lucide-react"
import { Link } from "react-router-dom"

export default function Footer() {
    const { t, i18n } = useTranslation()
    const linkStyle = "hover:text-accent transition-colors"

    return (
        <footer>
            <div className="shrink-0 bg-neutral-800 h-[1px] w-full bg-gradient-to-r from-[#171717] via-[#525252] to-[#171717]"></div>
            <div className="layout py-16 grid md:grid-cols-[1fr,1.8fr] gap-8 md:gap-32">
                <div>
                    <h3 className="text-neutral-200 font-semibold text-2xl">Nicolas Leigh</h3>
                    <p className="mt-3 text-neutral-500 text-base">
                        {t("footer.about")}
                    </p>
                    <div className="flex gap-5 mt-1">
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="mailto:nicolas.leigh@qq.com"
                            className="hover:text-neutral-100 transition-colors flex items-center h-16 text-neutral-300 cursor-newtab"
                        >
                            <Mail strokeWidth={1} />
                        </a>
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://github.com/nicolasleigh"
                            className="hover:text-neutral-100 transition-colors flex items-center h-16 text-neutral-300 cursor-newtab"
                        >
                            <Github strokeWidth={1} />
                        </a>
                    </div>
                </div>
                <div>
                    <div className="sm:grid-cols-4 grid-cols-2 grid gap-4 gap-y-10">
                        <div>
                            <p className="text-sm text-neutral-500">{t("footer.section_1")}</p>
                            <ul className="text-neutral-300 mt-4 space-y-3 text-sm">
                                <li><Link className={linkStyle} to="/">Home</Link></li>
                                <li><Link className={linkStyle} to="/posts">Posts</Link></li>
                                <li>
                                    <Link className={linkStyle} to="/projects">Projects</Link>
                                </li>
                                <li><Link className={linkStyle} to="/about">About</Link></li>
                                <li><Link className={linkStyle} to="/editor">Create Post</Link></li>
                                <li><Link className={linkStyle} to="/signup">Register</Link></li>
                            </ul>
                        </div>
                        <div>
                            <p className="text-sm text-neutral-500">{t("footer.section_2")}</p>
                            <ul className="text-neutral-300 mt-4 space-y-3 text-sm">
                                <li>
                                    <a
                                        target="_blank"
                                        referrerPolicy="no-referrer"
                                        className={`${linkStyle} cursor-newtab`}
                                        href="https://cabin.linze.pro"
                                    >CabinFy</a>
                                </li>
                                <li>
                                    <a
                                        target="_blank"
                                        referrerPolicy="no-referrer"
                                        className={`${linkStyle} cursor-newtab`}
                                        href="https://movie.linze.pro"
                                    >MovieFy</a>
                                </li>
                                <li>
                                    <a
                                        target="_blank"
                                        referrerPolicy="no-referrer"
                                        className={`${linkStyle} cursor-newtab`}
                                        href="https://pet.linze.pro"
                                    >Petify</a>
                                </li>
                                <li>
                                    <a
                                        target="_blank"
                                        referrerPolicy="no-referrer"
                                        className={`${linkStyle} cursor-newtab`}
                                        href="https://chat.linze.pro"
                                    >Chatify</a>
                                </li>
                                <li>
                                    <a
                                        target="_blank"
                                        referrerPolicy="no-referrer"
                                        className={`${linkStyle} cursor-newtab`}
                                        href="https://linze.pro"
                                    >Blog</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <p className="text-sm text-neutral-500">{t("footer.section_3")}</p>
                            <ul className="text-neutral-300 mt-4 space-y-3 text-sm">
                                <li>
                                    <a
                                        target="_blank"
                                        referrerPolicy="no-referrer"
                                        className={`${linkStyle} cursor-newtab`}
                                        href="https://github.com/nicolasleigh/cabinfy"
                                    >CabinFy</a>
                                </li>
                                <li>
                                    <a
                                        target="_blank"
                                        referrerPolicy="no-referrer"
                                        className={`${linkStyle} cursor-newtab`}
                                        href="https://github.com/nicolasleigh/moviefy"
                                    >MovieFy</a>
                                </li>
                                <li>
                                    <a
                                        target="_blank"
                                        referrerPolicy="no-referrer"
                                        className={`${linkStyle} cursor-newtab`}
                                        href="https://github.com/nicolasleigh/petify"
                                    >Petify</a>
                                </li>
                                <li>
                                    <a
                                        target="_blank"
                                        referrerPolicy="no-referrer"
                                        className={`${linkStyle} cursor-newtab`}
                                        href="https://github.com/nicolasleigh/chatify"
                                    >Chatify</a>
                                </li>
                                <li>
                                    <a
                                        target="_blank"
                                        referrerPolicy="no-referrer"
                                        className={`${linkStyle} cursor-newtab`}
                                        href="https://github.com/nicolasleigh/musicfy"
                                    >MusicFy</a>
                                </li>
                                <li>
                                    <a
                                        target="_blank"
                                        referrerPolicy="no-referrer"
                                        className={`${linkStyle} cursor-newtab`}
                                        href="https://github.com/nicolasleigh/linze.pro"
                                    >Blog</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <p className="text-sm text-neutral-500">{t("footer.section_4")}</p>
                            <ul className="text-neutral-300 mt-4 space-y-3 text-sm">
                                <li>
                                    <a
                                        target="_blank"
                                        referrerPolicy="no-referrer"
                                        href="https://github.com/nicolasleigh/NoteBooks"
                                        className={`cursor-newtab ${linkStyle}`}
                                    >Book Notes</a>
                                </li>
                                <li>
                                    <a
                                        target="_blank"
                                        referrerPolicy="no-referrer"
                                        href="https://github.com/nicolasleigh/javascript-algorithms"
                                        className={`cursor-newtab ${linkStyle}`}
                                    >Algorithms</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="shrink-0 bg-neutral-800 h-[1px] w-full layout bg-gradient-to-r from-[#171717] via-[#525252] to-[#171717]" />
            <div className="layout py-10 text-center">
                <p className="text-neutral-500 space-x-2">
                    <span>Copyright &copy;</span>
                    <span>2025</span>
                    <span>Nicolas Leigh. All rights reserved.</span>
                    {i18n.language === 'zh' && (
                        <a
                            href="https://beian.miit.gov.cn"
                            target="_blank"
                            rel="noreferrer nofollow"
                        >
                            滇ICP备2024048511号
                        </a>
                    )}
                </p>
            </div>
        </footer>
    )
}
