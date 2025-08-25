# OG Image Generator Guide

这个指南说明如何使用 [OG Playground](https://og-playground.vercel.app/) 生成网站的社交媒体预览图片。

## 使用方法

1. 访问 [OG Playground](https://og-playground.vercel.app/)
2. 复制以下代码到编辑器中：

```jsx
<div
  style={{
    display: 'flex',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: '40px',
  }}
>
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    <img
      src="https://crazy-cattle.net/assets/img/android-chrome-512x512.png"
      width="200"
      height="200"
    />
    <h1
      style={{
        fontSize: '60px',
        fontWeight: 'bold',
        color: '#000',
        marginTop: '20px',
      }}
    >
      Crazy Cattle 3D
    </h1>
    <p
      style={{
        fontSize: '30px',
        color: '#666',
      }}
    >
      Free 3D Action Game
    </p>
  </div>
</div>
```

## 样式说明

- 整体布局：居中显示，白色背景，带40px内边距
- Logo：
  - 尺寸：200x200像素
  - 使用网站logo图片
- 标题：
  - 字体大小：60px
  - 粗体
  - 黑色(#000)
  - 上边距20px
- 副标题：
  - 字体大小：30px
  - 灰色(#666)

## 生成图片

1. 代码粘贴后会自动预览
2. 检查图片效果
3. 点击"Download"下载生成的图片
4. 将图片保存为 `crazy-cattle-3d-og-image.png`
5. 放置到 `/public/assets/img/` 目录下

## 使用位置

生成的图片用于：
- Twitter 卡片图片
- Facebook 分享预览
- 其他社交媒体预览

## Safari Pinned Tab Icon 生成（单色SVG）

如果需要生成Safari固定标签页的单色图标，可以使用以下代码：

```jsx
<div
  style={{
    display: 'flex',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'white',
  }}
>
  <img
    src="https://crazy-cattle.net/assets/img/android-chrome-512x512.png"
    width="800"
    height="800"
    style={{
      filter: 'grayscale(100%) contrast(1000%)',
    }}
  />
</div>
```

### 单色效果参数说明

- `grayscale(100%)`：将图片转换为灰度
  - 100%：完全灰度
  - 0%：保持原色
- `contrast(1000%)`：增加对比度
  - 可以调整数值来改变黑白对比效果
  - 数值越大，黑白对比越明显

### 其他可选参数

可以尝试不同的组合来获得最佳效果：
```jsx
// 温和对比度
filter: 'grayscale(100%) contrast(500%)'

// 更强对比度
filter: 'grayscale(100%) contrast(2000%)'

// 添加亮度调整
filter: 'grayscale(100%) contrast(1000%) brightness(0.8)'
```

### 注意事项

如果生成的效果不理想，可以：
1. 调整原始图片的对比度
2. 使用专业工具（如 Illustrator）直接生成SVG
3. 或暂时不使用 Safari Pinned Tab 功能

## 相关配置

在 `config/site.ts` 中已配置：
```typescript
images: {
  og: "/assets/img/crazy-cattle-3d-og-image.png"
}
```
