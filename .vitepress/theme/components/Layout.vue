<!-- .vitepress/theme/Layout.vue -->
<!-- https://vitepress.dev/guide/extending-default-theme#using-view-transitions-api -->

<script setup lang="ts">
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { nextTick, provide } from 'vue'

// 页面分享按钮、首页公告栏、页脚
import { ShareButton, Announcement, HomeFooter } from '@theojs/lumen'
import { Footer_Data } from '../../data/fooertData.ts'
// 顶级的阅读增强，页面右上角小书本
import {
  NolebaseEnhancedReadabilitiesMenu,

} from '@nolebase/vitepress-plugin-enhanced-readabilities/client'
// 闪烁高亮当前目标标题
import {
  NolebaseHighlightTargetedHeading,
} from '@nolebase/vitepress-plugin-highlight-targeted-heading/client'

const { isDark } = useData()

const enableTransitions = () =>
  'startViewTransition' in document &&
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches

provide('toggle-appearance', async ({ clientX: x, clientY: y }: MouseEvent) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value
    return
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )}px at ${x}px ${y}px)`
  ]

  await document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  }).ready

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: 'ease-in',
      pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`
    }
  )
})
</script>

<template>
  <DefaultTheme.Layout>
    <!-- 顶级的阅读增强，页面右上角小书本 -->
    <template #nav-bar-content-after>
      <NolebaseEnhancedReadabilitiesMenu />
    </template>
    <template #nav-screen-content-after>
      <NolebaseEnhancedReadabilitiesScreenMenu />
    </template>
    <!-- 页面分享按钮 -->
    <template #aside-outline-before>
      <ShareButton />
    </template>
    <!-- 闪烁高亮当前目标标题 -->
    <template #layout-top>
      <NolebaseHighlightTargetedHeading />
    </template>
    <template #home-hero-info-before>
      <Announcement />
    </template>
    <!-- 页脚 -->
    <template #layout-bottom>
      <HomeFooter :Footer_Data="Footer_Data" />
    </template>

  </DefaultTheme.Layout>
</template>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 9999;
}

.VPSwitchAppearance {
  width: 22px !important;
}

.VPSwitchAppearance .check {
  transform: none !important;
}
</style>