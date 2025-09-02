# 生成 Favicon 指南

## 已创建文件
- `public/favicon.svg` - SVG 版本的图标

## 生成 favicon.ico 的方法

### 方法 1: 在线转换 (推荐)
1. 访问 https://favicon.io/favicon-converter/
2. 上传 `public/favicon.svg` 文件
3. 下载生成的 `favicon.ico` 文件
4. 将文件放到 `public/favicon.ico`

### 方法 2: 使用命令行工具
```bash
# 安装 imagemagick (macOS)
brew install imagemagick

# 转换 SVG 为 ICO
convert public/favicon.svg -resize 16x16 -resize 32x32 -resize 48x48 public/favicon.ico
```

### 方法 3: 完整的 favicon 套装
访问 https://realfavicongenerator.net/
上传 SVG 文件，生成完整的 favicon 套装包括：
- favicon.ico
- apple-touch-icon.png  
- android-chrome-192x192.png
- android-chrome-512x512.png
- favicon-16x16.png
- favicon-32x32.png

## 当前图标设计说明
- 蓝色背景圆形
- 白色地球仪轮廓
- 经纬线网格
- 红色定位标记
- 符合 WorldGuessr 地理/猜测游戏主题

## 更新后需要做的
1. 生成 favicon.ico 后放到 `public/` 目录
2. 清除浏览器缓存
3. 检查网站图标是否正确显示