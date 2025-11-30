import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted || !containerRef.current) return

    const blobs = containerRef.current.querySelectorAll('.blob')

    blobs.forEach((blob, index) => {
      gsap.set(blob, {
        x: gsap.utils.random(-50, 50),
        y: gsap.utils.random(-50, 50),
      })

      gsap.to(blob, {
        x: gsap.utils.random(-100, 100),
        y: gsap.utils.random(-80, 80),
        scale: gsap.utils.random(0.8, 1.2),
        duration: gsap.utils.random(2, 3),
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: index * 0.3,
      })
    })

    return () => {
      blobs.forEach((blob) => gsap.killTweensOf(blob))
    }
  }, [isMounted])

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="blob absolute top-[5%] left-[15%] w-[500px] h-[500px] rounded-full bg-blue-500/15 blur-3xl" />
      <div className="blob absolute top-[30%] -right-[5%] w-[450px] h-[450px] rounded-full bg-purple-500/15 blur-3xl" />
      <div className="blob absolute -bottom-[5%] -left-[5%] w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="blob absolute bottom-[20%] right-[20%] w-[420px] h-[420px] rounded-full bg-pink-500/10 blur-3xl" />
    </div>
  )
}
