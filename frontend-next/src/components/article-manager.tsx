"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type ChangeEvent, useEffect, useState } from "react";

import {
  AdminApiError,
  loadTranslationRevisions,
  loadTranslations,
  publishTranslation,
  type TranslationRecord,
  type TranslationRevision,
  updateTranslation,
} from "@/lib/admin-article-api";
import type { BlogLocale } from "@/types/post";

function createStarterMarkdown(
  slug = "article-slug",
  locale: BlogLocale = "zh-CN",
  shared?: Pick<TranslationRecord, "tags" | "photo">,
) {
  const chinese = locale === "zh-CN";
  const tags = shared?.tags.length ? shared.tags : ["Go", "React"];
  const tagsBlock = tags.map((tag) => `  - ${JSON.stringify(tag)}`).join("\n");
  return `---
slug: ${slug}
locale: ${locale}
title: ${chinese ? "文章标题" : "Article title"}
description: ${chinese ? "用一句话概括文章内容" : "Summarize the article in one sentence"}
tags:
${tagsBlock}
${shared?.photo ? `photo: ${JSON.stringify(shared.photo)}\n` : ""}
---

# ${chinese ? "文章标题" : "Article title"}

${chinese ? "从这里开始写正文。" : "Start writing here."}
`;
}

function serializeTranslation(translation: TranslationRecord) {
  const updated = translation.sourceUpdatedAt ?? translation.updatedAt;
  const tags = translation.tags
    .map((tag) => `  - ${JSON.stringify(tag)}`)
    .join("\n");
  const tagsBlock = tags ? `tags:\n${tags}` : "tags: []";
  return `---
slug: ${translation.postSlug}
locale: ${translation.locale}
title: ${JSON.stringify(translation.title)}
description: ${JSON.stringify(translation.description)}
${tagsBlock}
${translation.photo ? `photo: ${JSON.stringify(translation.photo)}\n` : ""}updated: ${updated.slice(0, 10)}
---

${translation.content}`;
}

function updateFrontMatterField(
  markdown: string,
  field: "slug" | "locale",
  value: string,
) {
  const pattern = new RegExp(`^${field}:.*$`, "m");
  return pattern.test(markdown)
    ? markdown.replace(pattern, `${field}: ${value}`)
    : markdown;
}

type ArticleManagerProps = {
  initialSlug?: string;
  initialLocale?: BlogLocale;
};

