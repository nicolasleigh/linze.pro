import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import type { Components } from "react-markdown"
import {
    h2Style,
    h3Style,
    h4Style,
    h5Style,
    paragraphStyle,
    unorderedListStyle,
    orderedListStyle,
} from "@/views/CommonStyle"

interface MdPreviewProps {
    content?: string
    isLoading?: boolean
}

const components: Components = {
    h2: ({ children }) => <h2 className={h2Style}>{children}</h2>,
    h3: ({ children }) => <h3 className={h3Style}>{children}</h3>,
    h4: ({ children }) => <h4 className={h4Style}>{children}</h4>,
    h5: ({ children }) => <h5 className={h5Style}>{children}</h5>,
    h6: ({ children }) => (
        <h6 className="text-sm dark:text-neutral-400 text-neutral-500 font-semibold mt-6 mb-5 pointer-events-none">
            {children}
        </h6>
    ),
    p: ({ children }) => <p className={paragraphStyle}>{children}</p>,
    ul: ({ children }) => <ul className={unorderedListStyle}>{children}</ul>,
    ol: ({ children }) => <ol className={orderedListStyle}>{children}</ol>,
    a: ({ children, href }) => (
        <a
            href={href}
            target={href?.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent hover:text-accent-dark dark:hover:text-accent transition-colors"
        >
            {children}
        </a>
    ),
    blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-accent/60 bg-neutral-900/50 dark:bg-neutral-800/40 pl-4 pr-2 py-2 my-4 rounded-r-md text-neutral-400 dark:text-neutral-300">
            {children}
        </blockquote>
    ),
    code: ({ className, children }) => {
        // Code inside <pre> (fenced blocks) is styled by `pre`; inline code gets its own pill.
        // Fenced blocks without a language tag have no className, so fall back to a newline check.
        const isBlock = !!className || String(children).includes("\n")
        if (isBlock) {
            return <code className={className}>{children}</code>
        }
        return (
            <code className="rounded bg-neutral-800/70 dark:bg-neutral-800 px-1.5 py-0.5 text-[0.85em] font-mono text-accent dark:text-accent">
                {children}
            </code>
        )
    },
    pre: ({ children }) => (
        <pre className="my-4 overflow-x-auto rounded-lg border border-neutral-800 bg-neutral-900 p-4 text-sm leading-relaxed text-neutral-200">
            {children}
        </pre>
    ),
    table: ({ children }) => (
        <div className="my-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm text-neutral-300">{children}</table>
        </div>
    ),
    th: ({ children }) => (
        <th className="border border-neutral-800 bg-neutral-900 px-3 py-2 text-left font-semibold text-neutral-100">
            {children}
        </th>
    ),
    td: ({ children }) => (
        <td className="border border-neutral-800 px-3 py-2 text-neutral-300">{children}</td>
    ),
    img: ({ src, alt }) => (
        <img src={src} alt={alt} className="my-4 rounded-lg border border-neutral-800 max-w-full" />
    ),
    hr: () => <hr className="my-8 border-t border-neutral-800" />,
    input: ({ checked, disabled }) => (
        <input type="checkbox" checked={checked} disabled={disabled} className="mr-2" />
    ),
}

export default function MdPreview({ content, isLoading }: MdPreviewProps) {
    if (isLoading) {
        return <div className="text-neutral-400 py-8">Loading...</div>
    }
    if (!content) {
        return <div className="text-neutral-400 py-8">No Content</div>
    }

    return (
        <div className="mt-8">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
                {content}
            </ReactMarkdown>
        </div>
    )
}
