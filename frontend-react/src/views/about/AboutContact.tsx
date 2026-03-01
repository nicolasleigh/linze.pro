import IconGithub from "@/components/icons/IconGithub"

export default function AboutContact() {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="mailto:nicolas.leigh@qq.com"
                    className="cursor-newtab"
                >
                    <span className="text-neutral-400 hover:text-accent">✉️</span>
                </a>
                <span>nicolas.leigh@qq.com</span>
            </div>
            <div className="flex items-center gap-2">
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/nicolasleigh"
                    className="cursor-newtab"
                >
                    <IconGithub className="size-5 hover:text-accent" />
                </a>
                <a>github.com/nicolasleigh</a>
            </div>
        </div>
    )
}
