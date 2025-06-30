#!/bin/bash

# Development startup script for generuss-dot-com
# Ensures proper Node.js settings for Next.js 14 with Node 23

echo "🚀 Starting Generuss development server..."
echo "Node.js version: $(node --version)"
echo "npm version: $(npm --version)"

# Check if packages are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install --legacy-peer-deps
fi

# Start the development server with Node.js compatibility settings
echo "🔧 Starting Next.js development server..."
NODE_OPTIONS="--max-old-space-size=4096" npm run dev