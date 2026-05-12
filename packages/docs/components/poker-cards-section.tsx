"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { CARDS_DATA } from "@/lib/cards-data";

gsap.registerPlugin(ScrollTrigger);

// 翻转展开时的倾斜角度
const cardFlipTiltAngles = [-10, -20, -5, 0, 5, 10, -10, 8];
// 飞出时的倾斜角度
const cardDismissTiltAngles = [-50, -60, -45, 30, 45, -30, 50, -50];

export function PokerCardsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const frontRefs = useRef<(HTMLDivElement | null)[]>([]);
  const backRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    const fronts = frontRefs.current.filter(Boolean) as HTMLDivElement[];
    const backs = backRefs.current.filter(Boolean) as HTMLDivElement[];
    const cta = ctaRef.current;

    if (!section || cards.length === 0) return;

    // 初始化 Lenis 平滑滚动
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const stickyCardCount = cards.length;

    // === 动画阶段常量（单位：svh） ===
    const CARDS_ENTER_END = 50;
    const CARD_FLIP_TRIGGER = 100;
    const CARD_DISMISS_START = 150;
    const CARD_DISMISS_DURATION = 100;
    const TOTAL_SCROLL_SVH =
      CARD_DISMISS_START + stickyCardCount * CARD_DISMISS_DURATION;

    const svhToProgress = (svh: number) => svh / TOTAL_SCROLL_SVH;
    const totalScroll = window.innerHeight * (TOTAL_SCROLL_SVH / 100);

    // 计算每张卡片的飞出时间段（01 先飞，08 最后飞）
    const cardDismissRanges = Array.from(
      { length: stickyCardCount },
      (_, i) => {
        const dismissOrder = i; // 01(i=0) 先飞，08(i=7) 最后飞
        return [
          svhToProgress(
            CARD_DISMISS_START + dismissOrder * CARD_DISMISS_DURATION
          ),
          svhToProgress(
            CARD_DISMISS_START + (dismissOrder + 1) * CARD_DISMISS_DURATION
          ),
        ];
      }
    );

    // CTA 进场：最后一张卡片开始飞出时从底部进入
    const CTA_ENTER_START =
      CARD_DISMISS_START + (stickyCardCount - 1) * CARD_DISMISS_DURATION;
    const CTA_ENTER_END = CTA_ENTER_START + CARD_DISMISS_DURATION;

    let isFlipped = false;

    const ctx = gsap.context(() => {
      // 初始状态：外层居中偏下，正面朝前，背面朝后
      gsap.set(cards, { xPercent: -50, yPercent: 50 });
      gsap.set(fronts, { rotationY: 0 });
      gsap.set(backs, { rotationY: -180 });

      // CTA 初始在屏幕下方
      if (cta) {
        gsap.set(cta, { y: "100vh", opacity: 0 });
      }

      // === 自动翻转函数（非滚动驱动） ===
      const revealBackCards = () => {
        gsap.to(fronts, {
          rotationY: 180,
          duration: 1,
          ease: "elastic.out(1,0.5)",
        });
        backs.forEach((back, i) => {
          const tl = gsap.timeline();
          tl.to(
            back,
            {
              rotationY: 0,
              duration: 1,
              ease: "elastic.out(1,0.5)",
            },
            0
          ).to(
            back,
            {
              rotationZ: cardFlipTiltAngles[i] || 0,
              duration: 2,
              ease: "elastic.out(1,1.5)",
            },
            0
          );
        });
      };

      const concealBackCards = () => {
        gsap.to(fronts, {
          rotationY: 0,
          duration: 1,
          ease: "elastic.out(1,0.5)",
        });
        backs.forEach((back) => {
          const tl = gsap.timeline();
          tl.to(
            back,
            {
              rotationZ: 0,
              duration: 2,
              ease: "elastic.out(1,1.5)",
            },
            0
          ).to(
            back,
            {
              rotationY: -180,
              duration: 1,
              ease: "elastic.out(1,0.5)",
            },
            0
          );
        });
      };

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: `+=${totalScroll}px`,
        pin: true,
        pinSpacing: true,
        scrub: true,
        onUpdate: ({ progress }) => {
          // === 阶段 1：所有卡片整体从下方进入 ===
          const enterProgress = gsap.utils.clamp(
            0,
            1,
            gsap.utils.mapRange(
              0,
              svhToProgress(CARDS_ENTER_END),
              0,
              1,
              progress
            )
          );

          const baseY = gsap.utils.mapRange(0, 1, 50, -50, enterProgress);

          // 外层整体位置（所有卡片一起移动，无旋转）
          cards.forEach((card) => {
            gsap.set(card, { yPercent: baseY });
          });

          // === 阶段 2：自动翻转（由进度阈值触发，非滚动驱动动画） ===
          if (progress > svhToProgress(CARD_FLIP_TRIGGER) && !isFlipped) {
            revealBackCards();
            isFlipped = true;
          } else if (
            progress <= svhToProgress(CARD_FLIP_TRIGGER) &&
            isFlipped
          ) {
            concealBackCards();
            isFlipped = false;
          }

          // === 阶段 3：卡片依次飞出（scroll-driven，背面单独控制 y + rotation） ===
          backs.forEach((back, i) => {
            const [dismissStart, dismissEnd] = cardDismissRanges[i];
            const dismissProgress = gsap.utils.clamp(
              0,
              1,
              gsap.utils.mapRange(dismissStart, dismissEnd, 0, 1, progress)
            );

            const backY = gsap.utils.mapRange(
              0,
              1,
              0,
              -250,
              dismissProgress
            );

            if (dismissProgress > 0) {
              const backRotation = gsap.utils.mapRange(
                0,
                1,
                cardFlipTiltAngles[i] || 0,
                cardDismissTiltAngles[i] || 0,
                dismissProgress
              );

              gsap.set(back, {
                yPercent: backY,
                rotation: backRotation,
              });
            } else {
              gsap.set(back, {
                yPercent: backY,
              });
            }
          });

          // === 阶段 4：CTA 从底部跟随滚动进入中央后固定 ===
          if (cta) {
            const ctaProgress = gsap.utils.clamp(
              0,
              1,
              gsap.utils.mapRange(
                svhToProgress(CTA_ENTER_START),
                svhToProgress(CTA_ENTER_END),
                0,
                1,
                progress
              )
            );

            if (ctaProgress >= 1) {
              gsap.set(cta, { y: 0, opacity: 1 });
            } else {
              gsap.set(cta, {
                y: `${gsap.utils.mapRange(0, 1, 100, 0, ctaProgress)}vh`,
                opacity: gsap.utils.mapRange(0, 0.3, 0, 1, ctaProgress),
              });
            }
          }
        },
        onLeave: () => {
          cards.forEach((card) => {
            gsap.set(card, { visibility: "hidden" });
          });
        },
        onEnterBack: () => {
          cards.forEach((card) => {
            gsap.set(card, { visibility: "visible" });
          });
        },
      });
    }, section);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: "100vh" }}
    >
      {/* 卡片容器 */}
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{ perspective: 1000 }}
      >
        {CARDS_DATA.map((card, i) => (
          <div
            key={card.id}
            ref={(el) => {
              cardsRef.current[i] = el;
            }}
            className="absolute select-none"
            style={{
              top: "50%",
              left: "50%",
              width: "clamp(300px, 25%, 400px)",
              aspectRatio: "4/5",
              transformStyle: "preserve-3d",
              willChange: "transform",
              zIndex: CARDS_DATA.length - i,
            }}
          >
            {/* 正面：整齐堆叠时可见，四角装饰 + 中心引导 */}
            <div
              ref={(el) => {
                frontRefs.current[i] = el;
              }}
              className="absolute inset-0 flex flex-col justify-between p-6 rounded-2xl"
              style={{
                background: card.frontBgColor,
                color: card.frontTextColor,
                backfaceVisibility: "hidden",
              }}
            >
              {/* 四角装饰：小菱形 */}
              <div className="absolute top-5 left-5 w-2 h-2 rotate-45 bg-current opacity-30" />
              <div className="absolute top-5 right-5 w-2 h-2 rotate-45 bg-current opacity-30" />
              <div className="absolute bottom-5 left-5 w-2 h-2 rotate-45 bg-current opacity-30" />
              <div className="absolute bottom-5 right-5 w-2 h-2 rotate-45 bg-current opacity-30" />

              {/* 中心：引导用户继续滚动 */}
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div
                    className="font-bold leading-tight whitespace-pre-line"
                    style={{
                      fontSize: "clamp(22px, 2.2vw, 30px)",
                      fontFamily: "Georgia, serif",
                    }}
                  >
                    继续滚动
                    <br />
                    以开始
                  </div>
                </div>
              </div>
            </div>

            {/* 背面：翻转展开后可见，显示功能内容 */}
            <div
              ref={(el) => {
                backRefs.current[i] = el;
              }}
              className="absolute inset-0 flex flex-col justify-between p-6 rounded-2xl"
              style={{
                background: card.bgColor,
                color: card.textColor,
                backfaceVisibility: "hidden",
              }}
            >
              {/* 左上：中文标题 */}
              <div className="font-mono text-sm tracking-widest">
                {card.titleCN}
              </div>

              {/* 中心内容 */}
              <div className="flex-1 flex items-center justify-center">
                <div
                  className="text-center font-bold leading-tight whitespace-pre-line"
                  style={{
                    fontSize: "clamp(28px, 3vw, 40px)",
                    fontFamily: "Georgia, serif",
                  }}
                >
                  {card.center}
                </div>
              </div>

              {/* 右下：英文标题 */}
              <div className="font-mono text-sm tracking-wider text-right">
                {card.titleEN}
              </div>

              {/* 右上编号 */}
              <div className="absolute top-6 right-6 font-mono text-2xl font-bold">
                {card.num}
              </div>

              {/* 左下编号 */}
              <div className="absolute bottom-6 left-6 font-mono text-2xl font-bold">
                {card.num}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA 板块：最后一张卡片开始飞出时从底部进入，到达中央后固定 */}
      <div
        ref={ctaRef}
        className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
      >
        <div className="text-center space-y-6 pointer-events-auto">
          <h2 className="text-3xl font-bold text-fd-foreground">
            开始使用 karin-plugin-kkk
          </h2>
          <p className="text-lg text-fd-muted-foreground leading-relaxed max-w-xl mx-auto">
            基于 Karin 框架的短视频解析与动态推送插件，支持抖音、B站等多平台内容解析，
            提供精美的卡片渲染与实时动态推送功能。
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <a
              href="/docs"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-fd-primary text-fd-primary-foreground font-medium transition-opacity hover:opacity-90"
            >
              阅读文档
            </a>
            <a
              href="https://github.com/ikenxuan/karin-plugin-kkk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-fd-border text-fd-foreground font-medium transition-colors hover:bg-fd-accent"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
