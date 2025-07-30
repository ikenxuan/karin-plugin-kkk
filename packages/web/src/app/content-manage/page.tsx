import { MessageSquare, Plus, Trash2, Users, Video } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import request from '@/lib/request'

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

  /**
   * 获取群组列表
   */
  const fetchGroups = async () => {
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
  }

  /**
   * 获取作者列表
   */
  const fetchAuthors = async () => {
    if (!selectedGroupId) return

    try {
      const response = await request.serverGet<AuthorOption[]>(`/api/kkk/authors?groupId=${selectedGroupId}`)
      if (response) {
        setAuthors(response)
      }
    } catch (error) {
      console.error('获取作者列表失败:', error)
    }
  }

  /**
   * 获取抖音内容列表
   */
  const fetchDouyinContent = async () => {
    if (!selectedGroupId) return

    try {
      setLoading(true)
      const response = await request.serverGet<ContentItem[]>(`/api/kkk/content/douyin?groupId=${selectedGroupId}`)
      if (response) {
        setDouyinContent(response)
      }
    } catch (error) {
      console.error('获取抖音内容失败:', error)
    } finally {
      setLoading(false)
    }
  }

  /**
   * 获取B站内容列表
   */
  const fetchBilibiliContent = async () => {
    if (!selectedGroupId) return

    try {
      setLoading(true)
      const response = await request.serverGet<ContentItem[]>(`/api/kkk/content/bilibili?groupId=${selectedGroupId}`)
      if (response) {
        setBilibiliContent(response)
      }
    } catch (error) {
      console.error('获取B站内容失败:', error)
    } finally {
      setLoading(false)
    }
  }

  /**
   * 添加新内容
   */
  const handleAddContent = async () => {
    if (!newContentId.trim() || !selectedGroupId || !selectedAuthorId) {
      alert('请填写完整信息')
      return
    }

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

      // 刷新对应的内容列表
      if (activeTab === 'douyin') {
        await fetchDouyinContent()
      } else {
        await fetchBilibiliContent()
      }
    } catch (error) {
      console.error('添加内容失败:', error)
    }
  }

  /**
   * 删除内容
   */
  const handleDeleteContent = async (id: string, platform: 'douyin' | 'bilibili') => {
    if (!selectedGroupId) return

    try {
      // 修复：使用正确的DELETE请求方法
      const response = await fetch('/api/kkk/content', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          platform,
          groupId: selectedGroupId
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // 刷新对应的内容列表
      if (platform === 'douyin') {
        await fetchDouyinContent()
      } else {
        await fetchBilibiliContent()
      }
    } catch (error) {
      console.error('删除内容失败:', error)
    }
  }

  /**
   * 过滤内容列表 - 增强版本，支持作者筛选
   */
  const filterContent = (content: ContentItem[]) => {
    let filtered = content

    // 按搜索词过滤
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.author.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    return filtered
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
  }, [])

  // 群组切换时重新获取内容和作者
  useEffect(() => {
    if (selectedGroupId) {
      fetchDouyinContent()
      fetchBilibiliContent()
      fetchAuthors()
    }
  }, [selectedGroupId])

  // 当activeTab改变时，重置选中的作者和作者筛选
  useEffect(() => {
    setSelectedAuthorId('')
  }, [activeTab])

  const selectedGroup = groups.find(g => g.id === selectedGroupId)
  const filteredDouyinContent = filterContent(douyinContent)
  const filteredBilibiliContent = filterContent(bilibiliContent)

  // 根据当前选择的平台过滤作者
  const filteredAuthors = authors.filter(author => author.platform === activeTab)

  return (
    <div className="container mx-auto p-4 space-y-4">
      {/* 页面标题 - 移动端优化 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">推送（已缓存）</h1>

        {/* 群组选择器 */}
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
          <Label className="text-sm font-medium whitespace-nowrap">选择群组:</Label>
          <Select value={selectedGroupId} onValueChange={setSelectedGroupId}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="请选择群组" />
            </SelectTrigger>
            <SelectContent>
              {groups.map(group => (
                <SelectItem key={group.id} value={group.id}>
                  <div className="flex items-center gap-2">
                    <img
                      src={group.avatar}
                      alt={`${group.name}头像`}
                      className="h-4 w-4 rounded-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                        e.currentTarget.nextElementSibling?.classList.remove('hidden')
                      }}
                    />
                    <Users className="h-4 w-4 hidden" /> {/* 备用图标 */}
                    <span>{group.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {selectedGroup && (
        <>
          {/* 统计信息 - 紧凑网格 */}
          <div className="grid grid-cols-4 gap-1 bg-gray-50 p-2 rounded-lg">
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
                <DialogHeader className="pb-4">  {/* 增加底部间距 */}
                  <DialogTitle>添加新内容</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">  {/* 增加间距从 space-y-4 到 space-y-6 */}
                  <div className="space-y-2">  {/* 为每个字段组添加内部间距 */}
                    <Label>平台类型</Label>
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="douyin">抖音</TabsTrigger>
                        <TabsTrigger value="bilibili">B站</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                  <div className="space-y-2">
                    <Label>选择作者 *</Label>
                    <Select value={selectedAuthorId} onValueChange={setSelectedAuthorId}>
                      <SelectTrigger>
                        <SelectValue placeholder="请选择作者" />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredAuthors.map(author => (
                          <SelectItem key={author.id} value={author.id}>
                            <div className="flex items-center gap-2">
                              <img
                                src={author.avatar}
                                alt={`${author.name}头像`}
                                className="h-4 w-4 rounded-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.src = '/default-avatar.png'
                                }}
                              />
                              <span>{author.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>内容ID *</Label>
                    <Input
                      placeholder={activeTab === 'douyin' ? '输入抖音作品ID' : '输入B站动态ID'}
                      value={newContentId}
                      onChange={(e) => setNewContentId(e.target.value)}
                    />
                  </div>
                  <Button
                    onClick={handleAddContent}
                    className="w-full"
                    disabled={!newContentId.trim() || !selectedAuthorId}
                  >
                    添加内容
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* 内容列表 */}
          <Tabs defaultValue="douyin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="douyin" className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                抖音内容
              </TabsTrigger>
              <TabsTrigger value="bilibili" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                B站内容
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
                      {searchTerm ? '没有找到匹配的内容' : '暂无抖音内容'}
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
                                      <img
                                        src={item.avatar}
                                        alt={`${item.author}头像`}
                                        className="h-6 w-6 rounded-full object-cover"
                                        onError={(e) => {
                                          e.currentTarget.src = '/default-avatar.png'
                                        }}
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
                                      onClick={() => handleDeleteContent(item.id, 'douyin')}
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
                      {searchTerm ? '没有找到匹配的内容' : '暂无B站内容'}
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
                                      <img
                                        src={item.avatar}
                                        alt={`${item.author}头像`}
                                        className="h-6 w-6 rounded-full object-cover"
                                        onError={(e) => {
                                          e.currentTarget.src = '/default-avatar.png'
                                        }}
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
                                      onClick={() => handleDeleteContent(item.id, 'bilibili')}
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
    </div>
  )
}