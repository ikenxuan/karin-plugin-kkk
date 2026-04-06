"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

interface MeteorsProps {
  number?: number;
  minDelay?: number;
  maxDelay?: number;
  minDuration?: number;
  maxDuration?: number;
  angle?: number;
  className?: string;
}

export const Meteors = ({
  number = 20,
  minDelay = 0.2,
  maxDelay = 1.2,
  minDuration = 2,
  maxDuration = 10,
  angle = 215,
  className,
}: MeteorsProps) => {
  const [meteorStyles, setMeteorStyles] = useState<Array<React.CSSProperties>>([]);

  useEffect(() => {
    const styles = [...new Array(number)].map(() => ({
      "--angle": -angle + "deg",
      top: "-5%",
      left: `calc(0% + ${Math.floor(Math.random() * window.innerWidth)}px)`,
      animationDelay: Math.random() * (maxDelay - minDelay) + minDelay + "s",
      animationDuration: Math.floor(Math.random() * (maxDuration - minDuration) + minDuration) + "s",
    }));
    setMeteorStyles(styles);
  }, [number, minDelay, maxDelay, minDuration, maxDuration, angle]);

  return (
    <>
      {[...meteorStyles].map((style, idx) => (
        <span
          key={idx}
          style={{ ...style }}
          className={cn(
            "animate-meteor pointer-events-none absolute size-0.5 rotate-(--angle) rounded-full bg-foreground/80 shadow-[0_0_0_1px_color-mix(in_oklab,var(--foreground)_20%,transparent)]",
            className
          )}
        >
          <div className="pointer-events-none absolute top-1/2 -z-10 h-px w-12.5 -translate-y-1/2 bg-linear-to-r from-foreground/70 to-transparent" />
        </span>
      ))}
    </>
  );
};
