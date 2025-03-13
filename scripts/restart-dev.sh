#!/bin/bash

# restart-dev.sh
# This script restarts the Next.js development server with a clean environment
# It clears the port, removes .next cache, and restarts the server

echo "=== Next.js Development Server Restart Utility ==="

# Kill any processes on ports 3000/3001
echo "Cleaning up ports..."
./scripts/clean-ports.sh

# Clear Next.js cache
echo "Removing .next cache directory..."
rm -rf .next

# Clear browser cache note
echo "NOTE: You may also need to clear your browser cache to resolve favicon issues."
echo "      For Chrome: Open DevTools > Network tab > Check 'Disable cache'"

# Starting development server
echo "Starting Next.js development server..."
echo "Press Ctrl+C to stop the server when finished."
echo ""

# Set environment variable to skip watching config
export NEXT_SKIP_WATCHING_CONFIG=true

# Start the development server
npm run dev

echo "Development server stopped." 