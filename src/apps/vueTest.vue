<template>
  <div class="gradient-bg min-h-screen p-8">
    <div class="max-w-4xl mx-auto">
      <!-- 主容器 -->
      <div class="dark-glass rounded-3xl p-8 shadow-2xl">

        <!-- 头部信息区域 -->
        <div class="mb-8">
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center space-x-3">
              <div
                class="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <User class="text-white w-6 h-6" />
              </div>
              <div>
                <p class="text-white font-medium text-lg">{{ authorInfo.name }}</p>
                <p class="text-gray-300 text-sm">{{ authorInfo.role }}</p>
              </div>
            </div>
            <div class="flex items-center space-x-2 text-gray-300">
              <Clock class="w-4 h-4" />
              <span class="text-sm">{{ publishTime }}</span>
            </div>
          </div>

          <!-- 标题 -->
          <div class="glass-effect rounded-2xl p-6 mb-6">
            <div class="flex items-start space-x-3">
              <Bookmark class="text-yellow-400 w-6 h-6 mt-1" />
              <div>
                <h1 class="text-white text-2xl font-bold mb-2">{{ contentInfo.title }}</h1>
                <div class="flex items-center space-x-4 text-gray-300 text-sm">
                  <span class="flex items-center space-x-1">
                    <Tag class="w-4 h-4" />
                    <span>{{ contentInfo.category }}</span>
                  </span>
                  <span class="flex items-center space-x-1">
                    <Flame class="w-4 h-4" />
                    <span>{{ contentInfo.status }}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 内容区域 -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">

          <!-- 左侧：主要内容图片 -->
          <div class="lg:col-span-2">
            <div class="content-image rounded-2xl h-80 lg:h-96 shadow-xl relative overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div class="absolute bottom-4 left-4 right-4">
                <div class="glass-effect rounded-xl p-4">
                  <p class="text-white text-sm font-medium">{{ contentInfo.imageCaption }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 右侧：数据统计 -->
          <div class="space-y-4">
            <div class="stat-card rounded-2xl p-6 shadow-lg">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-gray-800 font-semibold flex items-center space-x-2">
                  <TrendingUp class="text-blue-500 w-5 h-5" />
                  <span>数据统计</span>
                </h3>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div v-for="stat in mainStats" :key="stat.key" class="text-center p-3 rounded-xl" :class="stat.bgClass">
                  <component :is="stat.icon" :class="stat.iconClass" class="w-8 h-8 mb-2 mx-auto" />
                  <p class="text-2xl font-bold text-gray-800">{{ stat.value }}</p>
                  <p class="text-gray-600 text-sm">{{ stat.label }}</p>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4 mt-4">
                <div v-for="stat in secondaryStats" :key="stat.key" class="text-center p-3 rounded-xl"
                  :class="stat.bgClass">
                  <component :is="stat.icon" :class="stat.iconClass" class="w-8 h-8 mb-2 mx-auto" />
                  <p class="text-xl font-bold text-gray-800">{{ stat.value }}</p>
                  <p class="text-gray-600 text-sm">{{ stat.label }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 简介区域 -->
        <div class="glass-effect rounded-2xl p-8 shadow-xl">
          <div class="flex items-center space-x-3 mb-6">
            <div
              class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <AlignLeft class="text-white w-5 h-5" />
            </div>
            <h2 class="text-white text-2xl font-bold">内容简介</h2>
          </div>

          <div class="bg-white/10 rounded-xl p-6 min-h-[200px]">
            <p class="text-gray-200 leading-relaxed text-lg mb-4">
              {{ description.main }}
            </p>
            <p class="text-gray-300 leading-relaxed">
              {{ description.detail }}
            </p>

            <!-- 标签区域 -->
            <div class="flex flex-wrap gap-2 mt-6">
              <span v-for="tag in tags" :key="tag.name"
                class="px-3 py-1 rounded-full text-sm flex items-center space-x-1" :class="tag.class">
                <component :is="tag.icon" class="w-3 h-3" />
                <span>{{ tag.name }}</span>
              </span>
            </div>
          </div>
        </div>

        <!-- 底部装饰 -->
        <div class="mt-8 flex justify-center">
          <div class="flex space-x-4 text-gray-400">
            <div class="w-2 h-2 bg-current rounded-full"></div>
            <div class="w-2 h-2 bg-current rounded-full"></div>
            <div class="w-2 h-2 bg-current rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
// 使用CDN方式引入lucide-vue-next
const { User, Clock, Bookmark, Tag, Flame, TrendingUp, AlignLeft } = window['lucide-vue-next']
// 使用CDN方式引入Vue
const { onMounted } = Vue

onMounted(() => {
  // 检查是否在客户端环境
  if (typeof window !== 'undefined') {
    // 加载 CSS
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://cdn.jsdelivr.net/npm/tailwindcss@4.1.7/index.min.css'
    link.type = 'text/css'
    document.head.appendChild(link)

    // 加载 JS
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/tailwindcss@4.1.7/dist/lib.min.js'
    script.async = true
    script.charset = 'utf-8'
    script.onload = () => {
      console.log('External script loaded successfully')
    }
    script.onerror = () => {
      console.error('Failed to load external script')
    }
    document.head.appendChild(script)
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

.glass-effect {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.dark-glass {
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.stat-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.content-image {
  background-image: url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-PVIKSffzz3OaeDjuFCc8l5octjkzsK.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>