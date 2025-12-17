"use client";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { encode } from "qss";
import React from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/cn";

type LinkPreviewProps = {
  children: React.ReactNode;
  url: string;
  className?: string;
  width?: number;
  height?: number;
  quality?: number;
  layout?: string;
} & ({ isStatic: true; imageSrc: string } | { isStatic?: false; imageSrc?: never });

const isExternalUrl = (url: string) => url.startsWith("http://") || url.startsWith("https://");

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
  const [fullUrl, setFullUrl] = React.useState(url);
  const isExternal = isExternalUrl(url);

  React.useEffect(() => {
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

  // 获取实际要显示的文本内容
  const getTextContent = (node: React.ReactNode): string => {
    if (typeof node === "string") return node;
    if (typeof node === "number") return String(node);
    if (React.isValidElement(node)) {
      const props = node.props as { children?: React.ReactNode };
      return getTextContent(props.children);
    }
    if (Array.isArray(node)) {
      return node.map(getTextContent).join("");
    }
    return "";
  };

  const textContent = getTextContent(children) || url;

  if (!isMounted) {
    return (
      <a href={url} className={cn("text-black dark:text-white", className)}>
        {textContent}
      </a>
    );
  }

  return (
    <>
      <span className="hidden">
        <img src={src} width={width} height={height} alt="hidden image" />
      </span>
      <HoverCardPrimitive.Root openDelay={50} closeDelay={100} onOpenChange={(open) => setOpen(open)}>
        <HoverCardPrimitive.Trigger asChild onMouseMove={handleMouseMove}>
          <a href={url} className={cn("text-black dark:text-white cursor-pointer", className)} {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
            {textContent}
          </a>
        </HoverCardPrimitive.Trigger>
        <HoverCardPrimitive.Portal>
          <HoverCardPrimitive.Content className="origin-(--radix-hover-card-content-transform-origin) z-50" side="top" align="center" sideOffset={10}>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.6 }}
                  animate={{ opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 260, damping: 20 } }}
                  exit={{ opacity: 0, y: 20, scale: 0.6 }}
                  className="shadow-xl rounded-xl"
                  style={{ x: translateX }}
                >
                  <a href={url} className="block p-1 bg-white dark:text-black border-2 border-transparent shadow rounded-xl hover:border-neutral-200 dark:hover:border-neutral-800" style={{ fontSize: 0 }} {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                    <img src={isStatic ? imageSrc : src} width={width} height={height} className="rounded-lg" alt="preview image" />
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </HoverCardPrimitive.Content>
        </HoverCardPrimitive.Portal>
      </HoverCardPrimitive.Root>
    </>
  );
};
