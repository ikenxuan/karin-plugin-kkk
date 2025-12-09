"use client";

import Link from "next/link";
import { KKKLogo } from "./kkk-logo";
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";
import { useSearchContext, SearchOnly } from "fumadocs-ui/contexts/search";
import { Search } from "lucide-react";

function SearchButton() {
  const { setOpenSearch, hotKey } = useSearchContext();

  return (
    <button
      type="button"
      className="inline-flex items-center gap-2 rounded-full border border-fd-border bg-fd-secondary/50 px-3 py-1.5 text-sm text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground md:w-48"
      onClick={() => setOpenSearch(true)}
    >
      <Search className="size-4" />
      <span className="hidden flex-1 text-left md:inline">Search...</span>
      <kbd className="hidden rounded bg-fd-muted px-1.5 py-0.5 text-xs font-medium md:inline">
        {hotKey[0]?.display ?? "⌘K"}
      </kbd>
    </button>
  );
}

export function CustomNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-fd-border/50 bg-fd-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center">
            <KKKLogo />
          </Link>
          <div className="hidden items-center gap-4 text-sm md:flex">
            <Link
              href="https://github.com/ikenxuan/karin-plugin-kkk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-fd-muted-foreground transition-colors hover:text-fd-foreground"
            >
              GitHub
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <SearchOnly>
            <SearchButton />
          </SearchOnly>
          <AnimatedThemeToggler />
        </div>
      </nav>
    </header>
  );
}
