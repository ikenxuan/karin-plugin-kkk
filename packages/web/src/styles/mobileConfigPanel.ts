import type { ConfigPanelLayoutClasses } from './desktopConfigPanel'

/**
 * 手机端配置面板布局类。
 * 只放布局、间距和尺寸，不覆盖 HeroUI 组件视觉。
 */
export const mobileConfigPanelClasses: ConfigPanelLayoutClasses = {
  root: 'relative flex min-w-0 max-w-full flex-col gap-5',
  loading: 'flex min-h-80 items-center justify-center gap-3',
  header: 'flex flex-col gap-3 pt-12',
  headerCopy: 'flex min-w-0 flex-col gap-2',
  form: 'flex min-w-0 max-w-full flex-col gap-3',
  floatingActions: 'sticky top-0 z-20 flex h-0 w-full justify-end overflow-visible',
  actionControls:
    'flex w-fit h-11 p-1 items-center gap-2 rounded-full border border-default-200 bg-background/90 shadow-sm backdrop-blur-md',
  sectionHeader: 'p-1',
  sectionContent: 'p-0',
  fields: 'grid grid-cols-1 gap-5',
  field: 'flex min-w-0 flex-col gap-2',
  choiceGrid: 'grid grid-cols-1 gap-3',
  divider: 'col-span-full flex min-w-0 flex-col gap-2 pt-3',
  tabsListContainer:
    'w-full min-w-0 max-w-full overflow-x-auto overflow-y-hidden overscroll-x-contain overscroll-y-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
  tabsList: 'w-fit min-w-max *:w-fit *:min-w-fit *:flex-none *:shrink-0 *:whitespace-nowrap',
  topLevelFields: 'mb-4 space-y-4 px-4'
}
