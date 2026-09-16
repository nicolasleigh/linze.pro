"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  getEngagement,
  likePost,
  recordPostView,
  type Engagement,
} from "@/lib/engagement-api";
import type { BlogLocale } from "@/types/post";

type ArticleEngagementProps = {
  slug: string;
  initialLikeCount: number;
  initialViewCount: number;
  locale?: BlogLocale;
};

export function ArticleEngagement({
  slug,
  initialLikeCount,
  initialViewCount,
  locale = "zh-CN",
}: ArticleEngagementProps) {
  const numberFormatter = new Intl.NumberFormat(locale);
  const copy =
    locale === "en-US"
      ? {
          unavailable: "Engagement data is temporarily unavailable",
          duplicate: "You already liked this article",
          thanks: "Thanks for the like",
          failed: "The like did not go through. Please try again.",
          reads: "reads",
          liked: "Liked",
          like: "Like this article",
        }
      : {
          unavailable: "互动数据暂时不可用",
          duplicate: "你已经喜欢过这篇文章",
          thanks: "感谢喜欢",
          failed: "点赞没有成功，请稍后重试",
          reads: "次阅读",
          liked: "已喜欢",
          like: "喜欢这篇文章",
        };
  const [engagement, setEngagement] = useState<Engagement>({
    viewCount: initialViewCount,
    likeCount: initialLikeCount,
    liked: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isLiking, setIsLiking] = useState(false);
  const [message, setMessage] = useState("");
  const viewSubmitted = useRef(false);

  useEffect(() => {
    const controller = new AbortController();

    getEngagement(slug, controller.signal)
      .then((value) => {
        if (controller.signal.aborted) return;
        setEngagement(value);
        setMessage("");
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setMessage(copy.unavailable);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => controller.abort();
  }, [copy.unavailable, slug]);

  const submitView = useCallback(() => {
    if (viewSubmitted.current || document.visibilityState !== "visible") {
      return;
    }

    viewSubmitted.current = true;
    recordPostView(slug)
      .then((value) => {
        setEngagement((current) => ({
          ...value,
          liked: current.liked || value.liked,
          likeCount: Math.max(current.likeCount, value.likeCount),
        }));
      })
      .catch(() => undefined);
  }, [slug]);

  useEffect(() => {
    const startedAt = Date.now();
    const timer = window.setTimeout(submitView, 8_000);

    const checkReadingProgress = () => {
      const article = document.querySelector<HTMLElement>(".article-prose");
      if (!article) return;

      const rect = article.getBoundingClientRect();
      const distanceRead = Math.max(0, -rect.top + window.innerHeight * 0.7);
      const progress = distanceRead / Math.max(rect.height, 1);

      if (progress >= 0.25 || Date.now() - startedAt >= 8_000) {
        submitView();
      }
    };

    window.addEventListener("scroll", checkReadingProgress, { passive: true });
    document.addEventListener("visibilitychange", checkReadingProgress);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", checkReadingProgress);
      document.removeEventListener("visibilitychange", checkReadingProgress);
    };
  }, [submitView]);

  const handleLike = async () => {
    if (engagement.liked || isLiking) return;

    const previous = engagement;
    setIsLiking(true);
    setMessage("");
    setEngagement({
      ...engagement,
      liked: true,
      likeCount: engagement.likeCount + 1,
    });

    try {
      const value = await likePost(slug);
      setEngagement(value);
      setMessage(value.created === false ? copy.duplicate : copy.thanks);
    } catch {
      setEngagement((current) => ({
        ...current,
        liked: previous.liked,
        likeCount: previous.likeCount,
      }));
      setMessage(copy.failed);
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <section className="article-engagement" aria-label={locale === "en-US" ? "Article engagement" : "文章互动"}>
      <div className="article-engagement-stat">
        <span className="article-engagement-label">READS</span>
        <strong>{numberFormatter.format(engagement.viewCount)}</strong>
        <span>{copy.reads}</span>
      </div>

      <button
        className="article-like-button"
        type="button"
        data-liked={engagement.liked}
        aria-pressed={engagement.liked}
        disabled={isLiking || isLoading}
        onClick={handleLike}
      >
        <span className="article-like-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
          </svg>
        </span>
        <span>
          <span className="article-engagement-label">
            {engagement.liked ? "LIKED" : "LIKE"}
          </span>
          <strong>{numberFormatter.format(engagement.likeCount)}</strong>
          <span>{engagement.liked ? copy.liked : copy.like}</span>
        </span>
      </button>

      <p className="article-engagement-message" aria-live="polite">
        {message}
      </p>
    </section>
  );
}
