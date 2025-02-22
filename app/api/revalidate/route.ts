import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Verify the request has the correct secret token
    const token = request.headers.get('x-revalidate-token')
    if (token !== process.env.REVALIDATE_TOKEN) {
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      )
    }

    // Get the path to revalidate from the request body
    const { path } = await request.json()
    
    if (!path) {
      return NextResponse.json(
        { message: 'Path is required' },
        { status: 400 }
      )
    }

    // Revalidate the path
    revalidatePath(path)

    return NextResponse.json({
      revalidated: true,
      message: `Revalidated ${path}`,
      now: Date.now()
    })
  } catch (err) {
    console.error('Revalidation error:', err)
    return NextResponse.json(
      { message: 'Error revalidating', error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    )
  }
} 