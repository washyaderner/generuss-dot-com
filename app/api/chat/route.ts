import { NextResponse } from 'next/server'

// Get the webhook URL from environment variables
const N8N_WEBHOOK_URL = process.env.NEXT_PUBLIC_CHAT_WEBHOOK_URL || 'https://washyaderner.app.n8n.cloud/webhook/a0990d27-a439-4c02-9e49-689034981a5b/chat'

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json()
    const { message } = body
    
    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }
    
    // Generate a session ID if not provided
    const sessionId = body.sessionId || `session_${Date.now()}`
    
    // Prepare the payload for n8n
    const payload = {
      message,
      sessionId,
      timestamp: new Date().toISOString(),
      source: 'website-chat'
    }
    
    console.log(`[Chat API] Sending message to n8n webhook: "${message}" (Session: ${sessionId})`)
    
    // Send the message to n8n webhook
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    
    // Check if the request was successful
    if (!response.ok) {
      console.error(`[Chat API] Error from n8n webhook: ${response.status} ${response.statusText}`)
      throw new Error(`Error from webhook: ${response.status} ${response.statusText}`)
    }
    
    // Parse the response
    const data = await response.json()
    
    // Format the response
    // This handles different response formats from n8n
    let formattedResponse = {
      message: 'Sorry, I could not process your request.',
      sessionId
    }
    
    if (typeof data === 'string') {
      // If the response is a simple string
      formattedResponse.message = data
    } else if (data.message) {
      // If the response has a message property
      formattedResponse.message = data.message
    } else if (data.messages && Array.isArray(data.messages)) {
      // If the response has an array of messages, use the first one
      formattedResponse.message = data.messages[0]
    } else if (data.content) {
      // If the response has content property
      formattedResponse.message = data.content
    }
    
    console.log(`[Chat API] Received response from n8n webhook: "${formattedResponse.message.substring(0, 50)}${formattedResponse.message.length > 50 ? '...' : ''}"`)
    
    return NextResponse.json(formattedResponse)
  } catch (error) {
    console.error('[Chat API] Error processing message:', error)
    
    return NextResponse.json(
      { error: 'Failed to process message', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
} 