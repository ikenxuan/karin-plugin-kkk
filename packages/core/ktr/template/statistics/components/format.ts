/**
 * 统计海报共用的数字格式化。
 * 逻辑取自旧版两张海报里各自复制过一份的实现，这里合并成一处，口径保持不变。
 */

/**
 * 大数字紧凑格式（1.2k / 3.4w / 1.1亿）。
 * 向下截断而不是四舍五入 —— 统计数字宁可少报也不要看起来比实际多。
 */
export const formatCompact = (num: number): string => {
  const truncate = (divisor: number, suffix: string): string => {
    const result = Math.floor(num / (divisor / 10)) / 10
    return (result % 1 === 0 ? result.toFixed(0) : result.toFixed(1)) + suffix
  }

  if (num >= 100000000) return truncate(100000000, '亿')
  if (num >= 10000) return truncate(10000, 'w')
  if (num >= 1000) return truncate(1000, 'k')
  return num.toString()
}

/** 千位分隔符 */
export const formatWithCommas = (num: number): string => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

/**
 * 占比百分比，保留一位小数。
 * @param value 分子
 * @param total 分母；为 0 时返回 '0.0'
 */
export const formatPercent = (value: number, total: number): string => (total > 0 ? ((value / total) * 100).toFixed(1) : '0.0')

/** 日期 `YYYY-MM-DD` → `MM-DD`，折线图类目轴用 */
export const formatDateShort = (date: string): string => date.substring(5)
