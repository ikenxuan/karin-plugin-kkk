"use client";
import { Tabs } from "@heroui/react";
import { Icon } from '@iconify/react';
import { useCallback, useEffect, useRef, useState, type Key } from "react";
import { cn } from "@/lib/cn";

type Theme = "system" | "inverse";
type ResolvedTheme = "light" | "dark";

interface AnimatedThemeTogglerProps {
  duration?: number;
  className?: string;
}

const getSystemTheme = (): ResolvedTheme => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const getInverseSystemTheme = (): ResolvedTheme => {
  return getSystemTheme() === "dark" ? "light" : "dark";
};

const getThemeByResolvedTheme = (resolvedTheme: ResolvedTheme): Theme => {
  return getSystemTheme() === resolvedTheme ? "system" : "inverse";
};

interface ViewTransition {
  ready: Promise<void>;
  finished: Promise<void>;
  skipTransition: () => void;
}

export const AnimatedThemeToggler = ({ className, duration = 400 }: AnimatedThemeTogglerProps) => {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pendingRef = useRef(false);

  const applyTheme = useCallback((t: Theme) => {
    const resolved = t === "system" ? getSystemTheme() : getInverseSystemTheme();
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(resolved);
    setIsDark(resolved === "dark");
  }, []);

  // 初始化主题
  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    const initial = stored === "inverse" ? "inverse" : "system";
    applyTheme(initial);
    setMounted(true);

    // 监听系统主题变化
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      const current = localStorage.getItem("theme") as Theme | null;
      applyTheme(current === "inverse" ? "inverse" : "system");
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [applyTheme]);

  const switchTheme = useCallback(
    (nextResolvedTheme: ResolvedTheme) => {
      const newTheme = getThemeByResolvedTheme(nextResolvedTheme);
    const doSwitch = () => {
      localStorage.setItem("theme", newTheme);
      applyTheme(newTheme);
    };

    // 如果正在等待上一个 transition，直接切换不带动画
    if (pendingRef.current) {
      doSwitch();
      return;
    }

    if (!containerRef.current) {
      doSwitch();
      return;
    }

    const doc = document as Document & {
      startViewTransition?: (callback: () => void) => ViewTransition;
    };

    if (!doc.startViewTransition) {
      doSwitch();
      return;
    }

    const rect = containerRef.current.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const maxRadius = Math.hypot(
      Math.max(rect.left, window.innerWidth - rect.left),
      Math.max(rect.top, window.innerHeight - rect.top)
    );

    pendingRef.current = true;

    const transition = doc.startViewTransition(doSwitch);

    transition.ready
      .then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxRadius}px at ${x}px ${y}px)`] },
          { duration, easing: "ease-in-out", pseudoElement: "::view-transition-new(root)" }
        );
      })
      .catch(() => {});

    transition.finished.finally(() => {
      pendingRef.current = false;
    });
    },
    [duration, applyTheme]
  );

  const handleSelectionChange = useCallback(
    (key: Key) => {
      const resolvedTheme = String(key) === "dark" ? "dark" : "light";
      if ((resolvedTheme === "dark") === isDark) return;
      switchTheme(resolvedTheme);
    },
    [isDark, switchTheme]
  );

  if (!mounted) {
    return (
      <div className={cn("inline-flex items-center", className)}>
        <Tabs selectedKey="light">
          <Tabs.ListContainer>
            <Tabs.List aria-label="主题切换" className="inline-flex rounded-full gap-2 border border-fd-border bg-fd-secondary p-0.5">
              <Tabs.Tab id="light" className="h-7.5 min-w-0 rounded-full px-1.5">
                <Icon icon="lucide:sun" className="size-4" />
              </Tabs.Tab>
              <Tabs.Tab id="dark" className="h-7.5 min-w-0 rounded-full px-1.5">
                <Icon icon="lucide:moon" className="size-4" />
              </Tabs.Tab>
            </Tabs.List>
          </Tabs.ListContainer>
        </Tabs>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={cn("inline-flex items-center", className)}>
      <Tabs selectedKey={isDark ? "dark" : "light"} onSelectionChange={handleSelectionChange}>
        <Tabs.ListContainer>
          <Tabs.List aria-label="主题切换" className="inline-flex rounded-full gap-2 border border-fd-border bg-fd-secondary p-0.5">
            <Tabs.Tab id="light" className="h-7.5 min-w-0 rounded-full px-1.5 text-fd-muted-foreground">
              <Icon icon="lucide:sun" className="size-5" />
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab id="dark" className="h-7.5 min-w-0 rounded-full px-1.5 text-fd-muted-foreground">
              <Icon icon="lucide:moon" className="size-5" />
              <Tabs.Indicator />
            </Tabs.Tab>
          </Tabs.List>
        </Tabs.ListContainer>
      </Tabs>
    </div>
  );
};
