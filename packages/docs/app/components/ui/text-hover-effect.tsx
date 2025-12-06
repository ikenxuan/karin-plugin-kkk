"use client";
import { useRef, useEffect, useState, useId } from "react";
import { motion } from "motion/react";

export const TextHoverEffect = ({
  text,
  duration,
}: {
  text: string;
  duration?: number;
  automatic?: boolean;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });
  const [animationComplete, setAnimationComplete] = useState(false);
  
  // 使用唯一 ID 避免多实例冲突
  const uniqueId = useId();
  const gradientId = `textGradient-${uniqueId}`;
  const maskId = `revealMask-${uniqueId}`;
  const textMaskId = `textMask-${uniqueId}`;

  // viewBox 尺寸 - 让文字撑满整个宽度
  const fontSize = 100;
  const textWidth = text.length * fontSize * 0.72;
  const viewBoxWidth = textWidth + 4;
  const viewBoxHeight = fontSize * 1.1;
  const strokeWidth = 0.1; // 更细的描边

  // 监听整个页面的鼠标移动，而不只是 SVG 内部
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursor({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // 计算 mask 位置
  useEffect(() => {
    if (svgRef.current) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  // 移动端触摸支持
  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setCursor({ x: touch.clientX, y: touch.clientY });
  };

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      xmlns="http://www.w3.org/2000/svg"
      onTouchMove={handleTouchMove}
      className="select-none w-full h-auto"
    >
      <defs>
        <linearGradient
          id={gradientId}
          gradientUnits="userSpaceOnUse"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#eab308" />
          <stop offset="25%" stopColor="#ef4444" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="75%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>

        <motion.radialGradient
          id={maskId}
          gradientUnits="userSpaceOnUse"
          r="30%"
          animate={maskPosition}
          transition={{ duration: duration ?? 0.15, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id={textMaskId}>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill={`url(#${maskId})`}
          />
        </mask>
      </defs>
      {/* 主描边文字 - 生长动画 */}
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth={strokeWidth}
        className="fill-transparent stroke-neutral-300 dark:stroke-neutral-700 font-[helvetica] font-bold"
        style={{ fontSize: `${fontSize}px` }}
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{ strokeDashoffset: 0, strokeDasharray: 1000 }}
        transition={{ duration: 4, ease: "easeInOut" }}
        onAnimationComplete={() => setAnimationComplete(true)}
      >
        {text}
      </motion.text>
      {/* 彩色渐变文字 - 动画完成后才显示，跟随鼠标 */}
      {animationComplete && (
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          mask={`url(#${textMaskId})`}
          className="fill-transparent font-[helvetica] font-bold"
          style={{ fontSize: `${fontSize}px` }}
        >
          {text}
        </text>
      )}
    </svg>
  );
};
