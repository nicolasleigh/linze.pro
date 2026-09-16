"use client";

import { useRef, useState } from "react";

export function CodeBlock({ children }: { children: React.ReactNode }) {
  const codeRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    const code = codeRef.current?.textContent;
    if (!code) return;

    await navigator.clipboard.writeText(code.replace(/\n$/, ""));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="code-block">
      <button type="button" onClick={copyCode} aria-live="polite">
        {copied ? "已复制" : "复制"}
      </button>
      <pre ref={codeRef}>{children}</pre>
    </div>
  );
}
