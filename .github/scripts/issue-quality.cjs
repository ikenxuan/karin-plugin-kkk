'use strict'

const QUALITY_COMMENT_MARKER = '<!-- kkk-issue-quality-check -->'

const GENERIC_ANSWERS = new Set(
  [
    'no response',
    'none',
    'n/a',
    'na',
    'nil',
    'null',
    'test',
    'testing',
    '测试',
    '无',
    '没有',
    '暂无',
    '不知道',
    '不清楚',
    '如题',
    '同上',
    '见图',
    '看图',
    '如图',
    '*',
    '-',
    '.',
    '。',
    '?',
    '？'
  ].map(normalizeComparable)
)

const ISSUE_RULES = {
  bug: {
    checkedCount: 5,
    sections: [
      ['问题类型', 2],
      ['涉及平台', 2],
      ['问题描述', 20],
      ['复现步骤', 12],
      ['实际结果与完整日志', 12, true],
      ['预期行为', 8],
      ['相关配置', 8],
      ['运行环境', 20],
      ['复现频率', 2]
    ],
    duplicateGroups: [['问题描述', '复现步骤', '实际结果与完整日志']]
  },
  feature: {
    checkedCount: 4,
    sections: [
      ['建议类型', 2],
      ['涉及平台', 2],
      ['需求背景', 20],
      ['功能建议', 20],
      ['使用场景', 16],
      ['现有方案与不足', 12],
      ['预期受益范围', 2]
    ],
    duplicateGroups: [['需求背景', '功能建议', '使用场景', '现有方案与不足']]
  }
}

/**
 * 将 Issue Form 生成的三级标题解析为字段映射，便于对编辑后的正文再次检查。
 *
 * @param {string} body Issue 正文
 * @returns {Map<string, string>} 标题到字段内容的映射
 */
function parseSections(body) {
  const sections = new Map()
  const headingPattern = /^###\s+(.+?)\s*$/gm
  const headings = [...String(body || '').matchAll(headingPattern)]

  for (let index = 0; index < headings.length; index += 1) {
    const heading = headings[index]
    const nextHeading = headings[index + 1]
    const start = heading.index + heading[0].length
    const end = nextHeading ? nextHeading.index : body.length
    sections.set(heading[1].trim(), body.slice(start, end).trim())
  }

  return sections
}

/**
 * 检查标题和关键字段是否包含足以进入维护队列的信息。
 * 这里只判断内容完整性，不判断 Issue 描述的结论是否正确。
 *
 * @param {{ title?: string, body?: string, labels?: Array<string | { name?: string }> }} issue GitHub Issue 数据
 * @returns {{ kind: 'bug' | 'feature' | null, problems: string[] }} 检查结果
 */
function validateIssue(issue) {
  const kind = detectIssueKind(issue)
  if (!kind) return { kind: null, problems: [] }

  const problems = []
  const sections = parseSections(issue.body || '')
  if (!isCurrentForm(kind, issue.body || '', sections)) return { kind, problems }

  const title = stripTitlePrefix(issue.title || '')

  if (!isMeaningful(title, 8) || isGenericAnswer(title)) {
    problems.push('标题过短或过于笼统：请写清“涉及对象 + 具体异常/目标”，不要只写“报错”“如图”或“无法使用”')
  }

  const confirmation = sections.get('提交前确认') || ''
  const checkedCount = (confirmation.match(/^- \[x\]/gim) || []).length
  if (checkedCount < ISSUE_RULES[kind].checkedCount) {
    problems.push('「提交前确认」未完整保留或勾选，请重新核对模板中的全部确认项')
  }

  for (const [sectionName, minimumLength, allowAttachment = false] of ISSUE_RULES[kind].sections) {
    const answer = sections.get(sectionName) || ''
    if (!isMeaningful(answer, minimumLength, allowAttachment)) {
      problems.push(`「${sectionName}」信息不足：请填写具体内容，不要使用“无”“如图”“test”或符号占位`)
    }
  }

  for (const group of ISSUE_RULES[kind].duplicateGroups) {
    const duplicates = findDuplicateSections(sections, group)
    if (duplicates.length > 0) {
      problems.push(`以下字段内容完全重复：${duplicates.join('、')}。请分别说明问题、步骤和期望，不要复制同一句话`)
    }
  }

  if (kind === 'bug') validateEnvironment(sections.get('运行环境') || '', problems)

  return { kind, problems }
}

/**
 * 生成由工作流维护的唯一提示评论。工作流会更新这条评论，避免每次编辑都产生新通知。
 *
 * @param {string} login Issue 作者
 * @param {string[]} problems 检出的问题
 * @returns {string} 评论正文
 */
function buildQualityComment(login, problems) {
  return `${QUALITY_COMMENT_MARKER}
### Issue 信息完整性检查未通过

@${login}，自动检查发现当前内容还不足以进入问题或需求评审：

${problems.map((problem) => `- ${problem}`).join('\n')}

请直接**编辑 Issue 正文**补充上述信息，不要把关键内容零散追加在评论区。编辑后工作流会自动重新检查；通过后会移除 \`needs-info\` 标签和本提示。

> 此检查只判断信息是否完整，不判断问题是否真实或需求是否会被接受。超过 **7 天**仍未补充且无新活动的 Issue 可能被自动关闭。
>
> 提交前可参考：[《提问的智慧》](https://github.com/ryanhanwu/How-To-Ask-Questions-The-Smart-Way) · [《如何向开源社区提问题》](https://github.com/seajs/seajs/issues/545) · [《如何有效地报告 Bug》](http://www.chiark.greenend.org.uk/%7Esgtatham/bugs-cn.html)
`
}

