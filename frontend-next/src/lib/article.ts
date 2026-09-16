import GithubSlugger from "github-slugger";

export type TableOfContentsItem = {
  id: string;
  label: string;
  level: 2 | 3;
};

function plainText(value: string) {
  return value
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[`*_~]/g, "")
    .trim();
}

export function buildTableOfContents(markdown: string): TableOfContentsItem[] {
  const slugger = new GithubSlugger();
  const contentWithoutCode = markdown.replace(/```[\s\S]*?```/g, "");
  const headings = contentWithoutCode.matchAll(/^(#{2,3})\s+(.+)$/gm);

  return Array.from(headings, ([, marker, rawLabel]) => {
    const label = plainText(rawLabel);
    return {
      id: slugger.slug(label),
      label,
      level: marker.length as 2 | 3,
    };
  });
}

export function estimateReadingTime(markdown: string) {
  const text = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]*>/g, " ");
  const chineseCharacters = text.match(/[\u3400-\u9fff]/g)?.length ?? 0;
  const latinWords =
    text.match(/[A-Za-z0-9]+(?:[-'][A-Za-z0-9]+)*/g)?.length ?? 0;

  return Math.max(1, Math.ceil(chineseCharacters / 450 + latinWords / 220));
}

export function articleTransitionName(slug: string) {
  let hash = 2166136261;

  for (const character of slug) {
    hash ^= character.codePointAt(0) ?? 0;
    hash = Math.imul(hash, 16777619);
  }

  return `article-title-${(hash >>> 0).toString(36)}`;
}
