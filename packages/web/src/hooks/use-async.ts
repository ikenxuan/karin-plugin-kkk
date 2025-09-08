import { useCallback, useState } from 'react'

/**
 * 异步操作Hook
 * @description 提供通用的异步操作状态管理
 * @returns 包含执行方法、加载状态、错误信息和清除错误方法的对象
 */
export const useAsync = <T>() => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<T | null>(null)

  /**
   * 执行异步操作
   * @param asyncFn - 要执行的异步函数
   * @returns 返回异步操作的结果
   */
  const execute = useCallback(async (asyncFn: () => Promise<T>): Promise<T> => {
    setLoading(true)
    setError(null)

    try {
      const result = await asyncFn()
      setData(result)
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '未知错误'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  /**
   * 清除错误信息
   * @description 重置错误状态为null
   */
  const clearError = useCallback(() => setError(null), [])

  /**
   * 重置所有状态
   * @description 重置加载状态、错误信息和数据
   */
  const reset = useCallback(() => {
    setLoading(false)
    setError(null)
    setData(null)
  }, [])

  return {
    loading,
    error,
    data,
    execute,
    clearError,
    reset
  }
}
