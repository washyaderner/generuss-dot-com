'use client'

import { useEffect, useState } from 'react'

export default function MetadataDebug() {
  const [metaTags, setMetaTags] = useState<string[]>([])

  useEffect(() => {
    // Get all meta tags
    const tags = Array.from(document.getElementsByTagName('meta')).map(tag => {
      const attrs = Array.from(tag.attributes).map(attr => `${attr.name}="${attr.value}"`).join(' ')
      return `<meta ${attrs}>`
    })

    setMetaTags(tags)
  }, [])

  return (
    <div className="mt-8 p-6 bg-gray-900 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Current Meta Tags</h2>
      <pre className="bg-black p-4 rounded overflow-x-auto text-sm text-gray-300">
        {metaTags.map((tag, i) => (
          <div key={i}>{tag}</div>
        ))}
      </pre>
    </div>
  )
} 