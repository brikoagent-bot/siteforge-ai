#!/bin/bash

# Test script for the demo generator

echo "🧪 Testing SiteForge AI Demo Generator"
echo "======================================"
echo ""

# Test 1: Generate Zavva Holdings demo
echo "Test 1: Generating Zavva Holdings demo..."
node generate-demo.js "Zavva Holdings" --config-only
if [ -f "configs/zavva-holdings.json" ]; then
  echo "✅ Config file created successfully"
else
  echo "❌ Config file not found"
  exit 1
fi
echo ""

# Test 2: Verify config structure
echo "Test 2: Verifying config structure..."
if grep -q "\"business_name\": \"Zavva Holdings\"" configs/zavva-holdings.json && \
   grep -q "\"category\": \"contractor\"" configs/zavva-holdings.json && \
   grep -q "\"phone\": \"+1 7282193918\"" configs/zavva-holdings.json && \
   grep -q "\"demo_mode\": true" configs/zavva-holdings.json; then
  echo "✅ Config structure is correct"
else
  echo "❌ Config structure validation failed"
  exit 1
fi
echo ""

# Test 3: Check server files
echo "Test 3: Checking server files..."
required_files=(
  "generate-demo.js"
  "generate-all-demos.js"
  "serve-demo.js"
  "content-templates.js"
  "package.json"
  "README.md"
)

for file in "${required_files[@]}"; do
  if [ -f "$file" ]; then
    echo "✅ Found: $file"
  else
    echo "❌ Missing: $file"
    exit 1
  fi
done
echo ""

# Test 4: Start server (background) and test HTTP
echo "Test 4: Testing server startup..."
PORT=3099 node serve-demo.js &
SERVER_PID=$!
sleep 2

# Check if server is responding
if curl -s http://localhost:3099/ > /dev/null; then
  echo "✅ Server is responding on port 3099"
else
  echo "❌ Server not responding"
  kill $SERVER_PID 2>/dev/null
  exit 1
fi

# Test demo page
if curl -s http://localhost:3099/demo/zavva-holdings | grep -q "Zavva Holdings"; then
  echo "✅ Demo page is working"
else
  echo "❌ Demo page not working"
  kill $SERVER_PID 2>/dev/null
  exit 1
fi

# Clean up
kill $SERVER_PID 2>/dev/null
echo ""

echo "======================================"
echo "✅ All tests passed!"
echo ""
echo "To start the demo server:"
echo "  PORT=3002 node serve-demo.js"
echo ""
echo "Then visit:"
echo "  http://localhost:3002/"
echo "  http://localhost:3002/demo/zavva-holdings"
