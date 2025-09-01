#!/bin/bash
# 部署测试脚本 / Deployment Test Script

echo "🚀 Starting deployment test..."
echo "开始部署测试..."

# Set production environment
export NODE_ENV=production
export ENABLE_ADMIN=false

echo "📦 Building for production..."
echo "正在构建生产版本..."

# Run build
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "构建成功!"
    
    echo "🔍 Checking build output..."
    echo "检查构建输出..."
    
    # Check if .next directory exists and has content
    if [ -d ".next" ]; then
        echo "✅ .next directory created"
        echo ".next目录已创建"
    else
        echo "❌ .next directory missing"
        echo ".next目录缺失"
        exit 1
    fi
    
    echo "📊 Build statistics:"
    echo "构建统计:"
    ls -la .next/
    
    echo ""
    echo "🎉 Deployment test completed successfully!"
    echo "部署测试成功完成!"
    echo ""
    echo "📋 Next steps for Vercel deployment:"
    echo "Vercel部署的下一步:"
    echo "1. Push code to Git repository / 推送代码到Git仓库"
    echo "2. Connect to Vercel / 连接到Vercel"
    echo "3. Set environment variables / 设置环境变量"
    echo "4. Deploy / 部署"
    
else
    echo "❌ Build failed!"
    echo "构建失败!"
    exit 1
fi