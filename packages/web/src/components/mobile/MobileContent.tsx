/**
 * 移动端主内容区组件
 */

import gsap from 'gsap'
import { useEffect, useRef } from 'react'

import type { MainMenuKey } from '../../types/navigation'
import { getAnimationDuration } from '../../utils/animations'
import AboutPanel from '../common/AboutPanel'
import ConfigPanel from '../common/ConfigPanel'

interface MobileContentProps {
  activeMenu: MainMenuKey
}

/**
 * 移动端主内容区 - 根据当前菜单显示对应内容
 */
const MobileContent = ({ activeMenu }: MobileContentProps) => {
  const contentRef = useRef<HTMLDivElement>(null)

  /**
   * 菜单切换时的入场过渡：整层淡入衔接内容替换，位移交给面板自己的分段动画。
   */
  useEffect(() => {
    if (!contentRef.current) return

    gsap.fromTo(
      contentRef.current,
      { autoAlpha: 0 },
      {
        autoAlpha: 1,
        duration: getAnimationDuration(0.2),
        ease: 'power2.out',
        overwrite: 'auto'
      }
    )
  }, [activeMenu])

  /**
   * 渲染对应菜单的内容面板
   */
  const renderContent = () => {
    switch (activeMenu) {
      case 'config':
        return <ConfigPanel device="mobile" />
      case 'about':
        return <AboutPanel />
      default:
        return <ConfigPanel device="mobile" />
    }
  }

  return (
    <div ref={contentRef} className="w-full max-w-2xl mx-auto">
      {renderContent()}
    </div>
  )
}

export default MobileContent
