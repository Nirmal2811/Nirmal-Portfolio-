"use client";

import { useLenis } from "lenis/react";
import { useCallback } from "react";

/** Scrolls to a section id, using Lenis when it is running and native scrolling otherwise. */
export function useScrollTo() {
  const lenis = useLenis();

  return useCallback(
    (id: string) => {
      const target = id === "home" ? 0 : document.getElementById(id);
      if (target === null) return;

      if (lenis) {
        lenis.scrollTo(target, { offset: -72, duration: 1.4 });
      } else if (target === 0) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      history.replaceState(null, "", id === "home" ? window.location.pathname : `#${id}`);
    },
    [lenis],
  );
}
