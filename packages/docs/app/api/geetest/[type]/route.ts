import { NextRequest } from 'next/server';

const GEETEST_API_BASE = 'https://www.geetest.com/demo/gt';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ type: string }> }
) {
  const { type } = await params;
  
  // 支持的类型: register-fullpage, register-slide, register-click, register-icon
  const validTypes = ['register-fullpage', 'register-slide', 'register-click', 'register-icon'];
  
  if (!validTypes.includes(type)) {
    return new Response(JSON.stringify({ error: 'Invalid type' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const timestamp = request.nextUrl.searchParams.get('t') || Date.now();
    const response = await fetch(`${GEETEST_API_BASE}/${type}?t=${timestamp}`);
    const data = await response.json();
    
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch geetest params' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
