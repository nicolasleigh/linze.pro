import { ViewTransition } from "react";

export function PageTransition({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ViewTransition
      enter={{ "nav-back": "page-back", default: "page-enter" }}
      exit={{ "nav-back": "page-back", default: "page-exit" }}
      default="none"
    >
      {children}
    </ViewTransition>
  );
}
