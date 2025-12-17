'use client';

import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/cn';

interface SidebarFooterProps {
  latestVersion?: string;
  currentVersion?: string;
}

export function SidebarFooter({ latestVersion = 'v2.x.x', currentVersion = 'v2' }: SidebarFooterProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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
    <div className="md:hidden relative" ref={containerRef}>
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1.5 text-fd-muted-foreground text-sm p-1.5 hover:bg-fd-accent hover:text-fd-accent-foreground rounded-md transition-colors"
      >
        <span className="whitespace-nowrap">{latestVersion}</span>
        <ChevronDown className={cn('size-3 transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="absolute bottom-full right-0 mb-1 min-w-28 rounded-lg border bg-fd-popover p-1 text-fd-popover-foreground shadow-md z-50">
          <p className="mb-1 p-1.5 text-xs font-medium text-fd-muted-foreground">
            更新日志
          </p>
          <Link
            href="/changelog?version=v2"
            onClick={() => setOpen(false)}
            className={cn(
              'flex w-full items-center rounded-md p-1.5 text-sm transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground',
              currentVersion === 'v2' && 'bg-fd-accent text-fd-accent-foreground'
            )}
          >
            v2
          </Link>
          <Link
            href="/changelog?version=v1"
            onClick={() => setOpen(false)}
            className={cn(
              'flex w-full items-center rounded-md p-1.5 text-sm transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground',
              currentVersion === 'v1' && 'bg-fd-accent text-fd-accent-foreground'
            )}
          >
            v1
          </Link>
          <Link
            href="/changelog?version=v0"
            onClick={() => setOpen(false)}
            className={cn(
              'flex w-full items-center rounded-md p-1.5 text-sm transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground',
              currentVersion === 'v0' && 'bg-fd-accent text-fd-accent-foreground'
            )}
          >
            v0
          </Link>
        </div>
      )}
    </div>
  );
}
