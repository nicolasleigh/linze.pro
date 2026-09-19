import type { BlogLocale } from '@/types/post';

// 支持的博客多语言列表与默认语言
export const blogLocales = ['zh-CN', 'en-US'] as const satisfies readonly BlogLocale[];
export const defaultBlogLocale: BlogLocale = 'zh-CN';

// 类型守卫：校验字符串是否为受支持的语言代码
export function isBlogLocale(value: string): value is BlogLocale {
  return blogLocales.some((locale) => locale === value);
}

// 生成带语言前缀的路由路径（例如: localizedPath("zh-CN", "/posts") -> "/zh-CN/posts"）
export function localizedPath(locale: BlogLocale, path = '') {
  const normalized = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`;
  return `/${locale}${normalized}`;
}

// 语言切换器中展示的文本标签
export function localeLabel(locale: BlogLocale) {
  return locale === 'zh-CN' ? '中文' : 'EN';
}

// 站点通用文案（导航栏、页脚等）
export const siteMessages = {
  'zh-CN': {
    skip: '跳到正文',
    navigation: { about: '关于', posts: '文章', projects: '项目' },
    mainNavigation: '主导航',
    homeAria: '返回首页',
    language: '切换网站语言',
    footerNavigation: '页脚导航',
    footerStatement: '深思于架构，敏行于交付',
    explore: '探索',
    contact: '联系',
    legacyBlog: '旧版博客 (Vue)',
  },
  'en-US': {
    skip: 'Skip to content',
    navigation: { about: 'About', posts: 'Writing', projects: 'Projects' },
    mainNavigation: 'Main navigation',
    homeAria: 'Back to home',
    language: 'Change site language',
    footerNavigation: 'Footer navigation',
    footerStatement: 'Turning complex systems into clear, reliable products.',
    explore: 'Explore',
    contact: 'Contact',
    legacyBlog: 'Legacy Blog (Vue)',
  },
} as const;

// 文章详情页专用多语言文案字典
export const articleMessages = {
  'zh-CN': {
    home: '首页',
    posts: '文章',
    article: '正文',
    published: '发布',
    readingTime: '阅读',
    minutes: (minutes: number) => `约 ${minutes} 分钟`,
    author: '作者',
    contents: '目录',
    noSections: '本文没有分节',
    completed: '读到这里了',
    back: '返回全部文章',
    unavailableTitle: '文章暂时无法打开',
    unavailableBody: '内容服务可能正在更新，请稍后重新尝试。',
    fallback: '该文章暂未提供中文版本，当前展示英文原文。',
    language: '文章语言',
    languageUnavailable: (language: string) => `${language}版本暂未发布`,
    reads: '次阅读',
    likes: '个喜欢',
    topics: '文章主题',
  },
  'en-US': {
    home: 'Home',
    posts: 'Posts',
    article: 'Article',
    published: 'Published',
    readingTime: 'Reading time',
    minutes: (minutes: number) => `${minutes} min read`,
    author: 'Author',
    contents: 'Contents',
    noSections: 'This article has no sections.',
    completed: 'Thanks for reading',
    back: 'All posts',
    unavailableTitle: 'Article temporarily unavailable',
    unavailableBody: 'The content service may be updating. Please try again later.',
    fallback: 'An English translation is not available yet. The Chinese original is shown below.',
    language: 'Article language',
    languageUnavailable: (language: string) => `${language} version is not available yet`,
    reads: 'reads',
    likes: 'likes',
    topics: 'Article topics',
  },
} as const;
