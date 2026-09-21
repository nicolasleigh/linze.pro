import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";

import { PageTransition } from "@/components/page-transition";
import { getPortfolioProjects, getProjectCaseStudyLocalized } from "@/content/localized";
import { projectCaseStudies, type ProjectMedia } from "@/content/project-case-studies";
import { blogLocales, isBlogLocale, localizedPath } from "@/lib/i18n";
import type { BlogLocale } from "@/types/post";

type ProjectCasePageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

function getProject(slug: string, locale: BlogLocale) {
  return getPortfolioProjects(locale).find((project) => project.slug === slug);
}

function ProjectMediaFigure({ media, priority = false }: { media: ProjectMedia; priority?: boolean }) {
  const isRemoteMedia = /^https?:\/\//.test(media.src);

  return (
    <figure className={`project-case-media project-case-media-${media.role}`}>
      <div className="project-case-media-frame">
        <Image
          src={media.src}
          alt={media.alt}
          width={media.width}
          height={media.height}
          sizes="(max-width: 900px) calc(100vw - 2.5rem), min(1180px, calc(100vw - 5rem))"
          priority={priority}
          unoptimized={isRemoteMedia}
        />
      </div>
      {media.caption ? <figcaption>{media.caption}</figcaption> : null}
    </figure>
  );
}

