"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/** Scroll-spy: returns the id of the section currently crossing the middle of the viewport. */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState(ids[0]);
  // The navbar outlives page changes, so re-attach whenever the page (and its sections) change.
  const pathname = usePathname();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    setActive(ids[0]);
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [ids, pathname]);

  return active;
}
