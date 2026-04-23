'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useTheme } from 'next-themes'
import {
  Autocomplete,
  Button,
  Chip,
  ListBox,
  ProgressCircle,
  Spinner,
  useFilter
} from '@heroui/react'
import { CodeDiffViewer } from '@/components/code-diff'
import {
  computePackageDiffLite,
  fetchVersions,
  type DiffGranularity,
  type FileDiffResult,
  type PackageDiffResult
} from '@/lib/diff-client'

/** 文件别名映射：把前端固定的逻辑名称映射到 getBaseName 处理后的路径 */
const FILE_ALIASES: Record<string, string> = {
  main: 'lib/core_chunk/main.js'
}

/** 把别名或原始路径解析为可用于匹配 result.files 的实际路径 */
function resolveFilePath (input: string): string {
  // 1. 先查别名表
  if (FILE_ALIASES[input]) return FILE_ALIASES[input]

  // 2. 对 lib/ 下的 hash JS 文件名做 hash 剥离，
  //    这样 URL 里写 file=lib/core_chunk/main-DIwqx2qw.js 也能匹配到 lib/core_chunk/main.js
  if (input.startsWith('lib/') && input.endsWith('.js')) {
    return input.replace(/-[A-Za-z0-9_-]+\.js$/, '.js')
  }

  return input
}

type SortMode = 'size' | 'name' | 'default'

function formatBytes (n: number): string {
  if (n === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(n) / Math.log(k))
  return `${(n / k ** i).toFixed(i > 0 ? 1 : 0)} ${sizes[i]}`
}

