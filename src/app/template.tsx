"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

import { ease } from "@/lib/motion";

// Only flipped in the browser, so the server render and first paint are always fully visible.
let hydrated = false;

/** Re-mounts on every navigation, so each page after the first fades and slides in. */
export default function Template({ children }: { children: React.ReactNode }) {
  const animateIn = hydrated;
  useEffect(() => {
    hydrated = true;
  }, []);

  return (
    <motion.div
      initial={animateIn ? { opacity: 0, y: 16 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease }}
    >
      {children}
    </motion.div>
  );
}
