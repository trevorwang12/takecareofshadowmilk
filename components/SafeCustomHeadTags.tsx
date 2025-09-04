// 安全的自定义头部标签组件 - 支持Plausible等分析工具
import { SeoService } from '@/lib/seo-service'

export default async function SafeCustomHeadTags() {
  const customHeadTags = await SeoService.getCustomHeadTags()
  
  console.log('[DEBUG SafeCustomHeadTags] Custom head tags:', customHeadTags)
  
  if (!customHeadTags) {
    console.log('[DEBUG SafeCustomHeadTags] No custom head tags, returning null')
    return null
  }
  
  // 直接渲染 HTML 内容 - Next.js 会在 head 中正确处理 dangerouslySetInnerHTML
  console.log('[DEBUG SafeCustomHeadTags] Rendering custom head tags directly')
  
  return (
    <div 
      dangerouslySetInnerHTML={{
        __html: customHeadTags
      }}
    />
  )
}