export function generateStaticParams() {
  return blogLocales.flatMap((locale) => Object.keys(projectCaseStudies).map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: ProjectCasePageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  if (!isBlogLocale(rawLocale)) notFound();
  const locale = rawLocale;
  const project = getProject(slug, locale);
  const caseStudy = getProjectCaseStudyLocalized(slug, locale);

  if (!project || !caseStudy) return { robots: { index: false }, title: locale === "en-US" ? "Case study not found" : "项目案例未找到" };

  const socialImage = caseStudy.media?.find((media) => media.role === "hero") ?? caseStudy.media?.[0];

  return {
    title: locale === "en-US" ? `${project.name} case study` : `${project.name} 项目案例`,
    description: caseStudy.description,
    alternates: { canonical: localizedPath(locale, `/projects/${project.slug}`), languages: { "zh-CN": `/zh-CN/projects/${project.slug}`, "en-US": `/en-US/projects/${project.slug}`, "x-default": `/zh-CN/projects/${project.slug}` } },
    openGraph: {
      type: "article",
      title: locale === "en-US" ? `${project.name} case study` : `${project.name} 项目案例`,
      description: caseStudy.description,
      url: localizedPath(locale, `/projects/${project.slug}`),
      locale: locale.replace("-", "_"),
      images: socialImage
        ? [{ url: socialImage.src, width: socialImage.width, height: socialImage.height, alt: socialImage.alt }]
        : undefined,
    },
    twitter: {
      card: "summary",
      title: locale === "en-US" ? `${project.name} case study` : `${project.name} 项目案例`,
      description: caseStudy.description,
      images: socialImage ? [socialImage.src] : undefined,
    },
  };
}

export default async function ProjectCasePage({
  params,
}: ProjectCasePageProps) {
  const { locale: rawLocale, slug } = await params;
  if (!isBlogLocale(rawLocale)) notFound();
  const locale = rawLocale;
  const en = locale === "en-US";
  const project = getProject(slug, locale);
  const caseStudy = getProjectCaseStudyLocalized(slug, locale);

  if (!project || !caseStudy) notFound();

  const renderMedia = (role: ProjectMedia["role"], priority = false) =>
    (caseStudy.media ?? [])
      .filter((media) => media.role === role)
      .map((media) => <ProjectMediaFigure key={media.src} media={media} priority={priority} />);

  const pageUrl = `https://linze.pro${localizedPath(locale, `/projects/${project.slug}`)}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        headline: en ? `${project.name}: ${caseStudy.title}` : `${project.name}：${caseStudy.title}`,
        description: caseStudy.description,
        author: { "@type": "Person", name: en ? "Nicolas Leigh" : "李林泽" },
        inLanguage: locale,
        mainEntityOfPage: pageUrl,
        keywords: project.stack.join(", "),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: en ? "Home" : "首页",
            item: `https://linze.pro/${locale}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: en ? "Projects" : "项目",
            item: `https://linze.pro/${locale}/projects`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: project.name,
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <PageTransition>
      <main id="main-content" className="project-case-page page-shell">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />

        <nav className="breadcrumbs" aria-label={en ? "Breadcrumb" : "面包屑导航"}>
          <Link href={localizedPath(locale)} transitionTypes={["nav-back"]}>
            {en ? "Home" : "首页"}
          </Link>
          <span aria-hidden="true">/</span>
          <Link href={localizedPath(locale, "/projects")} transitionTypes={["nav-back"]}>
            {en ? "Projects" : "项目"}
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{project.name}</span>
        </nav>

        <header className="project-case-hero page-intro">
          <div>
            <p className="section-kicker">{caseStudy.heroKicker}</p>
            <ViewTransition
              name={`project-title-${project.slug}`}
              share="title-morph"
              default="none"
            >
              <h1>{project.name}</h1>
            </ViewTransition>
          </div>
          <div>
            <p className="project-case-status">{project.status}</p>
            <h2>{caseStudy.title}</h2>
            <p>{caseStudy.description}</p>
            <div className="project-case-actions">
              <a href={project.repository} rel="noreferrer" target="_blank">
                {en ? "View code" : "查看代码"} <span aria-hidden="true">↗</span>
              </a>
              {project.website ? (
                <a href={project.website} rel="noreferrer" target="_blank">
                  {en ? "Open project" : "打开项目"} <span aria-hidden="true">↗</span>
                </a>
              ) : null}
              <a href="#current-boundaries">
                {en ? "Current boundaries" : "查看当前边界"} <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
        </header>

        {renderMedia("hero", true)}

        <section
          className="case-problem motion-section"
          aria-labelledby="case-problem-title"
        >
          <p className="section-kicker">{caseStudy.sections.problem.kicker}</p>
          <div>
            <h2 id="case-problem-title">{caseStudy.sections.problem.title}</h2>
            <p>{caseStudy.problem}</p>
            <ul>
              {caseStudy.goals.map((goal) => (
                <li key={goal}>{goal}</li>
              ))}
            </ul>
          </div>
        </section>

        {renderMedia("architecture")}

        <section
          className="case-flow-section motion-section"
          aria-labelledby="case-flow-title"
        >
          <header>
            <p className="section-kicker">{caseStudy.sections.flow.kicker}</p>
            <h2 id="case-flow-title">{caseStudy.sections.flow.title}</h2>
          </header>
          {renderMedia("flow")}
          <ol className="system-flow">
            {caseStudy.flow.map((step) => (
              <li key={step.label}>
                <span>{step.label}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </section>

        {renderMedia("screen")}

        <section
          className="case-decisions motion-section"
          aria-labelledby="case-decisions-title"
        >
          <header>
            <p className="section-kicker">{caseStudy.sections.decisions.kicker}</p>
            <h2 id="case-decisions-title">{caseStudy.sections.decisions.title}</h2>
          </header>
          <ol>
            {caseStudy.decisions.map((decision, index) => (
              <li key={decision.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{decision.title}</h3>
                <div>
                  <p>
                    <strong>{en ? "Implementation" : "实现"}</strong>
                    {decision.implementation}
                  </p>
                  <p>
                    <strong>{en ? "Value" : "价值"}</strong>
                    {decision.value}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section
          id="current-boundaries"
          className="case-boundaries motion-section"
          aria-labelledby="case-boundaries-title"
        >
          <header>
            <p className="section-kicker">{caseStudy.sections.boundaries.kicker}</p>
            <h2 id="case-boundaries-title">{caseStudy.sections.boundaries.title}</h2>
            <p>{caseStudy.sections.boundaries.intro}</p>
          </header>
          <ol>
            {caseStudy.boundaries.map((boundary) => (
              <li key={boundary.title} data-level={boundary.level}>
                <span>{en ? `${boundary.level === "高" ? "High" : "Medium"} priority` : `${boundary.level}优先级`}</span>
                <h3>{boundary.title}</h3>
                <p>{boundary.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section
          className="case-next motion-section"
          aria-labelledby="case-next-title"
        >
          <p className="section-kicker">{caseStudy.sections.next.kicker}</p>
          <div>
            <h2 id="case-next-title">{caseStudy.sections.next.title}</h2>
            <ol>
              {caseStudy.nextSteps.map((step, index) => (
                <li key={step}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <footer className="article-footer motion-section">
          <p>CASE STUDY / {project.name.toUpperCase()}</p>
          <Link href={localizedPath(locale, "/projects")} transitionTypes={["nav-back"]}>
            {en ? "All projects" : "返回全部项目"} <span aria-hidden="true">↗</span>
          </Link>
        </footer>
      </main>
    </PageTransition>
  );
}
