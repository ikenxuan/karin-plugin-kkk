"use client";
import { useRef, useEffect, useState, useId, useCallback } from "react";
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
  const [maskPosition, setMaskPosition] = useState({ cx: "-50%", cy: "-50%" });

  const uniqueId = useId();
  const gradientId = `textGradient-${uniqueId}`;
  const maskId = `revealMask-${uniqueId}`;
  const textMaskId = `textMask-${uniqueId}`;

  const fontSize = 100;
  const textWidth = text.length * fontSize * 0.72;
  const viewBoxWidth = textWidth + 4;
  const viewBoxHeight = fontSize * 1.1;
  const strokeWidth = 0.1;

  const updateMaskPosition = useCallback((clientX: number, clientY: number) => {
    if (svgRef.current) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((clientX - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((clientY - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      updateMaskPosition(e.clientX, e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [updateMaskPosition]);

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    updateMaskPosition(touch.clientX, touch.clientY);
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
        <linearGradient id={gradientId} gradientUnits="userSpaceOnUse" x1="0%" y1="0%" x2="100%" y2="0%">
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
          <rect x="0" y="0" width="100%" height="100%" fill={`url(#${maskId})`} />
        </mask>
      </defs>
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
        transition={{ duration: 2.5, ease: "easeInOut" }}
      >
        {text}
      </motion.text>
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
    </svg>
  );
};
