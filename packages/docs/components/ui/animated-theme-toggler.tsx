"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/cn";

type Theme = "system" | "inverse";

interface AnimatedThemeTogglerProps {
  duration?: number;
  className?: string;
}

function getSystemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getInverseSystemTheme(): "light" | "dark" {
  return getSystemTheme() === "dark" ? "light" : "dark";
}

interface ViewTransition {
  ready: Promise<void>;
  finished: Promise<void>;
  skipTransition: () => void;
}

export const AnimatedThemeToggler = ({ className, duration = 400 }: AnimatedThemeTogglerProps) => {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
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

  const toggleTheme = useCallback(() => {
    // 从 localStorage 读取当前真实状态
    const currentTheme = localStorage.getItem("theme") as Theme | null;
    const newTheme: Theme = currentTheme === "inverse" ? "system" : "inverse";

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
  }, [duration, applyTheme]);

  // 服务端渲染时使用固定样式，避免水合错误
  if (!mounted) {
    return (
      <div
        className={cn(
          "inline-flex items-center rounded-full border p-0.5 text-fd-muted-foreground border-fd-border bg-fd-secondary cursor-pointer",
          className
        )}
      >
        <span className="inline-flex items-center justify-center rounded-full p-1.5 transition-all text-fd-muted-foreground">
          <Sun className="size-4" />
        </span>
        <span className="inline-flex items-center justify-center rounded-full p-1.5 transition-all text-fd-muted-foreground">
          <Moon className="size-4" />
        </span>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onClick={toggleTheme}
      className={cn(
        "inline-flex items-center rounded-full border p-0.5 text-fd-muted-foreground border-fd-border bg-fd-secondary cursor-pointer",
        className
      )}
    >
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-full p-1.5 transition-all",
          !isDark ? "bg-fd-background text-fd-foreground shadow-sm" : "text-fd-muted-foreground"
        )}
      >
        <Sun className="size-4" />
      </span>
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-full p-1.5 transition-all",
          isDark ? "bg-fd-background text-fd-foreground shadow-sm" : "text-fd-muted-foreground"
        )}
      >
        <Moon className="size-4" />
      </span>
      <span className="sr-only">Toggle theme</span>
    </div>
  );
};
