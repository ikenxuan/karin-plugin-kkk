"use client";
import { useRef, useMemo, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import imageFiles from "@/lib/ui-mockups-data.json";

interface MockupItem {
  id: string;
  baseName: string; // 基础名称（不含 -light/-dark 后缀）
  hasLight: boolean;
  hasDark: boolean;
}

export function UIMockupsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.05 });
  const [isMobile, setIsMobile] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 自动扫描并解析图片数据
  const mockups: MockupItem[] = useMemo(() => {
    // 解析图片，提取基础名称和主题变体
    const mockupMap = new Map<string, MockupItem>();

    imageFiles.forEach((filename) => {
      const match = filename.match(/^(.+?)-(light|dark|ligth)\.png$/);
      if (match) {
        const baseName = match[1];
        const theme = match[2] === "ligth" ? "light" : match[2]; // 修正拼写错误

        if (!mockupMap.has(baseName)) {
          mockupMap.set(baseName, {
            id: baseName,
            baseName,
            hasLight: false,
            hasDark: false,
          });
        }

        const item = mockupMap.get(baseName)!;
        if (theme === "light") {
          item.hasLight = true;
        } else if (theme === "dark") {
          item.hasDark = true;
        }
      }
    });

    return Array.from(mockupMap.values());
  }, []);

  // 根据当前主题获取图片路径（严格模式：只显示匹配主题的图片）
  const getImageSrc = (mockup: MockupItem): string | null => {
    const isDark = resolvedTheme === "dark";
    
    if (isDark) {
      // 深色模式：只返回 dark 图片
      if (mockup.hasDark) {
        return `/UI-example/${mockup.baseName}-dark.png`;
      }
      return null; // 没有 dark 版本就不显示
    } else {
      // 浅色模式：只返回 light 图片
      if (mockup.hasLight) {
        // 处理拼写错误的情况
        if (mockup.baseName === "douyin-pushlist") {
          return `/UI-example/${mockup.baseName}-ligth.png`;
        }
        return `/UI-example/${mockup.baseName}-light.png`;
      }
      return null; // 没有 light 版本就不显示
    }
  };

  // 根据当前主题过滤图片（不再过滤，显示所有图片）
  const filteredMockups = useMemo(() => {
    return mockups;
  }, [mockups]);

  // 瀑布流算法：将图片分配到列中，保持各列高度尽量平衡
  const columns = useMemo(() => {
    const columnCount = 5; // 5列布局
    const cols: MockupItem[][] = Array.from({ length: columnCount }, () => []);
    const colHeights: number[] = Array(columnCount).fill(0);

    filteredMockups.forEach((mockup) => {
      // 找到当前高度最小的列
      const minHeightIndex = colHeights.indexOf(Math.min(...colHeights));
      cols[minHeightIndex].push(mockup);
      // 简单估算高度增量（实际高度会由图片自动决定）
      colHeights[minHeightIndex] += 600; // 估算值
    });

    return cols;
  }, [filteredMockups]);

  const renderMockupCard = (mockup: MockupItem, columnIndex: number, itemIndex: number) => {
    const delay = (columnIndex * 0.05) + (itemIndex * 0.02);
    // SSR 时使用实际存在的图片作为默认值
    const defaultSrc = mockup.hasDark 
      ? `/UI-example/${mockup.baseName}-dark.png`
      : mockup.baseName === "douyin-pushlist"
        ? `/UI-example/${mockup.baseName}-ligth.png`
        : `/UI-example/${mockup.baseName}-light.png`;
    const imageSrc = mounted ? getImageSrc(mockup) : defaultSrc;

    // 如果当前主题没有对应的图片，不渲染
    if (!imageSrc) return null;

    return (
      <motion.div
        key={mockup.id}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{
          duration: 0.4,
          delay: Math.min(delay, 1), // 最大延迟 1s
          ease: [0.25, 0.4, 0.25, 1],
        }}
        className="mb-6 break-inside-avoid"
      >
        <div className="relative overflow-hidden rounded-xl shadow-lg border border-fd-border/30 backdrop-blur-sm hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
          <Image
            src={imageSrc}
            alt={mockup.id}
            width={360}
            height={800}
            className="w-full h-auto"
            loading="lazy"
            key={imageSrc} // 强制重新加载图片
            unoptimized // 禁用 Next.js 图片优化以避免缓存问题
          />
        </div>
      </motion.div>
    );
  };

  const renderMobileCarouselCard = (mockup: MockupItem) => {
    // SSR 时使用实际存在的图片作为默认值
    const defaultSrc = mockup.hasDark 
      ? `/UI-example/${mockup.baseName}-dark.png`
      : mockup.baseName === "douyin-pushlist"
        ? `/UI-example/${mockup.baseName}-ligth.png`
        : `/UI-example/${mockup.baseName}-light.png`;
    const imageSrc = mounted ? getImageSrc(mockup) : defaultSrc;

    // 如果当前主题没有对应的图片，不渲染
    if (!imageSrc) return null;

    return (
      <div
        key={mockup.id}
        className="shrink-0 px-4"
      >
        <div className="relative overflow-hidden rounded-xl shadow-lg border border-fd-border/30 backdrop-blur-sm transition-all duration-300 w-[280px]">
          <Image
            src={imageSrc}
            alt={mockup.id}
            width={280}
            height={600}
            className="w-full h-auto"
            loading="lazy"
            key={imageSrc} // 强制重新加载图片
            unoptimized // 禁用 Next.js 图片优化以避免缓存问题
          />
        </div>
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 w-full overflow-hidden"
    >
      {/* 标题区域 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="mb-16 px-4 text-center"
      >
        <h2 className="mb-4 text-4xl font-bold md:text-5xl text-fd-foreground">
          精雕细琢
        </h2>
        <p className="max-w-2xl mx-auto text-base md:text-lg text-fd-muted-foreground">
          精心设计了 30+ 款卡片组件，涵盖视频详情、动态推送、评论互动、用户信息等多种使用场景。
          每个组件都经过反复打磨，提供深色与浅色双主题适配，确保在不同环境下都能呈现出色的视觉效果。
          从布局到配色，从图标到文字，每一处细节都追求极致的用户体验。
        </p>
        <p className="mt-4 text-sm md:text-base text-fd-muted-foreground/80">
          以下是部分 UI 样式展示，更多样式请在插件内慢慢探索
        </p>
      </motion.div>

      {/* 瀑布流布局（PC）或横向滚动画册（移动端） */}
      {isMobile ? (
        <div className="relative w-full overflow-hidden">
          {/* 移动端横向滚动画册 */}
          <div 
            className="flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            <div className="flex gap-0 pl-[calc(50vw-140px)]">
              {mockups.map((mockup) => (
                <div
                  key={mockup.id}
                  className="snap-center"
                >
                  {renderMobileCarouselCard(mockup)}
                </div>
              ))}
              <div className="shrink-0 w-[calc(50vw-140px)]" />
            </div>
          </div>

          {/* 左右边缘渐隐遮罩 */}
          <div 
            className="absolute inset-y-0 left-0 w-20 pointer-events-none bg-linear-to-r from-fd-background to-transparent"
          />
          <div 
            className="absolute inset-y-0 right-0 w-20 pointer-events-none bg-linear-to-l from-fd-background to-transparent"
          />

          {/* 移动端提示文字 */}
          <div className="mt-8 text-center">
            <p className="text-xs text-fd-muted-foreground">
              ← 左右滑动查看更多 →
            </p>
          </div>
        </div>
      ) : (
        <div className="relative w-full px-6">
          <div 
            className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
            style={{
              transform: "rotate(-2deg)",
            }}
          >
            {columns.map((column, columnIndex) => (
              <div key={`column-${columnIndex}`} className="flex flex-col">
                {column.map((mockup, itemIndex) => 
                  renderMockupCard(mockup, columnIndex, itemIndex)
                )}
              </div>
            ))}
          </div>

          {/* 背景装饰光晕 */}
          <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-fd-primary/8 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-fd-accent/8 rounded-full blur-3xl" />
          </div>
        </div>
      )}

      {/* 底部说明文字 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-20 px-4 text-center"
      >
        <p className="text-sm text-fd-muted-foreground">
          支持多平台内容解析 · 实时动态推送 · 30+ 精美卡片组件
        </p>
      </motion.div>
    </section>
  );
}
