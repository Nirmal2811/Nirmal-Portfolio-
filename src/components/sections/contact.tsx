"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, CornerDownLeft, Phone } from "lucide-react";
import { useState } from "react";

import { brandIcons } from "@/components/brand-icons";
import { Spinner } from "@/components/effects/spinner";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { WindowChrome } from "@/components/window-chrome";
import { profile, socials } from "@/lib/data";
import { fadeUp, inView, stagger } from "@/lib/motion";

type Phase = "idle" | "sending" | "done";

/** Contact detail card that copies its value to the clipboard. */
function CopyField({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() =>
        navigator.clipboard?.writeText(value).then(() => {
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1800);
        })
      }
      aria-label={`Copy ${label}: ${value}`}
      className="group flex w-full items-center gap-4 rounded-xl border bg-card/60 p-4 text-left transition-colors hover:border-primary/50"
    >
      <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 font-mono text-primary">{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="block font-mono text-[11px] text-muted-foreground">{label}</span>
        <span className="block truncate font-medium">{value}</span>
      </span>
      <span className="relative flex size-8 items-center justify-center text-muted-foreground group-hover:text-foreground">
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
              <Check className="size-4 text-primary" />
            </motion.span>
          ) : (
            <motion.span key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
              <Copy className="size-4" />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
      <span className="sr-only" aria-live="polite">
        {copied ? `${label} copied to clipboard` : ""}
      </span>
    </button>
  );
}

function Field({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-1.5 pl-4 sm:grid-cols-[92px_1fr] sm:items-start sm:gap-3">
      <span className="pt-2 text-syntax-prop">&quot;{name}&quot;:</span>
      {children}
    </label>
  );
}

export function Contact() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPhase("sending");
    window.setTimeout(() => {
      setPhase("done");
      const subject = encodeURIComponent(`Hello from ${form.name}`);
      const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    }, 1100);
  };

  const inputClass = "border-dashed bg-background/60 font-mono text-[13px] focus-visible:border-solid";

  return (
    <Section
      id="contact"
      index="06"
      file="contact.tsx"
      title={
        <>
          Let&apos;s build something <span className="text-gradient">great</span> together.
        </>
      }
      description="Have a project, a role, or just want to talk shop? My inbox is always open — I usually reply within a day."
      className="pb-32 md:pb-40"
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <motion.div
          className="flex flex-col gap-4"
          initial="hidden"
          whileInView="show"
          viewport={inView}
          variants={stagger(0.08)}
        >
          <motion.div variants={fadeUp}>
            <CopyField label="email" value={profile.email} icon="@" />
          </motion.div>

          <motion.div variants={fadeUp}>
            <CopyField label="phone" value={profile.phone} icon={<Phone className="size-4" />} />
          </motion.div>

          <motion.div variants={fadeUp} className="rounded-xl border bg-card/60 p-5 font-mono text-[13px]">
            <p>
              <span className="text-syntax-keyword">export const</span> <span className="text-syntax-fn">socials</span>{" "}
              <span className="text-syntax-punct">= {"{"}</span>
            </p>
            <ul className="my-1">
              {socials.map((s) => {
                const Icon = brandIcons[s.name];
                return (
                  <li key={s.name}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group -mx-2 flex items-center gap-3 rounded-md px-2 py-1.5 pl-6 transition-colors hover:bg-secondary"
                    >
                      <Icon className="size-3.5 text-muted-foreground group-hover:text-foreground" />
                      <span className="text-syntax-prop">{s.name.toLowerCase()}:</span>
                      <span className="truncate text-syntax-string">&quot;{s.handle}&quot;</span>
                      <ArrowUpRight className="ml-auto size-3.5 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                    </a>
                  </li>
                );
              })}
            </ul>
            <p className="text-syntax-punct">{"};"}</p>
          </motion.div>

          <motion.div variants={fadeUp} className="rounded-xl border border-dashed p-5 font-mono text-xs text-muted-foreground">
            <span className="text-syntax-comment">{"// "}</span>
            Open to front-end developer roles and freelance projects. Based in {profile.location}.
          </motion.div>
        </motion.div>

        <motion.div initial="hidden" whileInView="show" viewport={inView} variants={fadeUp}>
          <WindowChrome
            title="POST /api/contact"
            right={<span className="font-mono text-[10px] text-primary">HTTP/1.1</span>}
          >
            <form onSubmit={onSubmit} className="space-y-3 p-5 font-mono text-[13px] sm:p-6">
              <div className="space-y-0.5 text-muted-foreground">
                <p>
                  <span className="font-semibold text-syntax-keyword">POST</span>{" "}
                  <span className="text-foreground">/api/contact</span> HTTP/1.1
                </p>
                <p>
                  <span className="text-cyan">Host:</span> {profile.url.replace("https://", "")}
                </p>
                <p>
                  <span className="text-cyan">Content-Type:</span> application/json
                </p>
              </div>

              <p className="pt-2 text-syntax-punct">{"{"}</p>
              <Field name="name">
                <Input required name="name" placeholder="Ada Lovelace" value={form.name} onChange={update("name")} className={inputClass} autoComplete="name" />
              </Field>
              <Field name="email">
                <Input required type="email" name="email" placeholder="ada@example.com" value={form.email} onChange={update("email")} className={inputClass} autoComplete="email" />
              </Field>
              <Field name="message">
                <Textarea
                  required
                  name="message"
                  rows={4}
                  placeholder="Hey! I'd love to chat about…"
                  value={form.message}
                  onChange={update("message")}
                  className={`${inputClass} resize-none`}
                  data-lenis-prevent
                />
              </Field>
              <p className="text-syntax-punct">{"}"}</p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button type="submit" size="lg" disabled={phase === "sending"} className="group font-mono">
                  {phase === "sending" ? <Spinner /> : <CornerDownLeft className="transition-transform group-hover:-translate-x-0.5" />}
                  {phase === "sending" ? "sending…" : "Send request"}
                </Button>
                <span className="text-[11px] text-muted-foreground">opens your mail client</span>
              </div>

              <AnimatePresence>
                {phase !== "idle" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                    aria-live="polite"
                  >
                    <div className="mt-3 rounded-lg border bg-muted/30 p-4 text-xs">
                      {phase === "sending" ? (
                        <p className="flex items-center gap-2 text-muted-foreground">
                          <Spinner className="text-primary" /> awaiting response…
                        </p>
                      ) : (
                        <motion.div initial="hidden" animate="show" variants={stagger(0.12)} className="space-y-0.5">
                          {[
                            <span key="s" className="text-primary">HTTP/1.1 302 Found</span>,
                            <span key="l"><span className="text-cyan">Location:</span> mailto:{profile.email}</span>,
                            <span key="m" className="text-muted-foreground">
                              → Handing off to your mail client. Thanks{form.name ? `, ${form.name.split(" ")[0]}` : ""}!
                            </span>,
                          ].map((line, i) => (
                            <motion.p key={i} variants={{ hidden: { opacity: 0, x: -6 }, show: { opacity: 1, x: 0 } }}>
                              {line}
                            </motion.p>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </WindowChrome>
        </motion.div>
      </div>
    </Section>
  );
}
