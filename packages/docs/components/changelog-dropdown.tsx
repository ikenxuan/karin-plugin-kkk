'use client';

import Link from 'next/link';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/cn';

interface ChangelogDropdownProps {
  latestVersion?: string;
  currentVersion?: string;
}

export function ChangelogDropdown({ latestVersion = 'v2.x.x', currentVersion = 'v2' }: ChangelogDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex gap-1 items-center px-2 py-1 text-sm font-medium rounded-md transition-colors text-muted-foreground hover:text-foreground hover:bg-fd-accent/50"
      >
        <span>{latestVersion}</span>
        <ChevronDown className={cn("size-3 transition-transform duration-200", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 py-1 mt-1 w-48 rounded-md border shadow-md duration-100 border-fd-border bg-fd-popover animate-in fade-in zoom-in-95">
          <div className="flex flex-col">
            <Link
              href="/changelog?version=v2"
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center justify-between px-3 py-2 mx-1 text-sm rounded-sm transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground",
                currentVersion === 'v2' && "bg-fd-accent text-fd-accent-foreground"
              )}
            >
              <span>Changelog</span>
              <ExternalLink className="opacity-50 size-3" />
            </Link>

            <div className="my-1 border-t border-fd-border" />

            <Link
              href="/changelog?version=v1"
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center justify-between px-3 py-2 mx-1 text-sm rounded-sm transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground",
                currentVersion === 'v1' && "bg-fd-accent text-fd-accent-foreground"
              )}
            >
              <span>v1 Docs</span>
              <ExternalLink className="opacity-50 size-3" />
            </Link>

            <Link
              href="/changelog?version=v0"
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center justify-between px-3 py-2 mx-1 text-sm rounded-sm transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground",
                currentVersion === 'v0' && "bg-fd-accent text-fd-accent-foreground"
              )}
            >
              <span>v0 Docs</span>
              <ExternalLink className="opacity-50 size-3" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
