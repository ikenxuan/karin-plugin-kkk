import type { Route } from './+types/llms-mdx'
import { source } from '@/lib/source'
import { getLLMText } from '@/lib/get-llm-text'

export async function loader ({ params }: Route.LoaderArgs) {
  const slugs = (params['*'] ?? '').split('/').filter((v) => v.length > 0)
  console.log('[llms-mdx] slugs:', slugs)
  const page = source.getPage(slugs)
  console.log('[llms-mdx] page:', page?.url)
  if (!page) {
    throw new Response('not found', { status: 404 })
  }

  const text = await getLLMText(page)
  throw new Response(text, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  })
}