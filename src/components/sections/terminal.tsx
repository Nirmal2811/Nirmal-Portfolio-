"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Fragment, useEffect, useRef, useState } from "react";

import { Section } from "@/components/section";
import { useThemeSwitch } from "@/components/theme-toggle";
import { WindowChrome } from "@/components/window-chrome";
import { useSectionNav } from "@/hooks/use-section-nav";
import { about, experience, profile, projects, sections, skillGroups, socials } from "@/lib/data";
import { fadeUp, inView } from "@/lib/motion";

type Entry = { id: number; input?: string; output: React.ReactNode };

const FILES: Record<string, string> = {
  "about.md": "about",
  "stack.json": "skills",
  "career.log": "experience",
  "projects.ts": "projects",
  "contact.tsx": "contact",
};

const SUGGESTIONS = ["help", "neofetch", "projects", "skills", "sudo hire-me", "theme"];

function Prompt() {
  return (
    <span className="mr-2 shrink-0 select-none">
      <span className="text-primary">{profile.handle}@portfolio</span>
      <span className="text-muted-foreground">:</span>
      <span className="text-cyan">~</span>
      <span className="text-muted-foreground">$</span>
    </span>
  );
}

function Neofetch() {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme ?? "dark";
  const totalSkills = skillGroups.reduce((n, g) => n + g.skills.length, 0);
  const rows: [string, string][] = [
    ["OS", "Portfolio OS 26.10 LTS"],
    ["Host", profile.url.replace("https://", "")],
    ["Kernel", "react-19.x-next-16"],
    ["Uptime", `${about.stats[0].value}+ years`],
    ["Packages", `${totalSkills} (npm)`],
    ["Shell", "zsh 5.9"],
    ["Theme", theme],
    ["Role", profile.role],
    ["Location", profile.location],
  ];
  return (
    <div className="flex flex-col gap-4 py-1 sm:flex-row sm:gap-8">
      <pre className="leading-tight text-primary select-none" aria-hidden="true">
        {String.raw`   _______________
  |  ___________  |
  | |  >_       | |
  | |           | |
  | |    ${profile.initials.padEnd(2)}     | |
  | |___________| |
  |_______________|
     _[_______]_
  ___[_________]___`}
      </pre>
      <div>
        <p>
          <span className="text-primary">{profile.handle}</span>@<span className="text-primary">portfolio</span>
        </p>
        <p className="text-muted-foreground">{"-".repeat(profile.handle.length + 10)}</p>
        {rows.map(([k, v]) => (
          <p key={k}>
            <span className="text-cyan">{k}</span>: {v}
          </p>
        ))}
        <div className="mt-2 flex gap-0" aria-hidden="true">
          {["bg-syntax-comment", "bg-destructive", "bg-primary", "bg-syntax-number", "bg-syntax-fn", "bg-syntax-keyword", "bg-cyan", "bg-foreground"].map((c) => (
            <span key={c} className={`h-3 w-5 ${c}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

const ExternalLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noreferrer" className="text-cyan underline-offset-4 hover:underline">
    {children}
  </a>
);

export function Terminal() {
  const { resolvedTheme } = useTheme();
  const switchTheme = useThemeSwitch();
  const goToSection = useSectionNav();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);

  const commands: Record<string, { desc: string; run: (args: string[]) => React.ReactNode }> = {
    help: {
      desc: "list available commands",
      run: () => (
        <div className="grid grid-cols-[110px_1fr] gap-x-4 gap-y-0.5 sm:grid-cols-[140px_1fr]">
          {Object.entries(commands).map(([name, c]) => (
            <Fragment key={name}>
              <span className="text-primary">{name}</span>
              <span className="text-muted-foreground">{c.desc}</span>
            </Fragment>
          ))}
        </div>
      ),
    },
    whoami: { desc: "who is this?", run: () => `${profile.name} — ${profile.role}` },
    about: { desc: "a short bio", run: () => about.paragraphs[0] },
    neofetch: { desc: "system information", run: () => <Neofetch /> },
    skills: {
      desc: "list my tech stack",
      run: () => (
        <div className="space-y-0.5">
          {skillGroups.map((g) => (
            <p key={g.id}>
              <span className="text-syntax-keyword">{g.label.padEnd(9)}</span>
              <span className="text-muted-foreground">→ </span>
              {g.skills.map((s) => s.name).join(", ")}
            </p>
          ))}
        </div>
      ),
    },
    projects: {
      desc: "featured work",
      run: () => (
        <div className="space-y-0.5">
          {projects.map((p) => (
            <p key={p.slug}>
              <span className="text-primary">{p.title.padEnd(30)}</span>
              <span className="text-syntax-number">{p.client.padEnd(26)}</span>
              <span className="text-muted-foreground">{p.stack.slice(0, 3).join(" · ")}</span>
            </p>
          ))}
        </div>
      ),
    },
    experience: {
      desc: "git log --oneline",
      run: () => (
        <div className="space-y-0.5">
          {experience.map((e) => (
            <p key={e.hash}>
              <span className="text-syntax-number">{e.hash}</span> {e.role} @ {e.company}{" "}
              <span className="text-muted-foreground">({e.period})</span>
            </p>
          ))}
        </div>
      ),
    },
    contact: {
      desc: "how to reach me",
      run: () => (
        <div className="space-y-0.5">
          <p>
            <span className="text-cyan">email</span>{"    "}
            <ExternalLink href={`mailto:${profile.email}`}>{profile.email}</ExternalLink>
          </p>
          <p>
            <span className="text-cyan">phone</span>{"    "}
            <ExternalLink href={`tel:${profile.phone.replace(/\s/g, "")}`}>{profile.phone}</ExternalLink>
          </p>
          {socials.map((s) => (
            <p key={s.name}>
              <span className="text-cyan">{s.name.toLowerCase().padEnd(8)}</span>{" "}
              <ExternalLink href={s.href}>{s.handle}</ExternalLink>
            </p>
          ))}
        </div>
      ),
    },
    ls: {
      desc: "list files",
      run: () => (
        <p className="flex flex-wrap gap-x-5">
          {Object.keys(FILES).map((f) => (
            <span key={f} className="text-syntax-fn">
              {f}
            </span>
          ))}
        </p>
      ),
    },
    cat: {
      desc: "print a file, e.g. cat about.md",
      run: ([file]) => {
        if (!file) return <span className="text-destructive">usage: cat &lt;file&gt;</span>;
        const cmd = FILES[file];
        if (!cmd) return <span className="text-destructive">cat: {file}: No such file or directory</span>;
        return commands[cmd].run([]);
      },
    },
    cd: {
      desc: "jump to a section, e.g. cd projects",
      run: ([target]) => {
        const s = sections.find((x) => x.id === target || x.file === target);
        if (!target || target === "~") {
          goToSection("home");
          return null;
        }
        if (!s) return <span className="text-destructive">cd: no such directory: {target}</span>;
        goToSection(s.id);
        return <span className="text-muted-foreground">→ opening {s.file}</span>;
      },
    },
    theme: {
      desc: "theme [light|dark]",
      run: ([mode]) => {
        const next = mode === "light" || mode === "dark" ? mode : resolvedTheme === "dark" ? "light" : "dark";
        const rect = inputRef.current?.getBoundingClientRect();
        switchTheme(rect ? { x: rect.left, y: rect.top } : undefined, next);
        return <span className="text-muted-foreground">theme set to “{next}”</span>;
      },
    },
    date: { desc: "print the date", run: () => new Date().toString() },
    echo: { desc: "print text", run: (args) => args.join(" ") },
    pwd: { desc: "print working directory", run: () => `/home/${profile.handle}/portfolio` },
    history: {
      desc: "command history",
      run: () => (
        <div>
          {history.map((h, i) => (
            <p key={i}>
              <span className="text-muted-foreground">{String(i + 1).padStart(4)}</span>  {h}
            </p>
          ))}
        </div>
      ),
    },
    sudo: {
      desc: "try it",
      run: (args) =>
        args.join(" ") === "hire-me" ? (
          <span>
            <span className="text-primary">[sudo]</span> access granted. Opening a channel →{" "}
            <ExternalLink href={`mailto:${profile.email}?subject=Let's%20work%20together`}>{profile.email}</ExternalLink>
          </span>
        ) : (
          <span className="text-destructive">
            visitor is not in the sudoers file. This incident will be reported.
          </span>
        ),
    },
    clear: { desc: "clear the terminal", run: () => null },
  };

  const easterEggs: Record<string, React.ReactNode> = {
    vim: "You entered vim. Good luck getting out. (hint: you can't)",
    exit: "There is no escape. Try `contact` instead.",
    "rm": <span className="text-destructive">rm: permission denied — nice try.</span>,
    coffee: "☕ Brewing… done. Productivity +42%.",
    hello: "Hey there! Type `help` to see what I can do.",
  };

  const execute = (raw: string) => {
    const input = raw.trim();
    if (!input) {
      setEntries((e) => [...e, { id: nextId.current++, input: "", output: null }]);
      return;
    }
    setHistory((h) => [...h, input]);
    setCursor(-1);

    const [name, ...args] = input.split(/\s+/);
    if (name === "clear") {
      setEntries([]);
      return;
    }
    let output: React.ReactNode;
    if (Object.hasOwn(commands, name)) output = commands[name].run(args);
    else if (Object.hasOwn(easterEggs, name)) output = easterEggs[name];
    else
      output = (
        <span>
          <span className="text-destructive">zsh: command not found: {name}</span>
          <span className="text-muted-foreground"> — type </span>
          <span className="text-primary">help</span>
        </span>
      );
    setEntries((e) => [...e, { id: nextId.current++, input, output }]);
  };

  // Greeting
  useEffect(() => {
    setEntries([
      {
        id: 0,
        output: (
          <span className="text-muted-foreground">
            Welcome to portfolio-shell v1.0.0 — type <span className="text-primary">help</span> to get started.
          </span>
        ),
      },
      { id: nextId.current++, input: "neofetch", output: <Neofetch /> },
    ]);
  }, []);

  // Keep the newest output in view without scrolling the page.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [entries]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      execute(value);
      setValue("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const next = cursor === -1 ? history.length - 1 : Math.max(0, cursor - 1);
      setCursor(next);
      setValue(history[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cursor === -1) return;
      const next = cursor + 1;
      if (next >= history.length) {
        setCursor(-1);
        setValue("");
      } else {
        setCursor(next);
        setValue(history[next]);
      }
    } else if (e.key === "Tab") {
      const match = Object.keys(commands).find((c) => value && c.startsWith(value));
      if (match) {
        e.preventDefault();
        setValue(match + " ");
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setEntries([]);
    }
  };

  return (
    <Section
      id="terminal"
      index="05"
      file="shell.sh"
      title={
        <>
          Prefer the <span className="text-gradient">command line</span>?
        </>
      }
      description="A tiny shell with real commands. Try help, neofetch, cat about.md, cd projects or sudo hire-me."
    >
      <motion.div initial="hidden" whileInView="show" viewport={inView} variants={fadeUp}>
        <WindowChrome
          title={`${profile.handle}@portfolio: ~ — zsh — 80×24`}
          className="bg-editor/95"
          bodyClassName="font-mono text-[12.5px] sm:text-[13px]"
        >
          <div
            ref={scrollRef}
            data-lenis-prevent
            onClick={() => {
              if (!window.getSelection()?.toString()) inputRef.current?.focus({ preventScroll: true });
            }}
            className="h-[420px] cursor-text overflow-y-auto overscroll-contain p-4 leading-relaxed sm:p-5"
          >
            {entries.map((entry) => (
              <div key={entry.id} className="mb-2">
                {entry.input !== undefined && (
                  <p className="flex flex-wrap">
                    <Prompt />
                    <span className="break-all">{entry.input}</span>
                  </p>
                )}
                {entry.output !== null && entry.output !== undefined && (
                  <div className="break-words whitespace-pre-wrap text-foreground/90">{entry.output}</div>
                )}
              </div>
            ))}

            <label className="flex items-center">
              <Prompt />
              <span className="sr-only">Terminal command</span>
              <input
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onKeyDown}
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                enterKeyHint="send"
                className="min-w-0 flex-1 bg-transparent text-foreground caret-primary outline-none focus-visible:outline-none"
              />
            </label>
          </div>
        </WindowChrome>

        <div className="mt-4 flex flex-wrap items-center gap-2 font-mono text-xs">
          <span className="text-muted-foreground">try:</span>
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => {
                execute(s);
                inputRef.current?.focus({ preventScroll: true });
              }}
              className="rounded-md border bg-card/60 px-2.5 py-1 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              {s}
            </button>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
