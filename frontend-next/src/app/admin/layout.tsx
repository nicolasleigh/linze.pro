import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "内容后台",
    template: "%s · 内容后台",
  },
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
