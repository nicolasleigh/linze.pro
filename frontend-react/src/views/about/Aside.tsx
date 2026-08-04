import { Link } from "react-router-dom"
import { ListTree } from "lucide-react"
import { useState, useEffect } from "react"

interface SectionItem {
    slug: string
    title: string
}

interface AsideProps {
    activeSection: string
    section: SectionItem[]
}

export default function Aside({ activeSection, section }: AsideProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isDesktop, setIsDesktop] = useState(true)

    useEffect(() => {
        const checkDesktop = () => {
            setIsDesktop(window.innerWidth >= 1024)
        }
        checkDesktop()
        window.addEventListener("resize", checkDesktop)
        return () => window.removeEventListener("resize", checkDesktop)
    }, [])

    const activeStyle = "text-neutral-50"
    const inactiveStyle = "text-neutral-500 hover:text-neutral-400"

    return (
        <>
            {isDesktop ? (
                <aside className="py-4">
                    <div className="sticky top-36">
                        <div className="overflow-auto border border-neutral-900 px-6 rounded-xl py-5 hidden lg:block">
                            <div className="flex flex-col space-y-2 text-sm">
                                {section.map((item, index) => (
                                    <Link
                                        key={index}
                                        to={`#${item.slug}`}
                                        className={activeSection === item.slug ? activeStyle : inactiveStyle}
                                    >
                                        {item.title}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>
            ) : (
                <>
                    <button
                        onClick={() => setIsOpen(true)}
                        className="group rounded-xl text-neutral-200 border-transparent bg-neutral-800/50 focus:bg-neutral-800/50 backdrop-blur-md fixed z-10 bottom-5 right-5 py-3 px-3 flex items-center gap-2"
                    >
                        <ListTree />
                        <span className="text-xs">Table of Contents</span>
                    </button>
                    {isOpen && (
                        <div
                            className="fixed inset-0 z-50 bg-black/50"
                            onClick={() => setIsOpen(false)}
                        >
                            <div
                                className="absolute bottom-0 left-0 right-0 bg-neutral-900/80 backdrop-blur-sm border-none text-neutral-500 pb-10 rounded-t-xl"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="px-6 py-4 border-b border-neutral-800">
                                    <h3 className="text-sm text-neutral-200">Table of Contents</h3>
                                </div>
                                <div className="overflow-auto px-6 rounded-xl py-4">
                                    <div className="flex flex-col space-y-2 text-sm">
                                        {section.map((item, index) => (
                                            <Link
                                                key={index}
                                                to={`#${item.slug}`}
                                                onClick={() => setIsOpen(false)}
                                                className={activeSection === item.slug ? activeStyle : inactiveStyle}
                                            >
                                                {item.title}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    )
}
