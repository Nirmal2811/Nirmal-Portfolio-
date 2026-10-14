"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";

import { ScrollToTop } from "@/components/scroll-to-top";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { ease } from "@/lib/motion";

/** Button height (h-12) + gap (gap-3): how far WhatsApp rises to make room for `cd ~`. */
const RAISE = 48 + 12;

/**
 * Bottom-right action stack. WhatsApp owns the corner; once you scroll down,
 * it glides up and the `cd ~` button takes the corner below it.
 */
export function FloatingActions() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 600));

  return (
    <div className="fixed right-4 bottom-5 z-40 flex flex-col items-end md:right-6 md:bottom-11">
      <motion.div animate={{ y: scrolled ? -RAISE : 0 }} transition={{ duration: 0.4, ease }}>
        <WhatsAppButton />
      </motion.div>
      <div className="absolute right-0 bottom-0">
        <ScrollToTop visible={scrolled} />
      </div>
    </div>
  );
}
