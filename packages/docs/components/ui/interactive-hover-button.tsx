"use client";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

export function InteractiveHoverButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "group relative w-auto cursor-pointer overflow-hidden rounded-full border border-fd-border/50 p-2 px-6 text-center font-semibold text-fd-foreground",
        "bg-white/20 dark:bg-black/20 backdrop-blur-md backdrop-saturate-150",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <div className="bg-fd-primary h-2 w-2 rounded-full transition-all duration-300 group-hover:scale-[100.8]"></div>
        <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
          {children}
        </span>
      </div>
      <div className="text-fd-primary-foreground absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100">
        <span>{children}</span>
        <ArrowRight />
      </div>
    </button>
  );
}
