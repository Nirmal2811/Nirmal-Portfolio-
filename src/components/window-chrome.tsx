import { cn } from "@/lib/utils";

type WindowChromeProps = {
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  right?: React.ReactNode;
};

/** macOS-style window frame used for editors, terminals and cards. */
export function WindowChrome({ title, children, className, bodyClassName, right }: WindowChromeProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border bg-card/80 shadow-2xl shadow-black/5 backdrop-blur-sm dark:shadow-black/40",
        className,
      )}
    >
      <div className="flex h-10 items-center gap-3 border-b bg-muted/40 px-4">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="min-w-0 flex-1 truncate text-center font-mono text-xs text-muted-foreground">
          {title}
        </div>
        <div className="flex min-w-[52px] justify-end">{right}</div>
      </div>
      <div className={bodyClassName}>{children}</div>
    </div>
  );
}
