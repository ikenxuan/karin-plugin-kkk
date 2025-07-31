import { Check, ChevronsUpDown,MessageSquare, Plus, Trash2, Users, Video } from 'lucide-react'
import React, { useCallback, useEffect, useMemo, useRef,useState } from 'react'
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
  const [deleteTarget, setDeleteTarget] = useState<{id: string, platform: 'douyin' | 'bilibili'} | null>(null)
  const [groupComboboxOpen, setGroupComboboxOpen] = useState(false)
  const [authorComboboxOpen, setAuthorComboboxOpen] = useState(false)
  
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
   * 显示删除确认
   */
  const handleShowDeleteConfirm = (id: string, platform: 'douyin' | 'bilibili') => {
    setDeleteTarget({ id, platform })
    setShowDeleteConfirm(true)
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

      // 刷新对应的内容列表
      if (deleteTarget.platform === 'douyin') {
        await fetchDouyinContent(selectedGroupId)
      } else {
        await fetchBilibiliContent(selectedGroupId)
      }

      setShowDeleteConfirm(false)
      setDeleteTarget(null)
      toast.success('内容删除成功')
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
          {/* 统计信息 - 紧凑网格 */}
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
                    <div className="overflow-x-auto">
                      <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>作者</TableHead>
                                <TableHead>ID</TableHead>
                                <TableHead className="hidden sm:table-cell">发布时间</TableHead>
                                <TableHead>操作</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {filteredDouyinContent.map((item) => (
                                <TableRow key={item.id}>
                                  <TableCell>
                                    <div className="flex items-center gap-2">
                                      <CustomAvatar
                                        src={item.avatar}
                                        alt={`${item.author}头像`}
                                        className="h-6 w-6 rounded-full object-cover"
                                        fallbackIcon={Users}
                                      />
                                      <span title={item.author}>{truncateText(item.author)}</span>
                                    </div>
                                  </TableCell>
                                  <TableCell
                                    className="font-mono text-sm cursor-pointer hover:bg-muted/50 transition-colors"
                                    title={`点击查看完整ID: ${item.id}`}
                                    onClick={() => {
                                      navigator.clipboard.writeText(item.id)
                                      toast('复制成功')
                                    }}
                                  >
                                    {truncateText(item.id, 10)}
                                  </TableCell>
                                  <TableCell className="hidden sm:table-cell">
                                    {new Date(item.publishTime).toLocaleDateString()}
                                  </TableCell>
                                  <TableCell>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                      onClick={() => handleShowDeleteConfirm(item.id, 'douyin')}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </TableCell>
                                </TableRow>
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
                    <div className="overflow-x-auto">
                      <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>作者</TableHead>
                                <TableHead>ID</TableHead>
                                <TableHead className="hidden sm:table-cell">发布时间</TableHead>
                                <TableHead>操作</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {filteredBilibiliContent.map((item) => (
                                <TableRow key={item.id}>
                                  <TableCell>
                                    <div className="flex items-center gap-2">
                                      <CustomAvatar
                                        src={item.avatar}
                                        alt={`${item.author}头像`}
                                        className="h-6 w-6 rounded-full object-cover"
                                      />
                                      <span title={item.author}>{truncateText(item.author)}</span>
                                    </div>
                                  </TableCell>
                                  <TableCell
                                    className="font-mono text-sm cursor-pointer hover:bg-muted/50 transition-colors"
                                    title={`点击查看完整ID: ${item.id}`}
                                    onClick={() => {
                                      navigator.clipboard.writeText(item.id)
                                      toast('复制成功')
                                    }}
                                  >
                                    {truncateText(item.id, 10)}
                                  </TableCell>
                                  <TableCell className="hidden sm:table-cell">
                                    {new Date(item.publishTime).toLocaleDateString()}
                                  </TableCell>
                                  <TableCell>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                      onClick={() => handleShowDeleteConfirm(item.id, 'bilibili')}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
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
