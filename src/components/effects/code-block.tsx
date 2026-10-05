import { useMemo } from "react";

import { highlight, tokenClass, type Token } from "@/lib/highlight";
import { cn } from "@/lib/utils";

/** Splits a token stream into lines of tokens. */
function toLines(tokens: Token[]): Token[][] {
  const lines: Token[][] = [[]];
  for (const token of tokens) {
    token.text.split("\n").forEach((part, i) => {
      if (i > 0) lines.push([]);
      if (part) lines[lines.length - 1].push({ type: token.type, text: part });
    });
  }
  return lines;
}

type CodeBlockProps = {
  code: string;
  className?: string;
  lineNumbers?: boolean;
};

/** Static, syntax-highlighted code. */
export function CodeBlock({ code, className, lineNumbers = false }: CodeBlockProps) {
  const lines = useMemo(() => toLines(highlight(code)), [code]);

  return (
    <pre className={cn("relative font-mono text-[13px] leading-[1.65]", className)}>
      <code>
        {lines.map((line, i) => (
          <div key={i} className="flex min-h-[1.65em]">
            {lineNumbers && (
              <span className="mr-5 inline-block w-5 shrink-0 text-right text-editor-gutter select-none">
                {i + 1}
              </span>
            )}
            <span className="whitespace-pre">
              {line.map((t, j) => (
                <span key={j} className={tokenClass[t.type]}>
                  {t.text}
                </span>
              ))}
            </span>
          </div>
        ))}
      </code>
    </pre>
  );
}
