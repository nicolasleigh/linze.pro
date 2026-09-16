import ReactMarkdown from "react-markdown";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import { CodeBlock } from "@/components/code-block";

export function ArticleContent({ content }: { content: string }) {
  return (
    <div className="article-prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeSlug,
          rehypeHighlight,
          [rehypeAutolinkHeadings, { behavior: "wrap" }],
        ]}
        components={{
          h1: () => null,
          pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
          a: ({ href, children, ...props }) => {
            const external = href?.startsWith("http");
            return (
              <a
                href={href}
                {...props}
                {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
              >
                {children}
              </a>
            );
          },
          img: ({ alt = "", ...props }) => (
            // Markdown content does not currently provide intrinsic image dimensions.
            // eslint-disable-next-line @next/next/no-img-element
            <img alt={alt} loading="lazy" decoding="async" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
