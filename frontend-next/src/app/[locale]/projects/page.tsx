import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";

import { PageTransition } from "@/components/page-transition";
import { getPortfolioProjects, getSiteContent } from "@/content/localized";
import { isBlogLocale, localizedPath } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isBlogLocale(rawLocale)) notFound();
  return { title: rawLocale === "en-US" ? "Projects" : "项目",
    description: rawLocale === "en-US" ? "Nicolas Leigh's full-stack, Go backend, realtime and mobile engineering projects." : "李林泽的全栈、Go 后端、实时系统和移动应用项目实践。",
    alternates: { canonical: localizedPath(rawLocale, "/projects"), languages: { "zh-CN": "/zh-CN/projects", "en-US": "/en-US/projects", "x-default": "/zh-CN/projects" } } };
}

export default async function ProjectsPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  if (!isBlogLocale(rawLocale)) notFound();
  const locale = rawLocale;
  const en = locale === "en-US";
  const portfolioProjects = getPortfolioProjects(locale);
  const siteContent = getSiteContent(locale);
  return (
    <PageTransition>
      <main id="main-content" className="projects-page page-shell">
        <header className="projects-hero page-intro">
          <p className="section-kicker">SELECTED SYSTEMS / 04</p>
          <h1>
            {en ? <>Projects are more than feature lists.<br />They are engineering decisions.</> : <>项目不是功能清单，<br />而是一组工程判断。</>}
          </h1>
          <div>
            <p>
              {en ? "From realtime communication and content platforms to commerce and mobile audio, each case focuses on why the system was designed this way, how its core path works, and what remains unfinished." : "从实时通信、内容平台到电商和移动音频，这里关注每个系统为什么这样设计、核心链路如何落地，以及仍然存在的边界。"}
            </p>
            <dl>
              <div>
                <dt>WEB</dt>
                <dd>React / Next.js</dd>
              </div>
              <div>
                <dt>BACKEND</dt>
                <dd>Go / Node.js</dd>
              </div>
              <div>
                <dt>DATA</dt>
                <dd>PostgreSQL / MongoDB</dd>
              </div>
            </dl>
          </div>
        </header>

        <section
          className="project-cases motion-section"
          aria-labelledby="project-cases-title"
        >
          <header className="project-cases-heading">
            <p className="section-kicker">01 / CASE INDEX</p>
            <h2 id="project-cases-title">{en ? "Selected projects" : "代表项目"}</h2>
          </header>

          <ol className="case-list">
            {portfolioProjects.map((project, index) => (
              <li key={project.slug}>
                <article className="case-study">
                  <div className="case-number" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <header className="case-title">
                    <div>
                      <p>{project.category}</p>
                      <span>{project.status}</span>
                    </div>
                    <ViewTransition
                      name={`project-title-${project.slug}`}
                      share="title-morph"
                      default="none"
                    >
                      <h3>
                        {project.caseStudyPath ? (
                          <Link href={localizedPath(locale, project.caseStudyPath)}>
                            {project.name}
                          </Link>
                        ) : (
                          <a
                            href={project.website ?? project.repository}
                            rel="noreferrer"
                            target="_blank"
                          >
                            {project.name}
                          </a>
                        )}
                      </h3>
                    </ViewTransition>
                    <p>{project.description}</p>
                  </header>

                  <div className="case-detail">
                    <div>
                      <h4>{en ? "Engineering focus" : "工程重点"}</h4>
                      <p>{project.engineeringFocus}</p>
                    </div>
                    <div>
                      <h4>{en ? "Implemented" : "已实现"}</h4>
                      <ul>
                        {project.highlights.map((highlight) => (
                          <li key={highlight}>{highlight}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <footer className="case-footer">
                    <ul aria-label={en ? `${project.name} technology stack` : `${project.name} 技术栈`}>
                      {project.stack.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <div>
                      {project.caseStudyPath ? (
                        <Link href={localizedPath(locale, project.caseStudyPath)}>
                          {en ? "Read case study" : "阅读案例"} <span aria-hidden="true">→</span>
                        </Link>
                      ) : null}
                      <a
                        href={project.repository}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {en ? "View code" : "查看代码"} <span aria-hidden="true">↗</span>
                      </a>
                      {project.website ? (
                        <a
                          href={project.website}
                          rel="noreferrer"
                          target="_blank"
                        >
                          {en ? "Open project" : "打开项目"} <span aria-hidden="true">↗</span>
                        </a>
                      ) : null}
                    </div>
                  </footer>
                </article>
              </li>
            ))}
          </ol>
        </section>

        <footer className="projects-contact motion-section">
          <p>{en ? "Want to discuss implementation details?" : "想继续了解实现细节？"}</p>
          <a href={siteContent.links.email}>
            {en ? "Get in touch" : "联系我"} <span aria-hidden="true">↗</span>
          </a>
        </footer>
      </main>
    </PageTransition>
  );
}
