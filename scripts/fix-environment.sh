#!/bin/bash

# fix-environment.sh
# Master script that runs all environment fix operations

echo "=== Development Environment Fix Utility ==="
echo "This script will fix common issues with your development environment."
echo ""

# Create .env.local file if it doesn't exist
if [ ! -f ".env.local" ] || ! grep -q "NEXT_SKIP_WATCHING_CONFIG=true" ".env.local"; then
    echo "Creating/updating .env.local file..."
    echo "NEXT_SKIP_WATCHING_CONFIG=true" >> .env.local
    echo "Added NEXT_SKIP_WATCHING_CONFIG=true to .env.local"
fi

# Run port cleanup
echo "Running port cleanup..."
./scripts/clean-ports.sh

# Run favicon fix
echo "Fixing favicon files..."
./scripts/create-favicon-files.sh

# Clear Next.js cache
echo "Clearing Next.js cache..."
rm -rf .next
echo "Next.js cache cleared."

# Print instructions
echo ""
echo "=== Fix Complete ==="
echo "The following actions have been performed:"
echo "1. Created/updated .env.local to prevent config file watching issues"
echo "2. Cleaned up processes on ports 3000 and 3001"
echo "3. Created placeholder favicon files if missing"
echo "4. Cleared Next.js cache"
echo ""
echo "Next steps:"
echo "1. To restart the development server: ./scripts/restart-dev.sh"
echo "2. Read docs/COMMON_ISSUES.md for more information on common issues"
echo "3. Replace placeholder favicon files with proper ones"
echo ""
echo "If you continue to experience issues, please check the documentation"
echo "or contact your team lead for assistance." 