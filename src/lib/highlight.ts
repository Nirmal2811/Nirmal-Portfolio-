/**
 * A deliberately tiny, dependency-free tokenizer for decorative code snippets.
 * It is not a parser — it just colours things that look like TS/JS/Go/Rust.
 */

export type TokenType =
  | "keyword"
  | "string"
  | "number"
  | "comment"
  | "fn"
  | "type"
  | "prop"
  | "punct"
  | "plain";

export type Token = { type: TokenType; text: string };

const KEYWORDS = new Set([
  "const", "let", "var", "function", "return", "if", "else", "for", "while",
  "import", "from", "export", "default", "new", "await", "async", "true",
  "false", "null", "undefined", "type", "interface", "class", "extends",
  "func", "fn", "pub", "struct", "impl", "mut", "use", "package", "Infinity",
  "def", "None", "True", "False", "while", "endwhile", "endif", "php",
]);

const RULES: [TokenType, RegExp][] = [
  ["comment", /^(\/\/[^\n]*|#[^\n!]*(?=\n|$))/],
  ["string", /^("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`(?:[^`\\]|\\.)*`)/],
  ["number", /^\b\d+(?:\.\d+)?(?:ms|s|px)?\b/],
  ["fn", /^[A-Za-z_$][\w$]*(?=\s*\()/],
  ["prop", /^[A-Za-z_$][\w$-]*(?=\s*:(?!:))/],
  ["plain", /^[A-Za-z_$][\w$]*/],
  ["punct", /^[{}()[\];,.<>:=+\-*/&|!?@]+/],
  ["plain", /^\s+/],
  ["plain", /^./],
];

export function highlight(code: string): Token[] {
  const tokens: Token[] = [];
  let rest = code;

  while (rest.length) {
    for (const [type, re] of RULES) {
      const match = re.exec(rest);
      if (!match) continue;
      const text = match[0];
      let resolved: TokenType = type;
      if (type === "plain" && /^[A-Za-z_$]/.test(text)) {
        if (KEYWORDS.has(text)) resolved = "keyword";
        else if (/^[A-Z]/.test(text)) resolved = "type";
      }
      if (type === "fn" && KEYWORDS.has(text)) resolved = "keyword";

      const last = tokens[tokens.length - 1];
      if (last && last.type === resolved && resolved === "plain") last.text += text;
      else tokens.push({ type: resolved, text });

      rest = rest.slice(text.length);
      break;
    }
  }
  return tokens;
}

export const tokenClass: Record<TokenType, string> = {
  keyword: "text-syntax-keyword",
  string: "text-syntax-string",
  number: "text-syntax-number",
  comment: "text-syntax-comment italic",
  fn: "text-syntax-fn",
  type: "text-syntax-type",
  prop: "text-syntax-prop",
  punct: "text-syntax-punct",
  plain: "text-foreground/90",
};
