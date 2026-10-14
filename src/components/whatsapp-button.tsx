"use client";

import { AnimatePresence, motion } from "framer-motion";

import { WhatsApp } from "@/components/brand-icons";
import { useBoot } from "@/components/providers/boot-provider";
import { whatsapp } from "@/lib/data";
import { ease } from "@/lib/motion";

/** WhatsApp chat button for the floating action stack; hovering reveals the command. */
export function WhatsAppButton() {
  const { ready } = useBoot();

  return (
    <AnimatePresence>
      {ready && (
        <motion.a
          key="whatsapp"
          href={whatsapp}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          initial={{ opacity: 0, y: 24, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.8 }}
          transition={{ duration: 0.4, ease, delay: 0.6 }}
          whileTap={{ scale: 0.92 }}
          className="group flex h-12 items-center rounded-full border bg-background p-1 font-mono text-xs shadow-lg shadow-black/10 transition-colors hover:border-[#25D366]/60 focus-visible:border-[#25D366]/60 md:bg-background/80 md:backdrop-blur-xl"
        >
          <span className="relative grid size-10 shrink-0 place-items-center rounded-full bg-[#25D366] text-white">
            <WhatsApp className="size-5" />
          </span>

          {/* label slides out on hover / keyboard focus */}
          <span className="grid grid-cols-[0fr] transition-[grid-template-columns] duration-300 ease-out group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr]">
            <span className="overflow-hidden">
              <span className="flex items-center gap-2 pr-4 pl-2 whitespace-nowrap">
                <span className="text-primary">$</span>
                <span className="text-foreground">./whatsapp.sh</span>
              </span>
            </span>
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
