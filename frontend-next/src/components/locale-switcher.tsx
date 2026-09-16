"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { blogLocales, localeLabel } from "@/lib/i18n";
import type { BlogLocale } from "@/types/post";

export function LocaleSwitcher({ locale, label }: { locale: BlogLocale; label: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  function switchLocale(nextLocale: BlogLocale) {
    if (nextLocale === locale) return;
    const isArticle = /^\/(zh-CN|en-US)\/posts\/[^/]+$/.test(pathname);
    const available = document.querySelector<HTMLElement>("main[data-available-locales]")?.dataset.availableLocales?.split(",");
    if (isArticle && available && !available.includes(nextLocale)) {
      router.replace(`/${nextLocale}/posts`);
      return;
    }
    const segments = pathname.split("/");
    segments[1] = nextLocale;
    const query = searchParams.toString();
    router.replace(`${segments.join("/")}${query ? `?${query}` : ""}`, {
      scroll: false,
    });
  }

  return (
    <div className="site-language-switch" role="group" aria-label={label}>
      {blogLocales.map((item) => (
        <button
          key={item}
          type="button"
          lang={item}
          aria-pressed={item === locale}
          onClick={() => switchLocale(item)}
        >
          {localeLabel(item)}
        </button>
      ))}
    </div>
  );
}
