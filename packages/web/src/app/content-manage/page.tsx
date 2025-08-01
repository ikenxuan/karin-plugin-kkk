import { Check, ChevronsUpDown, Copy, ExternalLink, MessageSquare, Plus, Trash2, Users, Video } from 'lucide-react'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { toast } from 'sonner'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Sheet,
  SheetContent,
} from '@/components/ui/sheet'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useIsMobile } from '@/hooks/use-mobile'
import request from '@/lib/request'
import { cn } from '@/lib/utils'

/**
 * 内容项接口
 */
interface ContentItem {
  id: string
  platform: 'douyin' | 'bilibili'
  title: string
  author: string
  avatar: string
  publishTime: string
  thumbnail: string
  type: 'video' | 'note' | 'dynamic'
  isBlocked: boolean
  pushStatus: 'pending' | 'success' | 'failed' | 'blocked'
  createdAt: string
}

/**
 * 群组信息接口
 */
interface GroupInfo {
  id: string
  name: string
  botId: string
  avatar: string
  subscriptionCount: {
    douyin: number
    bilibili: number
  }
}

/**
 * 作者选项接口
 */
interface AuthorOption {
  id: string
  name: string
  platform: 'douyin' | 'bilibili'
  avatar: string
}

/**
 * 缓存数据接口
 */
interface CacheData {
  authors: Record<string, AuthorOption[]>
  douyinContent: Record<string, ContentItem[]>
  bilibiliContent: Record<string, ContentItem[]>
  lastFetch: Record<string, number>
}

/**
 * 头像组件 - 使用memo优化重渲染，集成shadcn/ui Avatar组件
 */
const CustomAvatar = React.memo(({ src, alt, className, fallbackIcon: FallbackIcon }: {
  src: string
  alt: string
  className?: string
  fallbackIcon?: React.ComponentType<{ className?: string }>
}) => {
  const [error, setError] = useState(false)

  return (
    <Avatar className={className}>
      <AvatarImage
        src={src}
        alt={alt}
        onError={() => setError(true)}
      />
      <AvatarFallback>
        {error && FallbackIcon ? (
          <FallbackIcon className="h-4 w-4" />
        ) : (
          alt.charAt(0).toUpperCase()
        )}
      </AvatarFallback>
    </Avatar>
  )
})

/**
 * 内容管理页面组件
 */
