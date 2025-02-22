#!/usr/bin/env node

import dotenv from 'dotenv'
import fetch from 'node-fetch'

// Load environment variables
dotenv.config()

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
const REVALIDATE_TOKEN = process.env.REVALIDATE_TOKEN

if (!REVALIDATE_TOKEN) {
  console.error('Error: REVALIDATE_TOKEN environment variable is not set')
  process.exit(1)
}

async function revalidate(path: string) {
  try {
    const response = await fetch(`${SITE_URL}/api/revalidate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-revalidate-token': REVALIDATE_TOKEN
      },
      body: JSON.stringify({ path })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Revalidation failed')
    }

    console.log('✅ Success:', data.message)
    console.log('🕒 Timestamp:', new Date(data.now).toLocaleString())
  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : String(error))
    process.exit(1)
  }
}

// Get path from command line arguments
const path = process.argv[2]

if (!path) {
  console.error('Usage: npm run revalidate <path>')
  console.error('Example: npm run revalidate /blog/my-post')
  process.exit(1)
}

revalidate(path) 