function detectIssueKind(issue) {
  const labels = (issue.labels || [])
    .map((label) => (typeof label === 'string' ? label : label.name || ''))
    .map((label) => label.toLowerCase())
  if (labels.includes('bug') || /^\s*(?:\[?bug\]?|🐛)/i.test(issue.title || '')) return 'bug'
  if (labels.includes('enhancement') || /^\s*(?:\[?(?:feature|feature request)\]?|🚀)/i.test(issue.title || '')) return 'feature'
  return null
}

// 旧版 Issue 在后续编辑时不应被新规则误判；新表单同时用隐藏标记和独有字段识别。
function isCurrentForm(kind, body, sections) {
  if (body.includes(`<!-- kkk-issue-form: ${kind}-v2 -->`)) return true
  if (kind === 'bug') return sections.has('问题类型') && sections.has('运行环境') && sections.has('复现频率')
  return sections.has('建议类型') && sections.has('需求背景') && sections.has('预期受益范围')
}

function stripTitlePrefix(title) {
  return String(title)
    .replace(/^\s*(?:\[?\s*🐛?\s*bug\s*\]?|\[?\s*🚀?\s*feature(?:\s+request)?\s*\]?)\s*[:：-]?\s*/i, '')
    .trim()
}

function isMeaningful(answer, minimumLength, allowAttachment = false) {
  if (!answer || isGenericAnswer(answer)) return false
  if (allowAttachment && hasAttachment(answer)) return true
  return meaningfulLength(answer) >= minimumLength
}

function meaningfulLength(value) {
  return [
    ...String(value)
      .replace(/<!--[^]*?-->/g, ' ')
      .replace(/!\[[^\]]*\]\([^)]*\)/g, ' attachment ')
      .replace(/<img\b[^>]*>/gi, ' attachment ')
      .replace(/https?:\/\/\S+/gi, ' link ')
      .replace(/[`*_>#|~[\](){}-]/g, ' ')
      .replace(/\s+/g, '')
  ].length
}

function normalizeComparable(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/_no response_/g, 'no response')
    .replace(/[^\p{L}\p{N}]+/gu, '')
}

function isGenericAnswer(value) {
  const normalized = normalizeComparable(value)
  if (!normalized || GENERIC_ANSWERS.has(normalized)) return true
  return /^(?:见|如|看)?(?:上|下)?图(?:所示)?$|^(?:报错|出错|有问题|无法使用|解析失败|不工作|坏了)$/u.test(normalized)
}

function hasAttachment(value) {
  return /github\.com\/user-attachments|!\[[^\]]*\]\([^)]*\)|<img\b|```|\.(?:log|txt|json|zip)(?:\)|\s|$)/i.test(value)
}

function findDuplicateSections(sections, names) {
  const seen = new Map()
  const duplicates = new Set()

  for (const name of names) {
    const answer = sections.get(name) || ''
    if (!isMeaningful(answer, 8)) continue
    const normalized = normalizeComparable(answer)
    const firstName = seen.get(normalized)
    if (firstName) {
      duplicates.add(firstName)
      duplicates.add(name)
    } else {
      seen.set(normalized, name)
    }
  }

  return [...duplicates]
}

function validateEnvironment(environment, problems) {
  const fields = [
    { name: '插件版本', aliases: ['插件版本'], version: true },
    { name: 'Karin 版本', aliases: ['karin 版本'], version: true },
    { name: 'Node.js 版本', aliases: ['node.js 版本', 'node 版本'], version: true },
    { name: '操作系统', aliases: ['操作系统'] },
    { name: '适配器 / 协议端', aliases: ['适配器 / 协议端', '适配器/协议端'] },
    { name: '安装方式', aliases: ['安装方式'] }
  ]

  for (const field of fields) {
    const value = findEnvironmentValue(environment, field.aliases)
    if (!value || isGenericAnswer(value)) {
      problems.push(`「运行环境」中的“${field.name}”未填写，请提供实际值`)
      continue
    }

    if (field.version && !/(?:v?\d+\.\d+(?:\.\d+)?|[0-9a-f]{7,40})/i.test(value)) {
      problems.push(`「运行环境」中的“${field.name}”应填写具体版本号，不要写“最新”“默认”或“不清楚”`)
    }
  }
}

function findEnvironmentValue(environment, aliases) {
  for (const line of String(environment).split(/\r?\n/)) {
    const normalizedLine = line.toLowerCase()
    if (!aliases.some((alias) => normalizedLine.includes(alias))) continue
    const match = line.match(/[：:]\s*(.+?)\s*$/)
    return match ? match[1].trim() : ''
  }
  return ''
}

module.exports = {
  QUALITY_COMMENT_MARKER,
  buildQualityComment,
  parseSections,
  validateIssue
}