export default function DiffPage () {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  const { contains } = useFilter({ sensitivity: 'base' })

  const [versions, setVersions] = useState<string[]>([])
  const [oldVersion, setOldVersion] = useState('')
  const [newVersion, setNewVersion] = useState('')
  const [loadingVersions, setLoadingVersions] = useState(true)
  const [comparing, setComparing] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<PackageDiffResult | null>(null)
  const [selectedFile, setSelectedFile] = useState('')
  const [sortMode, setSortMode] = useState<SortMode>('size')
  const [isMobile, setIsMobile] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [diffGranularity, setDiffGranularity] = useState<DiffGranularity>('word')
  const diffQueueRef = useRef(0)

  const diffSourcesRef = useRef<Map<string, { oldContent?: Uint8Array; newContent?: Uint8Array }>>(new Map())
  const diffCacheRef = useRef<Map<string, FileDiffResult>>(new Map())
  const computingFileRef = useRef<string>('')
  const resultRef = useRef<PackageDiffResult | null>(null)
  const workerRef = useRef<Worker | null>(null)

  const urlFileRef = useRef<string>('')
  const shouldAutoCompareRef = useRef(false)

  resultRef.current = result

  // 初始化 Web Worker
  useEffect(() => {
    const worker = new Worker(new URL('@/lib/diff-worker', import.meta.url))
    worker.onmessage = (e) => {
      const { path, result: diffResult, error: diffError } = e.data
      if (diffError) {
        if (computingFileRef.current === path) {
          computingFileRef.current = ''
        }
        setError(diffError)
        return
      }

      const currentResult = resultRef.current
      if (!currentResult) return
      const file = currentResult.files.find((f) => f.path === path)
      if (!file) return

      const updated: FileDiffResult = {
        ...file,
        rows: diffResult.rows,
        additions: diffResult.additions,
        deletions: diffResult.deletions
      }

      diffCacheRef.current.set(path, updated)
      if (computingFileRef.current === path) {
        computingFileRef.current = ''
      }

      setResult((prev) => {
        if (!prev) return prev
        return {
          ...prev,
          files: prev.files.map((f) => (f.path === path ? updated : f))
        }
      })
    }
    workerRef.current = worker
    return () => worker.terminate()
  }, [])

  // 加载版本列表
  useEffect(() => {
    fetchVersions()
      .then((vers) => {
        setVersions(vers)
        if (vers.length >= 2) {
          setNewVersion(vers[0])
          setOldVersion(vers[1])
        } else if (vers.length === 1) {
          setNewVersion(vers[0])
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoadingVersions(false))
  }, [])

  // 解析 URL 查询参数（依赖 versions，以便正确处理 latest）
  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    const old = params.get('old')
    let newV = params.get('new')
    const file = params.get('file')

    // new=latest 自动解析为最新版本
    if (newV === 'latest' && versions.length > 0) {
      newV = versions[0]
    }

    if (old) setOldVersion(old)
    if (newV) setNewVersion(newV)
    if (file) urlFileRef.current = file

    if (old && newV) {
      shouldAutoCompareRef.current = true
    }
  }, [versions])

  // URL 参数触发自动对比
  useEffect(() => {
    if (!shouldAutoCompareRef.current) return
    if (!versions.length) return
    if (!oldVersion || !newVersion) return
    if (!versions.includes(oldVersion) || !versions.includes(newVersion)) return

    shouldAutoCompareRef.current = false
    handleCompare()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [versions, oldVersion, newVersion])

  // 响应式检测
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // 同步 URL 查询参数：开始对比或切换文件后自动更新地址栏
  useEffect(() => {
    if (!result || typeof window === 'undefined') return
    const params = new URLSearchParams()
    if (oldVersion) params.set('old', oldVersion)
    if (newVersion) params.set('new', newVersion)
    if (selectedFile) {
      const aliasEntry = Object.entries(FILE_ALIASES).find(([, v]) => v === selectedFile)
      params.set('file', aliasEntry?.[0] ?? selectedFile)
    }
    const newUrl = `${window.location.pathname}?${params.toString()}`
    window.history.replaceState({}, '', newUrl)
  }, [oldVersion, newVersion, selectedFile, result])

  // 切换对比精度时清空缓存并重新计算
  useEffect(() => {
    if (!result) return
    diffCacheRef.current.clear()
    computingFileRef.current = ''
    setResult((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        files: prev.files.map((f) =>
          f.status === 'unchanged' ? f : { ...f, rows: [], additions: 0, deletions: 0 }
        )
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [diffGranularity])

  // 按需计算当前选中文件的 diff（通过 Web Worker）
  useEffect(() => {
    if (!selectedFile || !result) return
    const file = result.files.find((f) => f.path === selectedFile)
    if (!file || file.status === 'unchanged' || file.rows.length > 0) return

    const cached = diffCacheRef.current.get(selectedFile)
    if (cached) {
      setResult((prev) => {
        if (!prev) return prev
        return {
          ...prev,
          files: prev.files.map((f) => (f.path === selectedFile ? cached : f))
        }
      })
      return
    }

    if (computingFileRef.current === selectedFile) return
    computingFileRef.current = selectedFile

    const source = diffSourcesRef.current.get(selectedFile)
    if (!source || !workerRef.current) return

    const oldText = source.oldContent ? new TextDecoder().decode(source.oldContent) : ''
    const newText = source.newContent ? new TextDecoder().decode(source.newContent) : ''

    workerRef.current.postMessage({ oldText, newText, path: selectedFile, granularity: diffGranularity })
  }, [selectedFile, result, diffGranularity])

  const handleCompare = async () => {
    if (!oldVersion || !newVersion) {
      setError('请选择旧版本和新版本')
      return
    }
    setComparing(true)
    setError('')
    setResult(null)
    setSelectedFile('')
    diffQueueRef.current++
    const currentQueue = diffQueueRef.current

    try {
      const { result: data, diffSources } = await computePackageDiffLite(oldVersion, newVersion)

      if (currentQueue !== diffQueueRef.current) return

      diffSourcesRef.current = diffSources
      diffCacheRef.current = new Map()
      computingFileRef.current = ''
      setResult(data)
      setComparing(false)

      // 优先选中 URL 指定的文件
      const preferredPath = urlFileRef.current ? resolveFilePath(urlFileRef.current) : null
      if (preferredPath) {
        const matched = data.files.find((f) => f.path === preferredPath)
        if (matched) {
          setSelectedFile(matched.path)
          urlFileRef.current = ''
          return
        }
      }
      urlFileRef.current = ''

      // 不带 file 参数时，直接跳转到 main 文件
      const corePath = FILE_ALIASES.main
      if (corePath) {
        const coreFile = data.files.find((f) => f.path === corePath)
        if (coreFile) {
          setSelectedFile(coreFile.path)
          return
        }
      }
    } catch (err) {
      if (currentQueue === diffQueueRef.current) {
        setError(err instanceof Error ? err.message : String(err))
        setComparing(false)
      }
    }
  }

  const sortedFiles = useMemo(() => {
    if (!result) return []
    const files = [...result.files]
    switch (sortMode) {
      case 'size':
        files.sort((a, b) => (b.oldSize + b.newSize) - (a.oldSize + a.newSize))
        break
      case 'name':
        files.sort((a, b) => a.path.localeCompare(b.path))
        break
      case 'default':
      default: {
        const statusOrder = { modified: 0, added: 1, removed: 2, unchanged: 3 }
        files.sort((a, b) => statusOrder[a.status] - statusOrder[b.status] || a.path.localeCompare(b.path))
        break
      }
    }
    return files
  }, [result, sortMode])

  const selectedDiff = useMemo(() =>
    sortedFiles.find((f) => f.path === selectedFile) ?? null
  , [sortedFiles, selectedFile])

  const changedFiles = useMemo(() =>
    sortedFiles.filter((f) => f.status !== 'unchanged')
  , [sortedFiles])

  const statusChip = (status: FileDiffResult['status']) => {
    switch (status) {
      case 'modified':
        return (
          <Chip size="sm" color="warning" variant="soft" className="text-[10px] h-5">
            修改
          </Chip>
        )
      case 'added':
        return (
          <Chip size="sm" color="success" variant="soft" className="text-[10px] h-5">
            新增
          </Chip>
        )
      case 'removed':
        return (
          <Chip size="sm" color="danger" variant="soft" className="text-[10px] h-5">
            删除
          </Chip>
        )
      default:
        return (
          <Chip size="sm" color="default" variant="soft" className="text-[10px] h-5">
            未变
          </Chip>
        )
    }
  }

  return (
    <div
      className="h-screen flex flex-col overflow-hidden"
      style={{ backgroundColor: isDark ? '#0d1117' : '#ffffff' }}
    >
      {/* 顶部控制栏 */}
      <div
        className="shrink-0 px-6 py-4 flex flex-wrap items-end gap-4"
        style={{
          backgroundColor: isDark ? '#161b22' : '#f6f8fa',
          borderBottom: `1px solid ${isDark ? 'rgba(48, 54, 61, 0.6)' : 'rgba(208, 215, 222, 0.8)'}`
        }}
      >
        {isMobile && result && (
          <Button
            size="sm"
            variant="ghost"
            onPress={() => setSidebarOpen(!sidebarOpen)}
            className="px-2 min-w-0 font-medium"
            style={{ color: isDark ? '#c9d1d9' : '#1f2328' }}
          >
            {sidebarOpen ? '✕' : '☰'}
          </Button>
        )}
        <div>
          <label className="block text-xs font-medium mb-1" style={{ color: isDark ? '#8b949e' : '#656d76' }}>
            旧版本
          </label>
          <Autocomplete
            value={oldVersion}
            onChange={(key) => setOldVersion(String(key ?? ''))}
            isDisabled={loadingVersions}
            className="w-40"
            placeholder="选择版本"
            selectionMode="single"
            aria-label="旧版本"
          >
            <Autocomplete.Trigger>
              <Autocomplete.Value />
              <Autocomplete.Indicator />
            </Autocomplete.Trigger>
            <Autocomplete.Popover>
              <Autocomplete.Filter filter={contains}>
                <ListBox>
                  {versions.map((v) => (
                    <ListBox.Item key={v} id={v} textValue={v}>
                      {v}
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Autocomplete.Filter>
            </Autocomplete.Popover>
          </Autocomplete>
        </div>

        <div>
          <label className="block text-xs font-medium mb-1" style={{ color: isDark ? '#8b949e' : '#656d76' }}>
            新版本
          </label>
          <Autocomplete
            value={newVersion}
            onChange={(key) => setNewVersion(String(key ?? ''))}
            isDisabled={loadingVersions}
            className="w-40"
            placeholder="选择版本"
            selectionMode="single"
            aria-label="新版本"
          >
            <Autocomplete.Trigger>
              <Autocomplete.Value />
              <Autocomplete.Indicator />
            </Autocomplete.Trigger>
            <Autocomplete.Popover>
              <Autocomplete.Filter filter={contains}>
                <ListBox>
                  {versions.map((v) => (
                    <ListBox.Item key={v} id={v} textValue={v}>
                      {v}
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Autocomplete.Filter>
            </Autocomplete.Popover>
          </Autocomplete>
        </div>

        <div>
          <label className="block text-xs font-medium mb-1" style={{ color: isDark ? '#8b949e' : '#656d76' }}>
            对比精度
          </label>
          <div className="flex gap-1">
            <button
              onClick={() => setDiffGranularity('word')}
              className="px-2 py-1 text-xs rounded transition-colors"
              style={{
                backgroundColor: diffGranularity === 'word'
                  ? (isDark ? 'rgba(48, 54, 61, 0.6)' : 'rgba(208, 215, 222, 0.6)')
                  : 'transparent',
                color: diffGranularity === 'word'
                  ? (isDark ? '#c9d1d9' : '#1f2328')
                  : (isDark ? '#8b949e' : '#656d76')
              }}
            >
              单词
            </button>
            <button
              onClick={() => setDiffGranularity('char')}
              className="px-2 py-1 text-xs rounded transition-colors"
              style={{
                backgroundColor: diffGranularity === 'char'
                  ? (isDark ? 'rgba(48, 54, 61, 0.6)' : 'rgba(208, 215, 222, 0.6)')
                  : 'transparent',
                color: diffGranularity === 'char'
                  ? (isDark ? '#c9d1d9' : '#1f2328')
                  : (isDark ? '#8b949e' : '#656d76')
              }}
            >
              字符
            </button>
          </div>
        </div>

        <Button
          size="sm"
          onPress={handleCompare}
          isDisabled={comparing}
          className="font-medium bg-[#238636] text-white"
        >
          {comparing ? (
            <span className="flex items-center gap-2">
              <Spinner size="sm" className="text-white" aria-label="加载中" />
              对比中...
            </span>
          ) : '开始对比'}
        </Button>

        {result && (
          <div className="flex items-center gap-3 text-sm ml-auto">
            <span style={{ color: isDark ? '#8b949e' : '#656d76' }}>
              共 {changedFiles.length} 个文件变更
            </span>
            <span style={{ color: isDark ? '#3fb950' : '#1a7f37' }}>
              +{changedFiles.reduce((s, f) => s + f.additions, 0)}
            </span>
            <span style={{ color: isDark ? '#f85149' : '#cf222e' }}>
              −{changedFiles.reduce((s, f) => s + f.deletions, 0)}
            </span>
          </div>
        )}
      </div>

      {/* 错误提示 */}
      {error && (
        <div
          className="shrink-0 mx-6 mt-4 p-3 rounded-lg text-sm"
          style={{
            backgroundColor: isDark ? 'rgba(248, 81, 73, 0.15)' : '#ffebe9',
            color: isDark ? '#f85149' : '#cf222e'
          }}
        >
          {error}
        </div>
      )}

      {/* 主体内容 */}
      {result ? (
        <>
          {isMobile && sidebarOpen && (
            <div
              className="fixed inset-0 z-40"
              style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
              onClick={() => setSidebarOpen(false)}
            />
          )}
          <div className="flex flex-1 overflow-hidden relative">
            {/* 左侧文件列表 */}
            <div
              className={`shrink-0 flex flex-col ${isMobile ? 'fixed inset-y-0 left-0 z-50 w-72' : 'w-72'}`}
              style={{
                backgroundColor: isDark ? '#0d1117' : '#ffffff',
                borderRight: `1px solid ${isDark ? 'rgba(48, 54, 61, 0.4)' : 'rgba(208, 215, 222, 0.6)'}`,
                transform: isMobile && !sidebarOpen ? 'translateX(-100%)' : undefined,
                transition: isMobile ? 'transform 0.2s ease' : undefined
              }}
            >
            {/* 文件列表头部 */}
            <div
              className="shrink-0 px-3 py-2 flex items-center justify-between"
              style={{
                backgroundColor: isDark ? '#161b22' : '#f6f8fa',
                color: isDark ? '#8b949e' : '#656d76',
                borderBottom: `1px solid ${isDark ? 'rgba(48, 54, 61, 0.4)' : 'rgba(208, 215, 222, 0.6)'}`
              }}
            >
              <span className="text-xs font-medium">
                文件列表 ({result.files.length})
              </span>
              <div className="flex items-center gap-1">
                {(['size', 'name', 'default'] as SortMode[]).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setSortMode(mode)}
                    className="px-2 py-0.5 text-[10px] rounded transition-colors"
                    style={{
                      backgroundColor: sortMode === mode
                        ? (isDark ? 'rgba(48, 54, 61, 0.6)' : 'rgba(208, 215, 222, 0.6)')
                        : 'transparent',
                      color: sortMode === mode
                        ? (isDark ? '#c9d1d9' : '#1f2328')
                        : (isDark ? '#8b949e' : '#656d76')
                    }}
                  >
                    {mode === 'size' ? '大小' : mode === 'name' ? '名称' : '默认'}
                  </button>
                ))}
              </div>
            </div>

            {/* 文件列表内容 - 可滚动，隐藏滚动条 */}
            <div
              className="flex-1 overflow-y-auto"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              <style jsx>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              <div className="py-1">
                {sortedFiles.map((file) => (
                  <button
                    key={file.path}
                    onClick={() => {
                      setSelectedFile(file.path)
                      if (isMobile) setSidebarOpen(false)
                    }}
                    className="w-full text-left px-3 py-2 flex items-center gap-2 transition-colors hover:opacity-80"
                    style={{
                      backgroundColor: selectedFile === file.path
                        ? (isDark ? 'rgba(48, 54, 61, 0.4)' : 'rgba(208, 215, 222, 0.4)')
                        : 'transparent'
                    }}
                  >
                    <span className="text-xs truncate flex-1" style={{ color: isDark ? '#c9d1d9' : '#1f2328' }}>
                      {file.path}
                    </span>
                    <span className="text-[10px] shrink-0" style={{ color: isDark ? '#6e7681' : '#9ca3af' }}>
                      {formatBytes(file.oldSize + file.newSize)}
                    </span>
                    {selectedFile === file.path && file.status !== 'unchanged' && file.rows.length === 0 && (
                      <Spinner size="sm" className="shrink-0" style={{ color: isDark ? '#8b949e' : '#656d76' }} aria-label="加载中" />
                    )}
                    {statusChip(file.status)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 右侧 diff 内容 */}
          <div className="flex-1">
            {selectedDiff ? (
              <CodeDiffViewer data={selectedDiff} isDark={isDark} />
            ) : (
              <div className="flex items-center justify-center h-full text-sm" style={{ color: isDark ? '#8b949e' : '#656d76' }}>
                请从左侧选择一个文件
              </div>
            )}
          </div>
        </div>
      </>
      ) : comparing ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <ProgressCircle isIndeterminate aria-label="加载中" color="success">
            <ProgressCircle.Track>
              <ProgressCircle.TrackCircle />
              <ProgressCircle.FillCircle />
            </ProgressCircle.Track>
          </ProgressCircle>
          <span className="text-sm" style={{ color: isDark ? '#8b949e' : '#656d76' }}>
            正在下载并对比版本...
          </span>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-sm" style={{ color: isDark ? '#8b949e' : '#656d76' }}>
          选择两个版本并点击「开始对比」
        </div>
      )}
    </div>
  )
}
