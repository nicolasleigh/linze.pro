"use client";

import { useEffect, useRef, useState } from "react";

import type { TableOfContentsItem } from "@/lib/article";

type ArticleTableOfContentsProps = {
  items: TableOfContentsItem[];
  label?: string;
};

export function ArticleTableOfContents({
  items,
  label = "目录",
}: ArticleTableOfContentsProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const containerRef = useRef<HTMLElement>(null);
  const linkRefs = useRef(new Map<string, HTMLAnchorElement>());

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((heading): heading is HTMLElement => heading !== null);

    if (headings.length === 0) return;

    let animationFrame = 0;

    const updateActiveHeading = () => {
      const readingLine = Math.min(
        Math.max(window.innerHeight * 0.24, 120),
        240,
      );
      const reachedPageEnd =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2;
      let nextId = headings[0].id;

      for (const heading of headings) {
        if (heading.getBoundingClientRect().top > readingLine) break;
        nextId = heading.id;
      }

      if (reachedPageEnd) nextId = headings.at(-1)?.id ?? nextId;
      setActiveId((currentId) => (currentId === nextId ? currentId : nextId));
      animationFrame = 0;
    };

    const scheduleUpdate = () => {
      if (animationFrame !== 0) return;
      animationFrame = window.requestAnimationFrame(updateActiveHeading);
    };

    updateActiveHeading();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("hashchange", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("hashchange", scheduleUpdate);
      if (animationFrame !== 0) window.cancelAnimationFrame(animationFrame);
    };
  }, [items]);

  useEffect(() => {
    const container = containerRef.current;
    const activeLink = linkRefs.current.get(activeId);

    if (
      !container ||
      !activeLink ||
      container.scrollHeight <= container.clientHeight
    )
      return;

    activeLink.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [activeId]);

  const activeIndex = Math.max(
    0,
    items.findIndex((item) => item.id === activeId),
  );

  return (
    <aside ref={containerRef} className="article-toc">
      <div className="article-toc-heading">
        <p>{label}</p>
        <span aria-hidden="true">
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(items.length).padStart(2, "0")}
        </span>
      </div>
      <nav aria-label={label}>
        <ol>
          {items.map((item) => {
            const isActive = item.id === activeId;

            return (
              <li
                key={item.id}
                data-level={item.level}
                data-active={isActive || undefined}
              >
                <a
                  ref={(node) => {
                    if (node) linkRefs.current.set(item.id, node);
                    else linkRefs.current.delete(item.id);
                  }}
                  href={`#${item.id}`}
                  aria-current={isActive ? "location" : undefined}
                  onClick={() => setActiveId(item.id)}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    </aside>
  );
}
