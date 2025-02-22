'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import MetadataDebug from './head'

export default function OGTest() {
  // Log the full URL when the component mounts (client-side)
  useEffect(() => {
    console.log('Full URL:', window.location.href)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">OpenGraph Test Page</h1>
        
        <div className="space-y-6">
          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Test Instructions</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>Copy this page&apos;s URL</li>
              <li>Test it using these tools:
                <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                  <li>
                    <a 
                      href="https://www.opengraph.xyz" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-teal-400 hover:underline"
                    >
                      OpenGraph.xyz
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://cards-dev.twitter.com/validator" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-teal-400 hover:underline"
                    >
                      Twitter Card Validator
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://developers.facebook.com/tools/debug/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-teal-400 hover:underline"
                    >
                      Facebook Debugger
                    </a>
                  </li>
                </ul>
              </li>
            </ol>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Expected Results</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Image dimensions: 1200x630</li>
              <li>Title: &quot;Generuss Blog&quot;</li>
              <li>Description present</li>
              <li>Image loads quickly</li>
              <li>No missing metadata</li>
            </ul>
          </div>

          <MetadataDebug />

          <div className="mt-8">
            <Link 
              href="/blog"
              className="inline-block bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors"
            >
              Return to Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 