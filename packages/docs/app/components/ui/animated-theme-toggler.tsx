import { useCallback, useEffect, useRef, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { flushSync } from "react-dom"

import { cn } from "@/lib/cn"

interface AnimatedThemeTogglerProps
  extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number
}

export const AnimatedThemeToggler = ({
  className,
  duration = 400,
  ...props
}: AnimatedThemeTogglerProps) => {
  const [isDark, setIsDark] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"))
    }

    updateTheme()

    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => observer.disconnect()
  }, [])

  const toggleTheme = useCallback(async () => {
    if (!buttonRef.current) return

    const doc = document as Document & {
      startViewTransition?: (callback: () => void) => { ready: Promise<void> }
    }

    // 检查浏览器是否支持 View Transition API
    if (!doc.startViewTransition) {
      const newTheme = !isDark
      setIsDark(newTheme)
      document.documentElement.classList.toggle("dark")
      localStorage.setItem("theme", newTheme ? "dark" : "light")
      return
    }

    await doc.startViewTransition(() => {
      flushSync(() => {
        const newTheme = !isDark
        setIsDark(newTheme)
        document.documentElement.classList.toggle("dark")
        localStorage.setItem("theme", newTheme ? "dark" : "light")
      })
    }).ready

    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const maxRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top)
    )

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    )
  }, [isDark, duration])

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      className={cn(
        "inline-flex items-center rounded-full border p-0.5 text-fd-muted-foreground border-fd-border bg-fd-secondary",
        className
      )}
      {...props}
    >
      {/* 太阳图标 - 浅色模式激活 */}
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-full p-1.5 transition-all",
          !isDark 
            ? "bg-fd-background text-fd-foreground shadow-sm" 
            : "text-fd-muted-foreground"
        )}
      >
        <Sun className="size-4" />
      </span>
      {/* 月亮图标 - 深色模式激活 */}
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-full p-1.5 transition-all",
          isDark 
            ? "bg-fd-background text-fd-foreground shadow-sm" 
            : "text-fd-muted-foreground"
        )}
      >
        <Moon className="size-4" />
      </span>
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
