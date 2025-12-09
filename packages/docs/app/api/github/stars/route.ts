import { NextResponse } from 'next/server'

const GITHUB_REPO = 'ikenxuan/karin-plugin-kkk'
const CACHE_DURATION = 3600 // 1 hour

export async function GET () {
  try {
    const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}`, {
      next: { revalidate: CACHE_DURATION },
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        // Optional: Add GITHUB_TOKEN if configured in env
        ...(process.env.GITHUB_TOKEN && { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` })
      }
    })

    if (!res.ok) {
      if (res.status === 403 || res.status === 429) {
        // Return a fallback or the error, handled by client
        return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 })
      }
      return NextResponse.json({ error: 'GitHub API error' }, { status: res.status })
    }

    const data = await res.json()
    return NextResponse.json({ stars: data.stargazers_count })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
