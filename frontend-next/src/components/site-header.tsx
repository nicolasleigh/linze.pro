import Link from "next/link";

import { LocaleSwitcher } from "@/components/locale-switcher";
import { getSiteContent } from "@/content/localized";
import { localizedPath, siteMessages } from "@/lib/i18n";
import type { BlogLocale } from "@/types/post";

export function SiteHeader({ locale }: { locale: BlogLocale }) {
  const siteContent = getSiteContent(locale);
  const copy = siteMessages[locale];
  const navigation = [
    { href: localizedPath(locale, "/about"), label: copy.navigation.about },
    { href: localizedPath(locale, "/posts"), label: copy.navigation.posts },
    { href: localizedPath(locale, "/projects"), label: copy.navigation.projects },
  ];

  return (
    <header
      className="site-header"
      style={{ viewTransitionName: "site-header" }}
    >
      <div className="page-shell flex h-18 items-center justify-between gap-6">
        <Link
          className="brand-mark"
          href={localizedPath(locale)}
          aria-label={copy.homeAria}
          transitionTypes={["nav-back"]}
        >
          <span>LZ</span>
          <span className="text-muted">/01</span>
        </Link>

        <nav aria-label={copy.mainNavigation}>
          <ul className="flex items-center gap-5 sm:gap-8">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link className="nav-link" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                className="nav-link hidden sm:inline-flex"
                href={siteContent.links.github}
                rel="noreferrer"
                target="_blank"
              >
                GitHub ↗
              </a>
            </li>
            <li>
              <LocaleSwitcher locale={locale} label={copy.language} />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
