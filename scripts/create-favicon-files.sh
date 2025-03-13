#!/bin/bash

# create-favicon-files.sh
# This script checks for and creates basic favicon files if they're missing
# It creates placeholder files to prevent 404 errors

echo "=== Favicon Files Check Utility ==="
echo "Checking for missing favicon files in public directory..."

# Make sure the public directory exists
if [ ! -d "public" ]; then
    echo "Creating public directory..."
    mkdir -p public
fi

# Check and create favicon.ico if missing
if [ ! -f "public/favicon.ico" ]; then
    echo "favicon.ico is missing, creating placeholder..."
    # Create a simple 16x16 favicon.ico (you should replace this with a proper one)
    echo "Please replace with your actual favicon.ico" > public/favicon.ico
    echo "Created placeholder favicon.ico"
fi

# Check and create favicon.svg if missing
if [ ! -f "public/favicon.svg" ]; then
    echo "favicon.svg is missing, creating placeholder..."
    # Create a simple SVG favicon
    cat > public/favicon.svg << EOF
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="#4f46e5" rx="4" ry="4"/>
  <text x="16" y="22" font-family="Arial" font-size="20" text-anchor="middle" fill="white">G</text>
</svg>
EOF
    echo "Created placeholder favicon.svg"
fi

# Check and create favicon-96x96.png if missing
if [ ! -f "public/favicon-96x96.png" ]; then
    echo "favicon-96x96.png is missing, creating reminder file..."
    # Create a text file as a reminder (you can't easily create a PNG from bash)
    echo "Please create a proper 96x96 PNG favicon" > public/favicon-96x96.png
    echo "Created reminder for favicon-96x96.png"
fi

# Check and create site.webmanifest if missing
if [ ! -f "public/site.webmanifest" ]; then
    echo "site.webmanifest is missing, creating basic manifest..."
    # Create a basic web manifest
    cat > public/site.webmanifest << EOF
{
  "name": "Generuss",
  "short_name": "Generuss",
  "icons": [
    {
      "src": "/favicon-96x96.png",
      "sizes": "96x96",
      "type": "image/png"
    }
  ],
  "theme_color": "#4f46e5",
  "background_color": "#ffffff",
  "display": "standalone"
}
EOF
    echo "Created basic site.webmanifest"
fi

# Check and create apple-touch-icon.png if missing
if [ ! -f "public/apple-touch-icon.png" ]; then
    echo "apple-touch-icon.png is missing, creating reminder file..."
    # Create a text file as a reminder
    echo "Please create a proper apple-touch-icon.png (180x180)" > public/apple-touch-icon.png
    echo "Created reminder for apple-touch-icon.png"
fi

echo ""
echo "Favicon file check complete."
echo "NOTE: The placeholder files should be replaced with proper favicon files."
echo "      You may need to run 'npm run dev' with a cleared cache to see the changes." 