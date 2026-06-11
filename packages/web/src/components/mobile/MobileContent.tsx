/**
 * 移动端主内容区组件
 */

import ConfigPanel from '../common/ConfigPanel'
import AboutPanel from '../common/AboutPanel'
import type { MainMenuKey } from '../../types/navigation'

interface MobileContentProps {
  activeMenu: MainMenuKey
}

/**
 * 移动端主内容区 - 根据当前菜单显示对应内容
 */
const MobileContent = ({ activeMenu }: MobileContentProps) => {
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
        return <ConfigPanel />
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {renderContent()}
    </div>
  )
}

export default MobileContent
