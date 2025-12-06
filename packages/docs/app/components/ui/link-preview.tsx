"use client";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

import { encode } from "qss";
import React from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";

import { cn } from "@/lib/cn";

type LinkPreviewProps = {
  children: React.ReactNode;
  url: string;
  className?: string;
  width?: number;
  height?: number;
  quality?: number;
  layout?: string;
} & (
  | { isStatic: true; imageSrc: string }
  | { isStatic?: false; imageSrc?: never }
);

// 判断是否为外部链接
const isExternalUrl = (url: string) => {
  return url.startsWith("http://") || url.startsWith("https://");
};

export const LinkPreview = ({
  children,
  url,
  className,
  width = 200,
  height = 125,
  quality = 50,
  layout = "fixed",
  isStatic = false,
  imageSrc = "",
}: LinkPreviewProps) => {
  // 本地路径需要转换为完整 URL 才能获取截图
  const [fullUrl, setFullUrl] = React.useState(url);
  const isExternal = isExternalUrl(url);

  React.useEffect(() => {
    // 客户端获取完整 URL
    if (!isExternal && typeof window !== "undefined") {
      setFullUrl(`${window.location.origin}${url.startsWith("/") ? url : `/${url}`}`);
    }
  }, [url, isExternal]);

  let src;
  if (!isStatic) {
    const params = encode({
      url: fullUrl,
      screenshot: true,
      meta: false,
      embed: "screenshot.url",
      colorScheme: "dark",
      "viewport.isMobile": true,
      "viewport.deviceScaleFactor": 1,
      "viewport.width": width * 3,
      "viewport.height": height * 3,
    });
    src = `https://api.microlink.io/?${params}`;
  } else {
    src = imageSrc;
  }

  const [isOpen, setOpen] = React.useState(false);

  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const springConfig = { stiffness: 100, damping: 15 };
  const x = useMotionValue(0);
  const translateX = useSpring(x, springConfig);

  const handleMouseMove = (event: React.MouseEvent) => {
    const targetRect = event.currentTarget.getBoundingClientRect();
    const eventOffsetX = event.clientX - targetRect.left;
    const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2;
    x.set(offsetFromCenter);
  };

  // 服务端渲染时返回简单链接
  if (!isMounted) {
    return (
      <a href={url} className={cn("text-black dark:text-white", className)}>
        {children}
      </a>
    );
  }

  return (
    <>
      <div className="hidden">
        <img src={src} width={width} height={height} alt="hidden image" />
      </div>

      <HoverCardPrimitive.Root
        openDelay={50}
        closeDelay={100}
        onOpenChange={(open) => {
          setOpen(open);
        }}
      >
        <HoverCardPrimitive.Trigger
          onMouseMove={handleMouseMove}
          className={cn("text-black dark:text-white", className)}
          href={url}
        >
          {children}
        </HoverCardPrimitive.Trigger>

        <HoverCardPrimitive.Content
          className="origin-(--radix-hover-card-content-transform-origin)"
          side="top"
          align="center"
          sideOffset={10}
        >
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                className="shadow-xl rounded-xl"
                style={{
                  x: translateX,
                }}
              >
                <a
                  href={url}
                  className="block p-1 bg-white border-2 border-transparent shadow rounded-xl hover:border-neutral-200 dark:hover:border-neutral-800"
                  style={{ fontSize: 0 }}
                >
                  <img
                    src={isStatic ? imageSrc : src}
                    width={width}
                    height={height}
                    className="rounded-lg"
                    alt="preview image"
                  />
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Root>
    </>
  );
};
