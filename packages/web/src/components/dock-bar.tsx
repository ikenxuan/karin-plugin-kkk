import { Database, User, Wand2 } from 'lucide-react'
import { useLayoutEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

/**  Dock 栏组件 */
export function DockBar () {
  const ref = useRef<HTMLElement>(null)
  const navigate = useNavigate()
  const location = useLocation()

  // 预留底部空间，防止遮挡底部内容
  useLayoutEffect(() => {
    const updatePadding = () => {
      const el = ref.current
      if (!el) return
      const reserve = Math.ceil(el.offsetHeight + 16)
      document.body.style.paddingBottom = `${reserve}px`
      document.documentElement.style.setProperty('--dock-height', `${el.offsetHeight}px`)
    }
    updatePadding()
    window.addEventListener('resize', updatePadding)
    return () => {
      window.removeEventListener('resize', updatePadding)
      document.body.style.paddingBottom = ''
      document.documentElement.style.removeProperty('--dock-height')
    }
  }, [])

  const dockItems = [
    { id: 'crack', label: '解析', icon: Wand2, path: '/crack' },
    { id: 'database', label: '数据', icon: Database, path: '/database' },
    { id: 'about', label: '关于', icon: User, path: '/about' }
  ] as const

  return (
    <TooltipProvider delayDuration={150}>
      <nav
        ref={ref as any}
        aria-label='Dock'
        className='fixed left-1/2 -translate-x-1/2 z-50'
        style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 16px)' }}
      >
        <div
          className={cn(
            'relative flex items-center gap-2 px-3 py-2 rounded-full',
            'backdrop-blur-xl',
            'bg-background/80 border border-border/50',
            'shadow-lg shadow-black/5'
          )}
        >
          {dockItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path

            return (
              <Tooltip key={item.id}>
                <TooltipTrigger asChild>
                  <button
                    type='button'
                    onClick={() => navigate(item.path)}
                    aria-current={isActive ? 'page' : undefined}
                    aria-label={item.label}
                    className={cn(
                      'relative grid size-12 place-items-center rounded-full select-none outline-none',
                      'transition-all duration-200 ease-in-out',
                      'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                      'hover:scale-105 active:scale-95',
                      !isActive && [
                        'bg-card text-card-foreground border border-border/50',
                        'hover:bg-accent hover:text-accent-foreground',
                        'shadow-sm'
                      ],
                      isActive && [
                        'bg-primary text-primary-foreground',
                        'shadow-md shadow-primary/25',
                        'border border-primary/20'
                      ]
                    )}
                  >
                    <Icon className={cn('h-5 w-5 transition-transform duration-200', isActive ? 'scale-110' : 'scale-100')} />
                  </button>
                </TooltipTrigger>

                {/* Tooltip 固定在按钮上方；Dock 在屏幕底部也不会飞出屏幕 */}
                <TooltipContent
                  side='top'
                  align='center'
                  sideOffset={8}
                  collisionPadding={12}
                  className='px-2 py-1 text-xs font-medium'
                >
                  {item.label}
                </TooltipContent>
              </Tooltip>
            )
          })}
        </div>
      </nav>
    </TooltipProvider>
  )
}
