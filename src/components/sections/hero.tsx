"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin, Send } from "lucide-react";

import { brandIcons } from "@/components/brand-icons";
import { HeroBackground } from "@/components/effects/hero-background";
import { ScrambleText } from "@/components/effects/scramble-text";
import { Typewriter } from "@/components/effects/typewriter";
import { HeroIde } from "@/components/hero-ide";
import { useBoot } from "@/components/providers/boot-provider";
import { Button } from "@/components/ui/button";
import { useScrollTo } from "@/hooks/use-scroll-to";
import { profile, socials } from "@/lib/data";
import { fadeUp, stagger } from "@/lib/motion";

export function Hero() {
  const { ready } = useBoot();
  const scrollTo = useScrollTo();

  return (
    <section id="home" className="relative isolate flex min-h-svh items-center overflow-hidden pt-28 pb-24">
      <HeroBackground />

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-16 px-4 sm:px-6 lg:grid-cols-[1fr_1.12fr] lg:gap-10">
        <motion.div variants={stagger(0.1, 0.15)} initial="hidden" animate={ready ? "show" : "hidden"}>
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2.5 rounded-full border bg-background/60 px-3 py-1 font-mono text-xs text-muted-foreground backdrop-blur">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-pulse-ring rounded-full bg-primary" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              status: <span className="text-foreground">available for work</span>
            </span>
          </motion.div>

          <motion.p variants={fadeUp} className="mt-8 font-mono text-sm text-muted-foreground">
            <span className="text-primary">❯</span> whoami
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-3 font-mono text-[2.6rem] leading-[1.05] font-bold tracking-tighter sm:text-6xl lg:text-[4.25rem]"
          >
            <ScrambleText text={profile.name} enabled={ready} duration={1400} delay={250} scrambleOnHover />
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-5 font-mono text-base text-muted-foreground sm:text-xl">
            <span className="text-syntax-keyword">const</span> <span className="text-syntax-prop">role</span>{" "}
            <span className="text-syntax-punct">=</span>{" "}
            <span className="text-syntax-string">
              &quot;
              <Typewriter words={profile.roles} enabled={ready} />
              &quot;
            </span>
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg"
          >
            {profile.tagline}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-3">
            <Button size="lg" className="group h-11 font-mono" onClick={() => scrollTo("projects")}>
              npm run projects
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="group h-11 bg-background/50 font-mono backdrop-blur"
              onClick={() => scrollTo("contact")}
            >
              <Send className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              ./contact.sh
            </Button>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 text-muted-foreground">
            <div className="flex items-center gap-1">
              {socials.map((s) => {
                const Icon = brandIcons[s.name];
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.name}
                    className="rounded-md p-2 transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    <Icon className="size-[18px]" />
                  </a>
                );
              })}
            </div>
            <span className="h-5 w-px bg-border" />
            <span className="flex items-center gap-1.5 font-mono text-xs">
              <MapPin className="size-3.5" /> {profile.location}
            </span>
          </motion.div>
        </motion.div>

        <HeroIde ready={ready} />
      </div>

      <motion.button
        onClick={() => scrollTo("about")}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground md:flex"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : undefined}
        transition={{ delay: 2.2, duration: 1 }}
        aria-label="Scroll to about section"
      >
        <span className="flex h-9 w-5 justify-center rounded-full border border-muted-foreground/40 pt-1.5">
          <motion.span
            className="h-1.5 w-1 rounded-full bg-primary"
            animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
        scroll
      </motion.button>
    </section>
  );
}
