'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const animatedEls = new WeakSet<Element>();

function animateElement(el: Element) {
  if (animatedEls.has(el)) return;

  const htmlEl = el as HTMLElement;
  if (htmlEl.offsetHeight < 10) return;

  animatedEls.add(el);

  gsap.fromTo(
    el,
    {
      y: 30,
      opacity: 0,
      filter: 'blur(6px)',
    },
    {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top 95%',
        end: 'top 80%',
        scrub: 0.3,
      },
    },
  );
}

function initElements(container: HTMLElement) {
  const explicit = container.querySelectorAll('.docs-animate-entry');
  explicit.forEach(animateElement);

  const body = container.querySelector('.docs-animate-body');
  if (body) {
    body.querySelectorAll(':scope > *').forEach(animateElement);
  }
}

export function DocsPageAnimate({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReducedMotion) return;

    // 初始化已有元素
    initElements(containerRef.current);

    // 监听异步插入的新元素（如 Mermaid 图表）
    const observer = new MutationObserver(() => {
      if (containerRef.current) {
        initElements(containerRef.current);
        ScrollTrigger.refresh();
      }
    });

    const body = containerRef.current.querySelector('.docs-animate-body');
    if (body) {
      observer.observe(body, { childList: true });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="contents">
      {children}
    </div>
  );
}
