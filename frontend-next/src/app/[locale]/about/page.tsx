import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { PageTransition } from '@/components/page-transition';
import { getAboutContent, getSiteContent } from '@/content/localized';
import { isBlogLocale, localizedPath } from '@/lib/i18n';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isBlogLocale(rawLocale)) notFound();
  const en = rawLocale === 'en-US';
  const description = en
    ? "Nicolas Leigh's education, professional credentials, engineering capabilities and working principles."
    : '了解李林泽的教育背景、专业资质、技术能力与工程原则。';
  return {
    title: en ? 'About' : '关于我',
    description,
    alternates: {
      canonical: localizedPath(rawLocale, '/about'),
      languages: { 'zh-CN': '/zh-CN/about', 'en-US': '/en-US/about', 'x-default': '/zh-CN/about' },
    },
    openGraph: {
      type: 'profile',
      title: en ? 'About Nicolas Leigh' : '关于李林泽',
      description,
      url: localizedPath(rawLocale, '/about'),
      locale: rawLocale.replace('-', '_'),
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  if (!isBlogLocale(rawLocale)) notFound();
  const locale = rawLocale;
  const en = locale === 'en-US';
  const aboutContent = getAboutContent(locale);
  const siteContent = getSiteContent(locale);
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteContent.identity.name,
    alternateName: siteContent.identity.englishName,
    url: `https://linze.pro${localizedPath(locale, '/about')}`,
    sameAs: [siteContent.links.github],
    jobTitle: siteContent.identity.role,
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: en ? 'Zhongnan University of Economics and Law' : '中南财经政法大学',
    },
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      name: en ? 'Certified Public Accountant (China)' : '中国注册会计师',
    },
    knowsAbout: ['React', 'Next.js', 'TypeScript', 'Go', 'PostgreSQL', 'Web engineering'],
  };

  return (
    <PageTransition>
      <main id='main-content' className='about-page page-shell'>
        <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />

        <section className='about-hero page-intro' aria-labelledby='about-page-title'>
          <p className='section-kicker'>{aboutContent.introduction.eyebrow}</p>
          <div className='about-hero-copy'>
            <h1 id='about-page-title'>{aboutContent.introduction.title}</h1>
            <p>{aboutContent.introduction.description}</p>
          </div>
          <dl className='about-profile' aria-label={en ? 'Profile overview' : '个人概览'}>
            {aboutContent.profile.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className='about-section about-education motion-section' aria-labelledby='education-title'>
          <header>
            <p className='section-kicker'>01 / EDUCATION</p>
            <h2 id='education-title'>{aboutContent.education.title}</h2>
          </header>
          <ol>
            {aboutContent.education.entries.map((item) => (
              <li key={item.index}>
                <span className='capability-index'>{item.index}</span>
                <div className='capability-copy'>
                  <h3>{item.title}</h3>
                  <p className='education-subtitle'>{item.subtitle}</p>
                  <p>{item.description}</p>
                </div>
                <ul aria-label={en ? `Focus areas for ${item.title}` : `${item.title}相关领域`}>
                  {item.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        <section className='about-section about-capabilities motion-section' aria-labelledby='capabilities-title'>
          <header>
            <p className='section-kicker'>02 / CAPABILITIES</p>
            <h2 id='capabilities-title'>{en ? 'Technical Capabilities' : '核心技术与交付能力'}</h2>
            {/* <p>
              {en
                ? 'Battle-tested across production systems from interfaces to infrastructure.'
                : '立足生产环境，贯穿从界面交互到后端系统的交付链路。'}
            </p> */}
          </header>
          <ol>
            {aboutContent.capabilities.map((item) => (
              <li key={item.index}>
                <span className='capability-index'>{item.index}</span>
                <div className='capability-copy'>
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

        <section className='about-section about-principles motion-section' aria-labelledby='principles-title'>
          <header>
            <p className='section-kicker'>03 / PRINCIPLES</p>
            <h2 id='principles-title'>{en ? 'Engineering Principles' : '工程原则与判断'}</h2>
          </header>
          <ol>
            {aboutContent.principles.map((item, index) => (
              <li key={item.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className='about-contact motion-section' aria-labelledby='contact-title'>
          <p className='section-kicker'>04 / CONTACT</p>
          <div>
            <h2 id='contact-title'>{en ? "Let's connect." : '交流探讨，欢迎来信'}</h2>
            <a href={siteContent.links.email}>
              nicolas.leigh@qq.com <span aria-hidden='true'>↗</span>
            </a>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
