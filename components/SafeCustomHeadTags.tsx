// 安全的自定义头部标签组件 - 支持Plausible等分析工具
import { SeoService } from '@/lib/seo-service'

export default async function SafeCustomHeadTags() {
  const customHeadTags = await SeoService.getCustomHeadTags()
  
  if (!customHeadTags) {
    return null
  }
  
  // 使用dangerouslySetInnerHTML渲染经过安全验证的自定义标签
  // 这些内容已经通过SeoService的安全检查
  return (
    <div
      suppressHydrationWarning={true}
      dangerouslySetInnerHTML={{ __html: customHeadTags }}
    />
  )
}