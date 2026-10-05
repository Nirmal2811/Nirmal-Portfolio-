"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

import { useScrollTo } from "@/hooks/use-scroll-to";

/**
 * Go to a home-page section: smooth-scroll when already on the home page,
 * otherwise (e.g. from a project page) navigate home and land on the section.
 */
export function useSectionNav() {
  const pathname = usePathname();
  const router = useRouter();
  const scrollTo = useScrollTo();

  return useCallback(
    (id: string) => {
      if (pathname === "/") scrollTo(id);
      // Lenis (ScrollReset in providers) lands on the #section; Next's own scroll would fight it.
      else router.push(id === "home" ? "/" : `/#${id}`, { scroll: false });
    },
    [pathname, router, scrollTo],
  );
}