export default function ContentManagePage () {
  const isMobile = useIsMobile()
  const [groups, setGroups] = useState<GroupInfo[]>([])
  const [selectedGroupId, setSelectedGroupId] = useState<string>('')
  const [douyinContent, setDouyinContent] = useState<ContentItem[]>([])
  const [bilibiliContent, setBilibiliContent] = useState<ContentItem[]>([])
  const [authors, setAuthors] = useState<AuthorOption[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newContentId, setNewContentId] = useState('')
  const [selectedAuthorId, setSelectedAuthorId] = useState('')
  const [activeTab, setActiveTab] = useState('douyin')
  const [loading, setLoading] = useState(false)
  const [authorsLoading, setAuthorsLoading] = useState(false)
  const [showAddConfirm, setShowAddConfirm] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<{ id: string, platform: 'douyin' | 'bilibili' } | null>(null)
  const [groupComboboxOpen, setGroupComboboxOpen] = useState(false)
  const [authorComboboxOpen, setAuthorComboboxOpen] = useState(false)

  // 移动端底部弹出窗状态
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null)
  const [mobileDeleteConfirm, setMobileDeleteConfirm] = useState(false)
  
  // 缓存数据
  const cacheRef = useRef<CacheData>({
    authors: {},
    douyinContent: {},
    bilibiliContent: {},
    lastFetch: {}
  })

  // 缓存过期时间（5分钟）
  const CACHE_EXPIRE_TIME = 5 * 60 * 1000

  // 防抖定时器 - 修复：提供初始值
  const debounceTimerRef = useRef<NodeJS.Timeout | undefined>(undefined)

  /**
   * 处理移动端行点击事件
   * @param item - 内容项
   */
  const handleMobileRowClick = useCallback((item: ContentItem) => {
    setSelectedItem(item)
    setMobileSheetOpen(true)
  }, [])

  /**
   * 处理PC端删除点击
   * @param id - 内容ID
   * @param platform - 平台
   */
  const handlePCDeleteClick = useCallback((id: string, platform: 'douyin' | 'bilibili') => {
    setDeleteTarget({ id, platform })
    setShowDeleteConfirm(true)
  }, [])

  /**
   * 复制文本到剪贴板
   * @param text - 要复制的文本
   * @param successMessage - 成功提示信息
   */
  const copyToClipboard = useCallback(async (text: string, successMessage: string = '复制成功') => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text)
      } else {
        const textArea = document.createElement('textarea')
        textArea.value = text
        textArea.style.position = 'fixed'
        textArea.style.left = '-999999px'
        textArea.style.top = '-999999px'
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        document.execCommand('copy')
        textArea.remove()
      }
      toast(successMessage)
    } catch (err) {
      console.error('复制失败:', err)
      toast.error('复制失败，请手动长按复制')
    }
  }, [])

  /**
   * 检查缓存是否有效
   */
  const isCacheValid = useCallback((key: string) => {
    const lastFetch = cacheRef.current.lastFetch[key]
    return lastFetch && (Date.now() - lastFetch) < CACHE_EXPIRE_TIME
  }, [CACHE_EXPIRE_TIME])

  /**
   * 获取群组列表
   */
  const fetchGroups = useCallback(async () => {
    try {
      const response = await request.serverGet<GroupInfo[]>('/api/kkk/groups')
      if (response) {
        setGroups(response)
        if (response.length > 0 && !selectedGroupId) {
          setSelectedGroupId(response[0].id)
        }
      }
    } catch (error) {
      console.error('获取群组列表失败:', error)
    }
  }, [selectedGroupId])

  /**
   * 懒加载获取作者列表 - 仅在需要时请求
   */
  const fetchAuthorsLazy = useCallback(async (groupId: string) => {
    if (!groupId) return

    const cacheKey = `authors_${groupId}`

    // 检查缓存
    if (isCacheValid(cacheKey) && cacheRef.current.authors[groupId]) {
      setAuthors(cacheRef.current.authors[groupId])
      return
    }

    try {
      setAuthorsLoading(true)
      const response = await request.serverGet<AuthorOption[]>(`/api/kkk/authors?groupId=${groupId}`)
      if (response) {
        // 更新缓存
        cacheRef.current.authors[groupId] = response
        cacheRef.current.lastFetch[cacheKey] = Date.now()
        setAuthors(response)
      }
    } catch (error) {
      console.error('获取作者列表失败:', error)
      toast.error(error as string || '获取作者列表失败')
    } finally {
      setAuthorsLoading(false)
    }
  }, [isCacheValid])

  /**
   * 防抖的作者获取函数
   */
  const debouncedFetchAuthors = useCallback((groupId: string) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    debounceTimerRef.current = setTimeout(() => {
      fetchAuthorsLazy(groupId)
    }, 300) // 300ms防抖
  }, [fetchAuthorsLazy])

  /**
   * 获取抖音内容列表
   */
  const fetchDouyinContent = useCallback(async (groupId: string) => {
    if (!groupId) return

    const cacheKey = `douyin_${groupId}`

    // 检查缓存
    if (isCacheValid(cacheKey) && cacheRef.current.douyinContent[groupId]) {
      setDouyinContent(cacheRef.current.douyinContent[groupId])
      return
    }

    try {
      setLoading(true)
      const response = await request.serverGet<ContentItem[]>(`/api/kkk/content/douyin?groupId=${groupId}`)
      if (response) {
        // 更新缓存
        cacheRef.current.douyinContent[groupId] = response
        cacheRef.current.lastFetch[cacheKey] = Date.now()
        setDouyinContent(response)
      }
    } catch (error) {
      console.error('获取抖音内容失败:', error)
    } finally {
      setLoading(false)
    }
  }, [isCacheValid])

  /**
   * 获取B站内容列表
   */
  const fetchBilibiliContent = useCallback(async (groupId: string) => {
    if (!groupId) return

    const cacheKey = `bilibili_${groupId}`

    // 检查缓存
    if (isCacheValid(cacheKey) && cacheRef.current.bilibiliContent[groupId]) {
      setBilibiliContent(cacheRef.current.bilibiliContent[groupId])
      return
    }

    try {
      setLoading(true)
      const response = await request.serverGet<ContentItem[]>(`/api/kkk/content/bilibili?groupId=${groupId}`)
      if (response) {
        // 更新缓存
        cacheRef.current.bilibiliContent[groupId] = response
        cacheRef.current.lastFetch[cacheKey] = Date.now()
        setBilibiliContent(response)
      }
    } catch (error) {
      console.error('获取B站内容失败:', error)
    } finally {
      setLoading(false)
    }
  }, [isCacheValid])

  /**
   * 过滤内容列表 - 使用useMemo优化
   */
  const filteredDouyinContent = useMemo(() => {
    let filtered = douyinContent

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.author.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    return filtered
  }, [douyinContent, searchTerm])

  const filteredBilibiliContent = useMemo(() => {
    let filtered = bilibiliContent

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.author.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    return filtered
  }, [bilibiliContent, searchTerm])

  /**
   * 显示添加确认
   */
  const handleShowAddConfirm = () => {
    if (!newContentId.trim() || !selectedGroupId || !selectedAuthorId) {
      alert('请填写完整信息')
      return
    }
    setShowAddConfirm(true)
    }

  /**
   * 添加新内容
   */
  const handleAddContent = async () => {
    try {
      const endpoint = activeTab === 'douyin' ? '/api/kkk/content/douyin' : '/api/kkk/content/bilibili'
      await request.serverPost(endpoint, {
        contentId: newContentId.trim(),
        groupId: selectedGroupId,
        authorId: selectedAuthorId
      })

      setNewContentId('')
      setSelectedAuthorId('')
      setIsAddDialogOpen(false)
      setShowAddConfirm(false)

      // 刷新对应的内容列表
      if (activeTab === 'douyin') {
        await fetchDouyinContent(selectedGroupId)
      } else {
        await fetchBilibiliContent(selectedGroupId)
      }

      toast.success('内容添加成功')
    } catch (error) {
      console.error('添加内容失败:', error)
      toast.error('添加内容失败')
    }
  }

  /**
   * 删除内容
   */
  const handleDeleteContent = async () => {
    if (!selectedGroupId || !deleteTarget) return

    try {
      await request.serverPost('/api/kkk/content/delete', {
        id: deleteTarget.id,
        platform: deleteTarget.platform,
        groupId: selectedGroupId
      })

      // 清除缓存
      const cacheKey = `${deleteTarget.platform}_${selectedGroupId}`
      delete cacheRef.current.lastFetch[cacheKey]
      if (deleteTarget.platform === 'douyin') {
        delete cacheRef.current.douyinContent[selectedGroupId]
      } else {
        delete cacheRef.current.bilibiliContent[selectedGroupId]
      }

      // 刷新对应平台的内容列表
      if (deleteTarget.platform === 'douyin') {
        await fetchDouyinContent(selectedGroupId)
      } else {
        await fetchBilibiliContent(selectedGroupId)
      }

      // 关闭删除确认对话框并清空删除目标
      setShowDeleteConfirm(false)
      setDeleteTarget(null)

      toast.success('删除成功')
    } catch (error) {
      console.error('删除内容失败:', error)
      toast.error('删除内容失败')
    }
  }

  /**
   * 截断文本并添加省略号
   */
  const truncateText = (text: string, maxLength: number = 12) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  // 组件挂载时获取数据
  useEffect(() => {
    fetchGroups()
  }, [fetchGroups])

  // 群组切换时重新获取内容和作者
  useEffect(() => {
    if (selectedGroupId) {
      fetchDouyinContent(selectedGroupId)
      fetchBilibiliContent(selectedGroupId)
    }
  }, [selectedGroupId, fetchDouyinContent, fetchBilibiliContent])

  // 当activeTab改变时，重置选中的作者和作者筛选
  useEffect(() => {
    setSelectedAuthorId('')
    setAuthorComboboxOpen(false)
  }, [activeTab])

  const selectedGroup = groups.find(g => g.id === selectedGroupId)
  // const filteredDouyinContent = filterContent(douyinContent)
  // const filteredBilibiliContent = filterContent(bilibiliContent)

  // 根据当前选择的平台过滤作者 - 使用useMemo优化
  const filteredAuthors = useMemo(() => {
    return authors.filter(author => author.platform === activeTab)
  }, [authors, activeTab])

  // 组件挂载时获取数据
  useEffect(() => {
    fetchGroups()
  }, [fetchGroups])

  // 群组切换时获取内容，但不立即获取作者 - 修复：添加groupId参数
  useEffect(() => {
    if (selectedGroupId) {
      fetchDouyinContent(selectedGroupId)
      fetchBilibiliContent(selectedGroupId)
      // 不立即获取作者，等用户需要时再获取
    }
  }, [selectedGroupId, fetchDouyinContent, fetchBilibiliContent])
    
    // 当activeTab改变时，重置选中的作者
    useEffect(() => {
      setSelectedAuthorId('')
      setAuthorComboboxOpen(false)
    }, [activeTab])

      // 清理防抖定时器
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [])

    /**
     * 处理移动端删除确认
     * @param item - 内容项
     */
  const handleMobileDeleteClick = useCallback(async (item: ContentItem) => {
    if (mobileDeleteConfirm) {
      // 第二次点击，直接执行删除
      if (!selectedGroupId) return

      try {
        await request.serverPost('/api/kkk/content/delete', {
          id: item.id,
          platform: item.platform,
          groupId: selectedGroupId
        })

        // 清除缓存
        const cacheKey = `${item.platform}_${selectedGroupId}`
        delete cacheRef.current.lastFetch[cacheKey]
        if (item.platform === 'douyin') {
          delete cacheRef.current.douyinContent[selectedGroupId]
        } else {
          delete cacheRef.current.bilibiliContent[selectedGroupId]
        }

        // 刷新对应平台的内容列表
        if (item.platform === 'douyin') {
          await fetchDouyinContent(selectedGroupId)
        } else {
          await fetchBilibiliContent(selectedGroupId)
        }

        setMobileSheetOpen(false)
        setMobileDeleteConfirm(false)
        toast.success('删除成功')
      } catch (error) {
        console.error('删除失败:', error)
        toast.error('删除失败，请重试')
        setMobileDeleteConfirm(false)
      }
    } else {
      // 第一次点击，显示确认状态
      setMobileDeleteConfirm(true)
    }
  }, [mobileDeleteConfirm, selectedGroupId, fetchBilibiliContent, fetchDouyinContent])
  

  /**
   * 移动端内容详情组件
   */
  const MobileContentDetail = React.memo(({ item }: { item: ContentItem }) => (
    <div className="space-y-6">
      {/* 作者信息 */}
      <div className="flex items-start gap-4">
        <CustomAvatar
          src={item.avatar}
          alt={`${item.author}头像`}
          className="h-16 w-16 rounded-full object-cover"
          fallbackIcon={Users}
        />
        <div className="flex-1 space-y-2">
          <h3 className="text-lg font-semibold">{item.author}</h3>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {item.title || '暂无标题'}
          </p>
          <div className="flex items-center gap-2">
            <Badge variant='secondary' className="text-xs">
              {item.type === 'video' ? '视频' : item.type === 'note' ? '图文' : '动态'}
            </Badge>
            <Badge variant='outline' className="text-xs">
              {item.platform === 'douyin' ? '抖音' : 'B站'}
            </Badge>
          </div>
        </div>
      </div>

      {/* 详细信息 */}
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium mb-2">内容ID</h4>
          <div className="bg-muted p-3 rounded-md">
            <p className="text-xs font-mono break-all">{item.id}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium mb-1">发布时间</h4>
            <p className="text-sm text-muted-foreground">
              {new Date(item.publishTime).toLocaleString()}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-1">创建时间</h4>
            <p className="text-sm text-muted-foreground">
              {new Date(item.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-medium">推送状态</h4>
            <Badge variant={item.pushStatus === 'success' ? 'default' :
              item.pushStatus === 'failed' ? 'destructive' :
                item.pushStatus === 'blocked' ? 'secondary' : 'outline'}>
              {item.pushStatus === 'success' ? '成功' :
                item.pushStatus === 'failed' ? '失败' :
                  item.pushStatus === 'blocked' ? '已屏蔽' : '待处理'}
            </Badge>
          </div>
      </div>

      {/* 操作按钮 */}
      <div className="space-y-3 pt-4 border-t">
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={() => {
            const url = item.platform === 'douyin'
              ? `https://www.douyin.com/video/${item.id}`
              : `https://t.bilibili.com/${item.id}`
            window.open(url, '_blank')
          }}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          跳转{item.platform === 'douyin' ? '抖音' : 'B站'}
        </Button>

        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={() => copyToClipboard(item.id, '复制成功')}
        >
          <Copy className="h-4 w-4 mr-2" />
          复制链接
        </Button>

        <Button
          variant={mobileDeleteConfirm ? "destructive" : "outline"}
          className="w-full justify-start"
          onClick={() => handleMobileDeleteClick(item)}
        >
          <Trash2 className={`${mobileDeleteConfirm ? '' : 'text-destructive'} h-4 w-4 mr-2`} />
          <span className={`${mobileDeleteConfirm ? '' : 'text-destructive'}`}>{mobileDeleteConfirm ? '确认删除' : '删除内容'}</span>
        </Button>
      </div>
    </div>
    ))

  return (
    <div className="container mx-auto p-4 space-y-4">
      {/* 页面标题 - 移动端优化 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">推送历史管理</h1>
        </div>

        {/* 群组选择器 */}
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
          <Label className="text-sm font-medium whitespace-nowrap">选择群组:</Label>
          <Popover open={groupComboboxOpen} onOpenChange={setGroupComboboxOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={groupComboboxOpen}
                className={cn(
                  "w-full sm:w-[200px] justify-between",
                  !selectedGroupId && "text-muted-foreground"
                )}
              >
                {selectedGroupId
                  ? (() => {
                    const group = groups.find(g => g.id === selectedGroupId)
                    return group ? (
                      <div className="flex items-center gap-2">
                        <CustomAvatar
                          src={group.avatar}
                          alt={`${group.name}头像`}
                          className="h-4 w-4 rounded-full object-cover"
                          fallbackIcon={Users}
                        />
                        <span>{group.name}</span>
                      </div>
                    ) : '请选择群组'
                  })()
                  : "请选择群组"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full sm:w-[200px] p-0">
              <Command>
                <CommandInput placeholder="搜索群组..." className="h-9" />
                <CommandList>
                  <CommandEmpty>未找到群组。</CommandEmpty>
                  <CommandGroup>
                    {groups.map((group) => (
                      <CommandItem
                        key={group.id}
                        value={group.name}
                        onSelect={() => {
                          setSelectedGroupId(group.id)
                          setGroupComboboxOpen(false)
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <CustomAvatar
                            src={group.avatar}
                            alt={`${group.name}头像`}
                            className="h-4 w-4 rounded-full object-cover"
                            fallbackIcon={Users}
                          />
                          <span>{group.name}</span>
                        </div>
                        <Check
                          className={cn(
                            "ml-auto h-4 w-4",
                            selectedGroupId === group.id ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {selectedGroup && (
        <>
          {/* 统计信息 */}
          <div className="grid grid-cols-4 gap-1 bg-default/5 p-2 rounded-lg">
            <div className="text-center">
              <Video className="h-4 w-4 text-blue-600 mx-auto mb-1" />
              <div className="text-lg font-bold text-blue-700">{filteredDouyinContent.length}</div>
              <div className="text-xs text-gray-600">抖音</div>
            </div>

            <div className="text-center">
              <MessageSquare className="h-4 w-4 text-pink-600 mx-auto mb-1" />
              <div className="text-lg font-bold text-pink-700">{filteredBilibiliContent.length}</div>
              <div className="text-xs text-gray-600">B站</div>
            </div>

            <div className="text-center">
              <Users className="h-4 w-4 text-green-600 mx-auto mb-1" />
              <div className="text-lg font-bold text-green-700">{selectedGroup.subscriptionCount.douyin}</div>
              <div className="text-xs text-gray-600">抖音订阅</div>
            </div>

            <div className="text-center">
              <Users className="h-4 w-4 text-purple-600 mx-auto mb-1" />
              <div className="text-lg font-bold text-purple-700">{selectedGroup.subscriptionCount.bilibili}</div>
              <div className="text-xs text-gray-600">B站订阅</div>
            </div>
          </div>

          {/* 搜索和操作栏 */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="搜索内容或作者..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />

            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="whitespace-nowrap">
                  <Plus className="h-4 w-4 mr-2" />
                  添加内容
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader className="pb-4">
                  <DialogTitle>添加新内容</DialogTitle>
                  {/* 添加当前群信息显示 */}
                  {selectedGroup && (
                    <div className="flex items-center justify-center gap-2 mt-2 p-3 bg-muted/50 rounded-lg border">
                      <CustomAvatar
                        src={selectedGroup.avatar}
                        alt={selectedGroup.name}
                        className="w-6 h-6 rounded-full"
                        fallbackIcon={Users}
                      />
                      <span className="text-sm text-muted-foreground">
                        将添加到 <span className="font-medium text-foreground">{selectedGroup.name}</span> 群
                      </span>
                    </div>
                  )}
                </DialogHeader>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>平台类型</Label>
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="douyin">抖音</TabsTrigger>
                        <TabsTrigger value="bilibili">B站</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                  <div className="space-y-2">
                    <Label>选择作者 <span className="text-red-500">*</span></Label>
                    <Popover
                      open={authorComboboxOpen}
                      onOpenChange={(open) => {
                        setAuthorComboboxOpen(open)
                        // 当打开作者选择器时，懒加载作者数据
                        if (open && selectedGroupId) {
                          debouncedFetchAuthors(selectedGroupId)
                        }
                      }}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={authorComboboxOpen}
                          className={cn(
                            "w-full justify-between",
                            !selectedAuthorId && "text-muted-foreground"
                          )}
                        >
                          {selectedAuthorId
                            ? (() => {
                              const author = filteredAuthors.find(a => a.id === selectedAuthorId)
                              return author ? (
                                <div className="flex items-center gap-2">
                                  <CustomAvatar
                                    src={author.avatar}
                                    alt={`${author.name}头像`}
                                    className="h-4 w-4 rounded-full object-cover"
                                    fallbackIcon={Users}
                                  />
                                  <span>{author.name}</span>
                                </div>
                              ) : '请选择作者'
                            })()
                            : "请选择作者"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="搜索作者..." className="h-9" />
                          <CommandList>
                            <CommandEmpty>
                              {authorsLoading ? "加载中..." : "该平台未订阅任何内容"}
                            </CommandEmpty>
                            <CommandGroup>
                              {filteredAuthors.map((author) => (
                                <CommandItem
                                  key={author.id}
                                  value={author.name}
                                  onSelect={() => {
                                    setSelectedAuthorId(author.id)
                                    setAuthorComboboxOpen(false)
                                  }}
                                >
                                  <div className="flex items-center gap-2">
                                    <CustomAvatar
                                      src={author.avatar}
                                      alt={`${author.name}头像`}
                                      className="h-4 w-4 rounded-full object-cover"
                                      fallbackIcon={Users}
                                    />
                                    <span>{author.name}</span>
                                  </div>
                                  <Check
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      selectedAuthorId === author.id ? "opacity-100" : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label>内容ID <span className="text-red-500">*</span></Label>
                    <Input
                      placeholder={activeTab === 'douyin' ? '输入抖音作品ID' : '输入B站动态ID'}
                      value={newContentId}
                      onChange={(e) => setNewContentId(e.target.value)}
                    />
                  </div>

                  {/* 二次确认区域 */}
                  {!showAddConfirm ? (
                    <Button
                      onClick={handleShowAddConfirm}
                      className="w-full"
                      disabled={!newContentId.trim() || !selectedAuthorId}
                    >
                      添加内容
                    </Button>
                  ) : (
                    <div className="space-y-3">
                      <div className="text-center text-sm text-muted-foreground border-t pt-3">
                        确认添加该内容到已缓存列表？
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={() => setShowAddConfirm(false)}
                          className="flex-1"
                        >
                          取消
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={handleAddContent}
                          className="flex-1"
                        >
                          确认！下次推送将不再推送该{activeTab === 'douyin' ? '作品' : '动态'}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* 内容列表 */}
          <Tabs defaultValue="douyin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="douyin" className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                抖音
              </TabsTrigger>
              <TabsTrigger value="bilibili" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                B站
              </TabsTrigger>
            </TabsList>

            <TabsContent value="douyin">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="h-5 w-5" />
                    抖音作品列表
                    <Badge variant="secondary">{filteredDouyinContent.length}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="text-center py-8">加载中...</div>
                  ) : filteredDouyinContent.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        {selectedGroup?.avatar && (
                          <CustomAvatar
                            src={selectedGroup.avatar}
                            alt={selectedGroup.name}
                            className="w-6 h-6 rounded-full"
                            fallbackIcon={Users}
                          />
                        )}
                        <span className="font-medium">{selectedGroup?.name || '当前群'}</span>
                      </div>
                      {searchTerm ? '没有找到匹配的内容' : '暂无已缓存的抖音推送'}
                    </div>
                  ) : (
                    <div className="overflow-x-auto relative">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>作者</TableHead>
                            <TableHead>ID</TableHead>
                            <TableHead className="hidden sm:table-cell">发布时间</TableHead>
                          </TableRow>
                        </TableHeader>
                            <TableBody>
                              {filteredDouyinContent.map((item) => (
                                isMobile ? (
                                  // 移动端：点击整行弹出底部模态窗
                                  <TableRow
                                    key={item.id}
                                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                                    onClick={() => handleMobileRowClick(item)}
                                  >
                                    <TableCell className="py-4">
                                      <div className="flex items-center gap-3">
                                        <CustomAvatar
                                          src={item.avatar}
                                          alt={`${item.author}头像`}
                                          className="h-8 w-8 rounded-full object-cover"
                                          fallbackIcon={Users}
                                        />
                                        <span className="font-medium" title={item.author}>{truncateText(item.author)}</span>
                                      </div>
                                    </TableCell>
                                    <TableCell className="py-4 font-mono text-sm">
                                      {truncateText(item.id, 12)}
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell py-4">
                                      {new Date(item.publishTime).toLocaleString()}
                                    </TableCell>
                                  </TableRow>
                                ) : (
                                  // PC端：右键上下文菜单
                                  <ContextMenu key={item.id}>
                                    <ContextMenuTrigger asChild>
                                      <TableRow className="cursor-pointer hover:bg-muted/50 transition-colors">
                                        <TableCell className="py-3">
                                          <div className="flex items-center gap-2 rounded-md p-1 transition-colors">
                                            <CustomAvatar
                                              src={item.avatar}
                                              alt={`${item.author}头像`}
                                              className="h-6 w-6 rounded-full object-cover"
                                              fallbackIcon={Users}
                                            />
                                            <span title={item.author}>{truncateText(item.author)}</span>
                                          </div>
                                        </TableCell>
                                        <TableCell className="py-3 font-mono text-sm hover:text-primary transition-colors">
                                          {truncateText(item.id, 12)}
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell py-3 hover:text-primary transition-colors">
                                          {new Date(item.publishTime).toLocaleString()}
                                        </TableCell>
                                      </TableRow>
                                    </ContextMenuTrigger>
                                    <ContextMenuContent className="w-80">
                                      {/* 作者信息 */}
                                      <div className="p-4">
                                        <div className="flex items-start gap-3">
                                          <CustomAvatar
                                            src={item.avatar}
                                            alt={`${item.author}头像`}
                                            className="h-12 w-12 rounded-full object-cover"
                                            fallbackIcon={Users}
                                          />
                                          <div className="flex-1 space-y-1">
                                            <h4 className="text-sm font-semibold">{item.author}</h4>
                                            <p className="text-sm text-muted-foreground line-clamp-2">
                                              {item.title || '暂无标题'}
                                            </p>
                                            <div className="flex items-center gap-2 text-xs">
                                              <Badge variant='secondary'>
                                                {item.type === 'video' ? '视频' : item.type === 'note' ? '图文' : '动态'}
                                              </Badge>
                                              <span className="text-muted-foreground">
                                                {new Date(item.publishTime).toLocaleString()}
                                              </span>
                                            </div>
                                          </div>
                                        </div>

                                        {/* ID信息 */}
                                        <div className="mt-3 pt-3 border-t">
                                          <h5 className="text-xs font-medium text-muted-foreground mb-1">内容ID</h5>
                                          <p className="text-xs font-mono bg-muted p-2 rounded break-all">
                                            {item.id}
                                          </p>
                                        </div>
                                      </div>

                                      <ContextMenuSeparator />

                                      {/* 操作项 */}
                                      <ContextMenuItem onClick={() => window.open(`https://www.douyin.com/video/${item.id}`, '_blank')}>
                                        <ExternalLink className="h-4 w-4 mr-2" />
                                        跳转抖音
                                      </ContextMenuItem>
                                        <ContextMenuItem onClick={() => copyToClipboard(`https://www.douyin.com/video/${item.id}`, '复制成功')}>
                                        <Copy className="h-4 w-4 mr-2" />
                                        复制链接
                                      </ContextMenuItem>

                                      <ContextMenuSeparator />

                                      <ContextMenuItem
                                        className="text-destructive focus:text-destructive"
                                        onClick={() => handlePCDeleteClick(item.id, 'douyin')}
                                      >
                                          <Trash2 className="text-destructive h-4 w-4 mr-2" />
                                        删除内容
                                      </ContextMenuItem>
                                    </ContextMenuContent>
                                  </ContextMenu>
                                )
                              ))}
                            </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bilibili">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    B站动态列表
                    <Badge variant="secondary">{filteredBilibiliContent.length}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="text-center py-8">加载中...</div>
                  ) : filteredBilibiliContent.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        {selectedGroup?.avatar && (
                          <CustomAvatar
                            src={selectedGroup.avatar}
                            alt={selectedGroup.name}
                            className="w-6 h-6 rounded-full"
                            fallbackIcon={Users}
                          />
                        )}
                        <span className="font-medium">{selectedGroup?.name || '当前群'}</span>
                      </div>
                      {searchTerm ? '没有找到匹配的内容' : '暂无已缓存的B站推送'}
                    </div>
                  ) : (
                    <div className="overflow-x-auto relative">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>作者</TableHead>
                            <TableHead>ID</TableHead>
                            <TableHead className="hidden sm:table-cell">发布时间</TableHead>
                          </TableRow>
                        </TableHeader>
                            <TableBody>
                              {filteredBilibiliContent.map((item) => (
                                isMobile ? (
                                  // 移动端：点击整行弹出底部模态窗
                                  <TableRow
                                    key={item.id}
                                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                                    onClick={() => handleMobileRowClick(item)}
                                  >
                                    <TableCell className="py-4">
                                      <div className="flex items-center gap-3">
                                        <CustomAvatar
                                          src={item.avatar}
                                          alt={`${item.author}头像`}
                                          className="h-8 w-8 rounded-full object-cover"
                                          fallbackIcon={Users}
                                        />
                                        <span className="font-medium" title={item.author}>{truncateText(item.author)}</span>
                                      </div>
                                    </TableCell>
                                    <TableCell className="py-4 font-mono text-sm">
                                      {truncateText(item.id, 12)}
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell py-4">
                                      {new Date(item.publishTime).toLocaleString()}
                                    </TableCell>
                                  </TableRow>
                                ) : (
                                  // PC端：右键上下文菜单
                                  <ContextMenu key={item.id}>
                                    <ContextMenuTrigger asChild>
                                      <TableRow className="cursor-pointer hover:bg-muted/50 transition-colors">
                                        <TableCell className="py-3">
                                          <div className="flex items-center gap-2 rounded-md p-1 transition-colors">
                                            <CustomAvatar
                                              src={item.avatar}
                                              alt={`${item.author}头像`}
                                              className="h-6 w-6 rounded-full object-cover"
                                              fallbackIcon={Users}
                                            />
                                            <span title={item.author}>{truncateText(item.author)}</span>
                                          </div>
                                        </TableCell>
                                        <TableCell className="py-3 font-mono text-sm hover:text-primary transition-colors">
                                          {truncateText(item.id, 12)}
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell py-3 hover:text-primary transition-colors">
                                          {new Date(item.publishTime).toLocaleString()}
                                        </TableCell>
                                      </TableRow>
                                    </ContextMenuTrigger>
                                    <ContextMenuContent className="w-80">
                                      {/* 作者信息 */}
                                      <div className="p-4">
                                        <div className="flex items-start gap-3">
                                          <CustomAvatar
                                            src={item.avatar}
                                            alt={`${item.author}头像`}
                                            className="h-12 w-12 rounded-full object-cover"
                                            fallbackIcon={Users}
                                          />
                                          <div className="flex-1 space-y-1">
                                            <h4 className="text-sm font-semibold">{item.author}</h4>
                                            <p className="text-sm text-muted-foreground line-clamp-2">
                                              {item.title || '暂无标题'}
                                            </p>
                                            <div className="flex items-center gap-2 text-xs">
                                              <Badge variant='secondary'>
                                                {item.type === 'video' ? '视频' : item.type === 'note' ? '图文' : '动态'}
                                              </Badge>
                                              <span className="text-muted-foreground">
                                                {new Date(item.publishTime).toLocaleString()}
                                              </span>
                                            </div>
                                          </div>
                                        </div>

                                        {/* ID信息 */}
                                        <div className="mt-3 pt-3 border-t">
                                          <h5 className="text-xs font-medium text-muted-foreground mb-1">内容ID</h5>
                                          <p className="text-xs font-mono bg-muted p-2 rounded break-all">
                                            {item.id}
                                          </p>
                                        </div>
                                      </div>

                                      <ContextMenuSeparator />

                                      {/* 操作项 */}
                                      <ContextMenuItem onClick={() => window.open(`https://t.bilibili.com/${item.id}`, '_blank')}>
                                        <ExternalLink className="h-4 w-4 mr-2" />
                                        跳转B站
                                      </ContextMenuItem>
                                        <ContextMenuItem onClick={() => copyToClipboard(`https://t.bilibili.com/${item.id}`, '复制成功')}>
                                        <Copy className="h-4 w-4 mr-2" />
                                        复制链接
                                      </ContextMenuItem>

                                      <ContextMenuSeparator />

                                      <ContextMenuItem
                                        className="text-destructive focus:text-destructive"
                                        onClick={() => handlePCDeleteClick(item.id, 'bilibili')}
                                      >
                                          <Trash2 className="text-destructive text-danger h-4 w-4 mr-2" />
                                        删除内容
                                      </ContextMenuItem>
                                    </ContextMenuContent>
                                  </ContextMenu>
                                )
                              ))}
                            </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* 移动端底部弹出模态窗 */}
          <Sheet open={mobileSheetOpen} onOpenChange={(open) => {
            setMobileSheetOpen(open)
            // 模态框关闭时重置删除确认状态
            if (!open) {
              setMobileDeleteConfirm(false)
            }
          }}>
            <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto p-6">
              {selectedItem && <MobileContentDetail item={selectedItem} />}
            </SheetContent>
          </Sheet>
        </>
      )}

      {groups.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">暂无已订阅推送功能的群组</p>
          </CardContent>
        </Card>
      )}
      
      {/* 删除确认对话框 */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>确认删除</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              确定要删除这个{deleteTarget?.platform === 'douyin' ? '抖音作品' : 'B站动态'}吗？
            </p>
            <p className="text-sm text-muted-foreground">
              删除后该内容将从已缓存列表中移除，下次推送时可能会重新推送。
            </p>
            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => {
                  setShowDeleteConfirm(false)
                  setDeleteTarget(null)
                }}
                className="flex-1"
              >
                取消
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteContent}
                className="flex-1"
              >
                确认删除
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
