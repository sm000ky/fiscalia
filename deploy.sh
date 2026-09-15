#!/bin/bash

echo "=========================================="
echo "  TaxQuest RPG - Deployment Script"
echo "=========================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found!"
    echo "Please run this script from taxquest-app directory"
    exit 1
fi

echo "✓ Found package.json"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ npm install failed!"
    exit 1
fi

echo "✓ Dependencies installed"
echo ""

# Build project
echo "🔨 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✓ Build successful"
echo ""

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "⚠️  Vercel CLI not found"
    echo "Installing Vercel CLI..."
    npm install -g vercel
fi

echo "✓ Vercel CLI ready"
echo ""

echo "=========================================="
echo "  Ready to Deploy!"
echo "=========================================="
echo ""
echo "Choose deployment method:"
echo ""
echo "1. Deploy to Vercel (auto):"
echo "   vercel --prod"
echo ""
echo "2. Deploy manually:"
echo "   - Upload 'dist' folder to your hosting"
echo "   - Or push to GitHub and connect to Vercel"
echo ""
echo "3. Test locally first:"
echo "   npm run dev"
echo ""
read -p "Deploy to Vercel now? (y/n): " choice

if [ "$choice" == "y" ] || [ "$choice" == "Y" ]; then
    echo ""
    echo "🚀 Deploying to Vercel..."
    vercel --prod
else
    echo ""
    echo "ℹ️  Deployment skipped. Run 'vercel --prod' manually when ready."
fi

echo ""
echo "=========================================="
echo "  Done! 🎮"
echo "=========================================="
