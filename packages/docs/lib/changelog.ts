import semver from 'semver'

export type ChangelogResult = {
  content: string
  latest: string
}

export type ChangelogData = {
  v2: ChangelogResult
  v1: ChangelogResult
  v0: ChangelogResult
  all: Array<{ version: string, content: string }>
}

/**
 * Parses changelog markdown content and extracts ranges of versions.
 */
function range ({ data, startVersion, endVersion }: { data: string, startVersion: string, endVersion: string }): ChangelogResult {
  const regex = /## \[(.*?)\]([\s\S]*?)(?=## \[|$)/g
  const changelog: Record<string, string> = {}
  for (const match of data.matchAll(regex)) {
    const version = match[1]
    const content = match[0]
    const cleanVersion = version.replace(/^v/, '').split(' ')[0]
    changelog[cleanVersion] = content
  }

  const keys = Object.keys(changelog)

  const validVersions = keys.filter(v => semver.valid(v) || semver.valid(v + '.0') || semver.valid(v + '.0.0'))

  const inRangeVersions = validVersions.filter(v => {
    const vClean = semver.clean(v) || v

    if (startVersion === '3.0.0' && endVersion === '1.999.999') {
      return semver.satisfies(vClean, '>=2.0.0 <3.0.0', { includePrerelease: true })
    }
    if (startVersion === '1.999.999' && endVersion === '0.999.999') {
      return semver.satisfies(vClean, '>=1.0.0 <2.0.0', { includePrerelease: true })
    }
    if (startVersion === '0.999.999' && endVersion === '0.0.0-fallback') {
      return semver.satisfies(vClean, '>=0.0.0 <1.0.0', { includePrerelease: true })
    }
    return semver.lte(vClean, startVersion) && semver.gt(vClean, endVersion)
  })

  inRangeVersions.sort((a, b) => semver.rcompare(a, b))

  return {
    content: inRangeVersions.map(v => changelog[v]).join('\n'),
    latest: inRangeVersions.length > 0 ? `v${inRangeVersions[0]}` : '',
  }
}

function parseAll ({ data }: { data: string }): Array<{ version: string, content: string }> {
  const regex = /## \[(.*?)\]([\s\S]*?)(?=## \[|$)/g
  const items: Array<{ version: string, content: string }> = []
  const seenVersions = new Set<string>()

  for (const match of data.matchAll(regex)) {
    const version = match[1]
    const content = match[0]
    const cleanVersion = version.replace(/^v/, '').split(' ')[0]

    // Validate version roughly
    if (semver.valid(cleanVersion) || semver.valid(cleanVersion + '.0')) {
      if (!seenVersions.has(cleanVersion)) {
        items.push({ version: cleanVersion, content })
        seenVersions.add(cleanVersion)
      }
    }
  }

  // Sort descending
  items.sort((a, b) => semver.rcompare(a.version, b.version))
  return items
}


export async function getChangelog (): Promise<ChangelogData> {
  let content = ''

  const urls = [
    'https://cdn.jsdelivr.net/npm/karin-plugin-kkk/CHANGELOG.md',
    'https://raw.githubusercontent.com/ikenxuan/karin-plugin-kkk/main/packages/core/CHANGELOG.md',
  ]

  for (const url of urls) {
    try {
      const res = await fetch(url, { next: { revalidate: 3600 } }) // Cache for 1 hour
      if (res.ok) {
        content = await res.text()
        if (content.includes('# Changelog') || content.includes('# 变更日志')) {
          break
        }
      }
    } catch (e) {
      console.error(`Failed to fetch changelog from ${url}`, e)
    }
  }

  const emptyResult = { content: '', latest: '' }
  if (!content) {
    console.warn('Failed to fetch remote CHANGELOG.md, returning empty.')
    return { v0: emptyResult, v1: emptyResult, v2: emptyResult, all: [] }
  }

  const v2 = range({
    data: content,
    startVersion: '3.0.0',
    endVersion: '1.999.999',
  })

  const v1 = range({
    data: content,
    startVersion: '1.999.999',
    endVersion: '0.999.999',
  })

  const v0 = range({
    data: content,
    startVersion: '0.999.999',
    endVersion: '0.0.0-fallback',
  })

  const all = parseAll({ data: content })

  return { v0, v1, v2, all }
}
