import Link from 'next/link';
import { notFound } from 'next/navigation';

import { PageTransition } from '@/components/page-transition';
import { getPortfolioProjects, getSiteContent } from '@/content/localized';
import { isBlogLocale, localizedPath } from '@/lib/i18n';

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale: rawLocale } = await params;
  if (!isBlogLocale(rawLocale)) notFound();
  const locale = rawLocale;
  const en = locale === 'en-US';
  const siteContent = getSiteContent(locale);
  const featuredProjects = getPortfolioProjects(locale).filter((project) => project.featured);
  return (
    <PageTransition>
      <main id='main-content'>
        <section className='hero page-shell' aria-labelledby='hero-title'>
          <div className='hero-index' aria-hidden='true'>
            <span>PORTFOLIO</span>
            <span>2026</span>
          </div>

          <div className='hero-copy'>
            <p className='eyebrow reveal reveal-1'>{siteContent.introduction.eyebrow}</p>
            <h1 id='hero-title' className='display-title reveal reveal-2'>
              {en ? (
                <>
                  <span>Thoughtful architecture.</span>
                  <span>Intentional delivery.</span>
                </>
              ) : (
                <>
                  <span>深思于架构，</span>
                  <span>敏行于交付</span>
                </>
              )}
            </h1>
            <p className='hero-description reveal reveal-3'>{siteContent.introduction.body}</p>

            <div className='hero-actions reveal reveal-4'>
              <Link className='primary-link' href={localizedPath(locale, '/posts')}>
                {en ? 'Read my writing' : '阅读文章'} <span aria-hidden='true'>↗</span>
              </Link>
              <a className='text-link' href='#work'>
                {en ? 'Explore projects' : '查看项目'} <span aria-hidden='true'>↓</span>
              </a>
            </div>
          </div>

          <aside className='signal-panel reveal reveal-4' aria-label={en ? 'Profile overview' : '个人概览'}>
            <div className='signal-heading'>
              <span className='signal-dot' aria-hidden='true' />
              <span>{en ? 'Always building' : '正在持续构建'}</span>
            </div>
            <dl>
              <div>
                <dt>NAME</dt>
                <dd>{siteContent.identity.englishName}</dd>
              </div>
              <div>
                <dt>ROLE</dt>
                <dd>{siteContent.identity.role}</dd>
              </div>
              <div>
                <dt>BASE</dt>
                <dd>{siteContent.identity.location}</dd>
              </div>
            </dl>
            <ul className='focus-list' aria-label={en ? 'Current technical focus' : '当前技术方向'}>
              {siteContent.focus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>

          <div className='hero-wordmark' aria-hidden='true'>
            LINZE.PRO
          </div>
        </section>

        <section id='about' className='statement-section page-shell motion-section' aria-labelledby='about-title'>
          <p className='section-kicker'>01 / APPROACH</p>
          <div>
            <h2 id='about-title'>
              {en
                ? 'I care about how systems evolve, not just what ships today.'
                : '不仅交付页面，也关心系统如何长期演进。'}
            </h2>
            <p>
              {en
                ? 'From interface hierarchy and server data contracts to caching, deployment and observability, I treat product experience and engineering quality as the same problem.'
                : '从界面信息层级、服务端数据契约，到缓存、部署与可观测性，我倾向于把产品体验和工程质量视为同一个问题。'}
            </p>
          </div>
        </section>

        <section id='work' className='work-section page-shell motion-section' aria-labelledby='work-title'>
          <div className='section-heading'>
            <p className='section-kicker'>02 / SELECTED WORK</p>
            <h2 id='work-title'>{en ? 'Selected projects' : '代表项目'}</h2>
          </div>

          <ol className='project-list'>
            {featuredProjects.map((project, index) => (
              <li key={project.name}>
                <a href={project.repository} rel='noreferrer' target='_blank'>
                  <span className='project-index'>{String(index + 1).padStart(2, '0')}</span>
                  <span className='project-main'>
                    <strong>{project.name}</strong>
                    <span>{project.description}</span>
                  </span>
                  <span className='project-stack'>{project.stack.slice(0, 3).join(' · ')}</span>
                  <span className='project-arrow' aria-hidden='true'>
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ol>
          <Link className='work-index-link' href={localizedPath(locale, '/projects')}>
            {en ? 'All projects' : '查看全部项目'} <span aria-hidden='true'>↗</span>
          </Link>
        </section>
      </main>
    </PageTransition>
  );
}
