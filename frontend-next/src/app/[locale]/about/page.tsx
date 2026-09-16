import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageTransition } from "@/components/page-transition";
import { getAboutContent, getSiteContent } from "@/content/localized";
import { isBlogLocale, localizedPath } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isBlogLocale(rawLocale)) notFound();
  const en = rawLocale === "en-US";
  const description = en ? "Nicolas Leigh's path from finance and audit into software engineering, and the principles behind his work." : "了解李林泽从财经与审计转向软件工程的经历、技术能力与工程原则。";
  return { title: en ? "About" : "关于我", description,
    alternates: { canonical: localizedPath(rawLocale, "/about"), languages: { "zh-CN": "/zh-CN/about", "en-US": "/en-US/about", "x-default": "/zh-CN/about" } },
    openGraph: { type: "profile", title: en ? "About Nicolas Leigh" : "关于李林泽", description, url: localizedPath(rawLocale, "/about"), locale: rawLocale.replace("-", "_") } };
}

export default async function AboutPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  if (!isBlogLocale(rawLocale)) notFound();
  const locale = rawLocale;
  const en = locale === "en-US";
  const aboutContent = getAboutContent(locale);
  const siteContent = getSiteContent(locale);
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteContent.identity.name,
    alternateName: siteContent.identity.englishName,
    url: `https://linze.pro${localizedPath(locale, "/about")}`,
    sameAs: [siteContent.links.github],
    jobTitle: siteContent.identity.role,
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "Go",
      "PostgreSQL",
      "Web engineering",
    ],
  };

  return (
    <PageTransition>
      <main id="main-content" className="about-page page-shell">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />

        <section
          className="about-hero page-intro"
          aria-labelledby="about-page-title"
        >
          <p className="section-kicker">{aboutContent.introduction.eyebrow}</p>
          <div className="about-hero-copy">
            <h1 id="about-page-title">{aboutContent.introduction.title}</h1>
            <p>{aboutContent.introduction.description}</p>
          </div>
          <dl className="about-profile" aria-label={en ? "Profile overview" : "个人概览"}>
            {aboutContent.profile.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section
          className="about-section about-journey motion-section"
          aria-labelledby="journey-title"
        >
          <header>
            <p className="section-kicker">01 / JOURNEY</p>
            <h2 id="journey-title">
              {en ? "Not a predetermined path, but a series of deliberate choices." : <>不是预设好的路径，<br />而是一系列主动选择。</>}
            </h2>
          </header>
          <ol>
            {aboutContent.journey.map((item) => (
              <li key={item.year}>
                <span>{item.year}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section
          className="about-section about-capabilities motion-section"
          aria-labelledby="capabilities-title"
        >
          <header>
            <p className="section-kicker">02 / CAPABILITIES</p>
            <h2 id="capabilities-title">{en ? "Capabilities I keep building" : "我正在构建的能力边界"}</h2>
            <p>{en ? "Not a wall of technology icons, but areas I have practised in real projects." : "这里不是技术图标墙，而是已经通过项目实践过的工作范围。"}</p>
          </header>
          <ol>
            {aboutContent.capabilities.map((item) => (
              <li key={item.index}>
                <span className="capability-index">{item.index}</span>
                <div className="capability-copy">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <ul aria-label={en ? `Technologies for ${item.title}` : `${item.title}相关技术`}>
                  {item.stack.map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        <section
          className="about-section about-principles motion-section"
          aria-labelledby="principles-title"
        >
          <header>
            <p className="section-kicker">03 / PRINCIPLES</p>
            <h2 id="principles-title">{en ? "How I make engineering decisions" : "我如何做工程判断"}</h2>
          </header>
          <ol>
            {aboutContent.principles.map((item, index) => (
              <li key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section
          className="about-contact motion-section"
          aria-labelledby="contact-title"
        >
          <p className="section-kicker">04 / CONTACT</p>
          <div>
            <h2 id="contact-title">{en ? "If you care about building thoughtful products, let's talk." : "如果你也在认真构建产品，我们可以聊聊。"}</h2>
            <a href={siteContent.links.email}>
              nicolas.leigh@qq.com <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
