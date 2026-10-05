"use client";

import { Check, Copy, FileCode2, Moon, Sun, TerminalSquare } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { brandIcons } from "@/components/brand-icons";
import { useThemeSwitch } from "@/components/theme-toggle";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useSectionNav } from "@/hooks/use-section-nav";
import { profile, sections, socials } from "@/lib/data";

export const OPEN_COMMAND_MENU = "open-command-menu";

export function openCommandMenu() {
  window.dispatchEvent(new Event(OPEN_COMMAND_MENU));
}

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const goToSection = useSectionNav();
  const switchTheme = useThemeSwitch();
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_COMMAND_MENU, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_COMMAND_MENU, onOpen);
    };
  }, []);

  const run = (fn: () => void) => {
    setOpen(false);
    // Let the dialog close (and release its focus trap) before scrolling or navigating.
    window.setTimeout(fn, 120);
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title="Command palette"
      description="Jump to a section or run an action"
      className="border-border/80 font-mono sm:max-w-xl"
    >
      <CommandInput placeholder="Type a command or search…" />
      <CommandList data-lenis-prevent className="max-h-[360px]">
        <CommandEmpty>No results. Try “projects”.</CommandEmpty>
        <CommandGroup heading="Go to file">
          {sections.map((s) => (
            <CommandItem key={s.id} value={`${s.file} ${s.label}`} onSelect={() => run(() => goToSection(s.id))}>
              <FileCode2 />
              <span>{s.file}</span>
              <CommandShortcut>{s.label}</CommandShortcut>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem value="toggle theme" onSelect={() => run(() => switchTheme())}>
            {resolvedTheme === "dark" ? <Sun /> : <Moon />}
            <span>Toggle theme</span>
            <CommandShortcut>{resolvedTheme === "dark" ? "→ light" : "→ dark"}</CommandShortcut>
          </CommandItem>
          <CommandItem
            value="copy email"
            onSelect={() => {
              navigator.clipboard?.writeText(profile.email).then(() => {
                setCopied(true);
                window.setTimeout(() => {
                  setCopied(false);
                  setOpen(false);
                }, 700);
              });
            }}
          >
            {copied ? <Check className="text-primary" /> : <Copy />}
            <span>{copied ? "Copied!" : "Copy email address"}</span>
            <CommandShortcut>{profile.email}</CommandShortcut>
          </CommandItem>
          <CommandItem value="open terminal shell" onSelect={() => run(() => goToSection("terminal"))}>
            <TerminalSquare />
            <span>Open interactive terminal</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Socials">
          {socials.map((s) => {
            const Icon = brandIcons[s.name];
            return (
              <CommandItem
                key={s.name}
                value={`social ${s.name}`}
                onSelect={() => run(() => window.open(s.href, "_blank", "noopener,noreferrer"))}
              >
                <Icon className="size-4" />
                <span>{s.name}</span>
                <CommandShortcut>{s.handle}</CommandShortcut>
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
