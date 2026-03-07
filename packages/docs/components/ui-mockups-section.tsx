"use client";
import { useRef, useMemo, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";
import Image from "next/image";

interface MockupItem {
  id: string;
  src: string; // 图片路径
}

export function UIMockupsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.05 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 真实的截图数据
  const mockups: MockupItem[] = useMemo(() => {
    return [
      { id: "bilibili-av", src: "/UI-example/bilibili-push-AV-dark.png" },
      { id: "bilibili-draw", src: "/UI-example/bilibili-push-DRAW-dark.png" },
      { id: "douyin-comments", src: "/UI-example/douyin-comments-light.png" },
      { id: "douyin-favorite", src: "/UI-example/douyin-push-favorite-dark.png" },
      { id: "douyin-recommend", src: "/UI-example/douyin-push-recommend-dark.png" },
      { id: "douyin-video", src: "/UI-example/douyin-push-video-light.png" },
      { id: "douyin-pushlist", src: "/UI-example/douyin-pushlist-ligth.png" },
      { id: "douyin-videoinfo", src: "/UI-example/douyin-videoinfo-dark.png" },
      { id: "other-errorlog", src: "/UI-example/other-errorlog-dark.png" },
      { id: "other-help", src: "/UI-example/other-help-light.png" },
    ];
  }, []);

  // 瀑布流算法：将图片分配到列中，保持各列高度尽量平衡
  const columns = useMemo(() => {
    const columnCount = 5; // 5列布局
    const cols: MockupItem[][] = Array.from({ length: columnCount }, () => []);
    const colHeights: number[] = Array(columnCount).fill(0);

    mockups.forEach((mockup) => {
      // 找到当前高度最小的列
      const minHeightIndex = colHeights.indexOf(Math.min(...colHeights));
      cols[minHeightIndex].push(mockup);
      // 简单估算高度增量（实际高度会由图片自动决定）
      colHeights[minHeightIndex] += 600; // 估算值
    });

    return cols;
  }, [mockups]);

  const renderMockupCard = (mockup: MockupItem, columnIndex: number, itemIndex: number) => {
    const delay = (columnIndex * 0.05) + (itemIndex * 0.02);

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
            src={mockup.src}
            alt={mockup.id}
            width={360}
            height={800}
            className="w-full h-auto"
            loading="lazy"
          />
        </div>
      </motion.div>
    );
  };

  const renderMobileCarouselCard = (mockup: MockupItem, index: number) => {
    return (
      <div
        key={mockup.id}
        className="shrink-0 px-4"
      >
        <div className="relative overflow-hidden rounded-xl shadow-lg border border-fd-border/30 backdrop-blur-sm transition-all duration-300 w-[280px]">
          <Image
            src={mockup.src}
            alt={mockup.id}
            width={280}
            height={600}
            className="w-full h-auto"
            loading="lazy"
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
          精美的界面设计
        </h2>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-fd-muted-foreground">
          设计了 30+ 卡片组件，对应不同类型的作品、动态详情，每一个细节都经过精心打磨
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
              {mockups.map((mockup, index) => (
                <div
                  key={mockup.id}
                  className="snap-center"
                >
                  {renderMobileCarouselCard(mockup, index)}
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
