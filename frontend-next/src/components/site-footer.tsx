import Link from 'next/link';

import { getSiteContent } from '@/content/localized';
import { localizedPath, siteMessages } from '@/lib/i18n';
import type { BlogLocale } from '@/types/post';

export function SiteFooter({ locale }: { locale: BlogLocale }) {
  const siteContent = getSiteContent(locale);
  const copy = siteMessages[locale];
  const footerNavigation = [
    { href: localizedPath(locale, '/about'), label: copy.navigation.about },
    { href: localizedPath(locale, '/posts'), label: copy.navigation.posts },
    { href: localizedPath(locale, '/projects'), label: copy.navigation.projects },
  ];

  return (
    <footer className='global-footer page-shell' style={{ viewTransitionName: 'site-footer' }}>
      <div className='footer-identity'>
        <Link href={localizedPath(locale)}>LINZE.PRO</Link>
        <p>{copy.footerStatement}</p>
      </div>

      <nav aria-label={copy.footerNavigation}>
        <p className='footer-label'>{copy.explore.toUpperCase()}</p>
        <ul>
          {footerNavigation.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
          <li>
            <a href='https://vue.linze.pro' rel='noreferrer' target='_blank'>
              {copy.legacyBlog} ↗
            </a>
          </li>
        </ul>
      </nav>

      <div className='footer-contact'>
        <p className='footer-label'>{copy.contact.toUpperCase()}</p>
        <a href={siteContent.links.email}>Email ↗</a>
        <a href={siteContent.links.github} rel='noreferrer' target='_blank'>
          GitHub ↗
        </a>
        <a href={localizedPath(locale, '/rss.xml')}>RSS ↗</a>
      </div>

      <p className='footer-meta'>
        © {new Date().getFullYear()} {siteContent.identity.englishName}
      </p>
    </footer>
  );
}
