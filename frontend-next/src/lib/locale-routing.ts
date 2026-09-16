import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { defaultBlogLocale, localizedPath } from '@/lib/i18n';
import type { BlogLocale } from '@/types/post';

/**
 * 根据浏览器请求头中的 "Accept-Language" 自动推断访客的首选语言（Preferred Locale）。
 *
 * 算法执行流程：
 * 1. 从 Next.js 服务端上下文读取 "Accept-Language" 请求头，转换为小写；
 * 2. 依据 RFC 7231 / RFC 9110 规范解析语言标签与权重质量因子（q-factor，未指定时默认为 1.0）；
 * 3. 排序策略：按权重由高到低（降序）排列，权重相同时保留原始请求头中的先后顺序；
 * 4. 优先级匹配：
 *    - 忽略权重 <= 0 的语言项（HTTP 规范中 q=0 表示显式拒绝）；
 *    - 匹配中文族系（zh, zh-*）-> 映射为 "zh-CN"；
 *    - 匹配英文族系（en, en-*）-> 映射为 "en-US"；
 * 5. 兜底回退：若未匹配到系统支持的语言或未提供该请求头，则返回系统默认语言（defaultBlogLocale，即 "zh-CN"）。
 *
 * @returns {Promise<BlogLocale>} 推断出的博客语言代码
 */
export async function preferredLocale(): Promise<BlogLocale> {
  // 1. 读取请求头并转小写处理
  const language = (await headers()).get('accept-language')?.toLowerCase() ?? '';

  // 2. 解析语言条目、提取 q 权重并按优先级排序
  const choices = language
    .split(',')
    .map((entry, index) => {
      const [tag, ...parameters] = entry.trim().split(';');
      // 提取形如 "q=0.8" 中的权重数值，未显式声明时默认权重为 1
      const quality = Number(
        parameters
          .find((parameter) => parameter.trim().startsWith('q='))
          ?.trim()
          .slice(2) ?? '1',
      );
      return {
        tag,
        quality: Number.isFinite(quality) ? quality : 0,
        index, // 记录出现序号，作为平局决胜条件
      };
    })
    .sort((left, right) => right.quality - left.quality || left.index - right.index);

  // 3. 依权重优先级自高到低依次匹配支持的语言
  for (const choice of choices) {
    if (choice.quality <= 0) continue;
    if (choice.tag === 'zh' || choice.tag.startsWith('zh-')) return 'zh-CN';
    if (choice.tag === 'en' || choice.tag.startsWith('en-')) return 'en-US';
  }

  // 4. 未命中时返回默认语言兜底
  return defaultBlogLocale;
}

/**
 * 服务端重定向：根据访客的首选语言重定向到对应的本地化路径。
 * 例如访问根路径 "/" 时，自动重定向至 "/zh-CN" 或 "/en-US"。
 *
 * @param {string} path - 目标相对路径（默认为空字符串，即根路径）
 */
export async function redirectToPreferredLocale(path = '') {
  redirect(localizedPath(await preferredLocale(), path));
}