export function ArticleManager({
  initialSlug = "",
  initialLocale = "zh-CN",
}: ArticleManagerProps) {
  const router = useRouter();
  const [slug, setSlug] = useState(initialSlug);
  const [locale, setLocale] = useState<BlogLocale>(initialLocale);
  const [markdown, setMarkdown] = useState(() =>
    createStarterMarkdown(initialSlug || undefined, initialLocale),
  );
  const [version, setVersion] = useState<number | null>(null);
  const [revisions, setRevisions] = useState<TranslationRevision[]>([]);
  const [status, setStatus] = useState(
    initialSlug ? "正在读取文章…" : "填写 Front-matter 后发布第一种语言版本",
  );
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!initialSlug) return;
    let active = true;

    const load = async () => {
      setBusy(true);
      setStatus("正在读取文章…");
      try {
        const translations = await loadTranslations(initialSlug);
        if (!active) return;
        const translation = translations.find(
          (item) => item.locale === initialLocale,
        );
        setSlug(initialSlug);
        setLocale(initialLocale);
        if (translation) {
          const history = await loadTranslationRevisions(
            initialSlug,
            initialLocale,
          ).catch(() => []);
          if (!active) return;
          setVersion(translation.version);
          setRevisions(history);
          setMarkdown(serializeTranslation(translation));
          setStatus(
            `已载入 ${translation.locale} · 当前版本 v${translation.version}`,
          );
        } else {
          setVersion(null);
          setRevisions([]);
          setMarkdown(
            createStarterMarkdown(
              initialSlug,
              initialLocale,
              translations[0],
            ),
          );
          setStatus(
            `${initialLocale} 尚未发布，当前可以创建这个语言版本`,
          );
        }
      } catch (error) {
        if (!active) return;
        if (error instanceof AdminApiError && error.status === 401) {
          router.replace("/admin/login");
          router.refresh();
          return;
        }
        setStatus(error instanceof Error ? error.message : "读取失败");
      } finally {
        if (active) setBusy(false);
      }
    };

    void load();
    return () => {
      active = false;
    };
  }, [initialLocale, initialSlug, router]);

  const run = async (
    task: () => Promise<TranslationRecord>,
    success: string,
  ) => {
    setBusy(true);
    setStatus("正在提交…");
    try {
      const translation = await task();
      setSlug(translation.postSlug);
      setLocale(translation.locale);
      setVersion(translation.version);
      setMarkdown(serializeTranslation(translation));
      const history = await loadTranslationRevisions(
        translation.postSlug,
        translation.locale,
      ).catch(() => []);
      setRevisions(history);
      setStatus(`${success} · v${translation.version}`);
      router.replace(
        `/admin/articles/${translation.postSlug}?locale=${translation.locale}`,
      );
      router.refresh();
    } catch (error) {
      if (error instanceof AdminApiError && error.status === 401) {
        router.replace("/admin/login");
        router.refresh();
        return;
      }
      if (error instanceof AdminApiError && error.status === 409) {
        setStatus("保存失败：该语言版本已被更新，请重新载入后再编辑。");
        return;
      }
      setStatus(error instanceof Error ? error.message : "请求失败");
    } finally {
      setBusy(false);
    }
  };

  const handleLoad = async () => {
    if (!slug) {
      setStatus("请先输入文章 Slug");
      return;
    }
    setBusy(true);
    setStatus("正在读取…");
    try {
      const translations = await loadTranslations(slug);
      const translation = translations.find((item) => item.locale === locale);
      if (translation) {
        const history = await loadTranslationRevisions(slug, locale).catch(
          () => [],
        );
        setVersion(translation.version);
        setRevisions(history);
        setMarkdown(serializeTranslation(translation));
        setStatus(`已载入 ${translation.locale} · v${translation.version}`);
      } else {
        setVersion(null);
        setRevisions([]);
        setMarkdown(createStarterMarkdown(slug, locale, translations[0]));
        setStatus(`${locale} 尚未发布，可以创建这个语言版本`);
      }
    } catch (error) {
      if (error instanceof AdminApiError && error.status === 401) {
        router.replace("/admin/login");
        router.refresh();
        return;
      }
      setStatus(error instanceof Error ? error.message : "读取失败");
    } finally {
      setBusy(false);
    }
  };

  const handleFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setMarkdown(await file.text());
    setStatus(
      `已载入 ${file.name}，${version === null ? "尚未发布" : `保存后将更新 v${version}`}`,
    );
  };

  return (
    <main id="main-content" className="article-manager">
      <header>
        <p className="section-kicker">CONTENT / WORKBENCH</p>
        <h1>{initialSlug ? "编辑文章" : "新建文章"}</h1>
        <p>
          上传或直接编辑带 Front-matter 的 Markdown。每个语言版本独立保存并保留版本号。
        </p>
        <Link href="/admin/articles">← 返回文章列表</Link>
      </header>

      <section className="article-manager-toolbar" aria-label="文章设置">
        <label>
          <span>Slug</span>
          <input
            value={slug}
            onChange={(event) => {
              const nextSlug = event.target.value;
              setSlug(nextSlug);
              setMarkdown((current) =>
                updateFrontMatterField(
                  current,
                  "slug",
                  nextSlug || "article-slug",
                ),
              );
            }}
            placeholder="article-slug"
            readOnly={Boolean(initialSlug)}
          />
        </label>
        <label>
          <span>语言</span>
          <select
            value={locale}
            onChange={(event) => {
              const nextLocale = event.target.value as BlogLocale;
              setLocale(nextLocale);
              if (initialSlug) {
                setBusy(true);
                setStatus("正在切换语言版本…");
                router.replace(
                  `/admin/articles/${initialSlug}?locale=${nextLocale}`,
                );
              } else {
                setVersion(null);
                setMarkdown((current) =>
                  updateFrontMatterField(current, "locale", nextLocale),
                );
              }
            }}
          >
            <option value="zh-CN">中文 · zh-CN</option>
            <option value="en-US">English · en-US</option>
          </select>
        </label>
        <button type="button" onClick={handleLoad} disabled={busy}>
          读取已有版本
        </button>
      </section>

      <section className="article-manager-editor">
        <div className="article-manager-editor-heading">
          <div>
            <p>MARKDOWN</p>
            <span>{version === null ? "新版本" : `当前版本 v${version}`}</span>
          </div>
          <label className="article-manager-file">
            选择 .md 文件
            <input
              type="file"
              accept=".md,.markdown,text/markdown"
              onChange={handleFile}
            />
          </label>
        </div>
        <textarea
          value={markdown}
          onChange={(event) => setMarkdown(event.target.value)}
          spellCheck={false}
          aria-label="Markdown 内容"
        />
      </section>

      <section className="article-revision-panel" aria-labelledby="revision-title">
        <header>
          <div>
            <p>VERSION / HISTORY</p>
            <h2 id="revision-title">版本记录</h2>
          </div>
          <span>{revisions.length} 个修订</span>
        </header>
        {revisions.length === 0 ? (
          <p>这个语言版本尚未发布，保存后会生成第一条版本记录。</p>
        ) : (
          <ol>
            {revisions.map((revision) => (
              <li key={`${revision.locale}-${revision.version}`}>
                <strong>v{revision.version}</strong>
                <div>
                  <h3>{revision.title}</h3>
                  <p>{revision.description || "没有填写摘要"}</p>
                </div>
                <time dateTime={revision.createdAt}>
                  {new Intl.DateTimeFormat("zh-CN", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  }).format(new Date(revision.createdAt))}
                </time>
              </li>
            ))}
          </ol>
        )}
      </section>

      <footer className="article-manager-actions">
        <p role="status">{status}</p>
        <div>
          <button
            type="button"
            disabled={busy || version !== null}
            onClick={() =>
              run(
                () => publishTranslation(markdown, slug, locale),
                "发布成功",
              )
            }
          >
            发布新语言版本
          </button>
          <button
            type="button"
            disabled={busy || version === null || !slug}
            onClick={() =>
              version !== null &&
              run(
                () => updateTranslation(markdown, slug, locale, version),
                "更新成功",
              )
            }
          >
            保存更新
          </button>
        </div>
      </footer>
    </main>
  );
}
