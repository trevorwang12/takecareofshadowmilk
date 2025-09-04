// 安全的搜索引擎验证标签
import { SeoService } from '@/lib/seo-service'

export default async function SafeVerificationTags() {
  const verificationTags = await SeoService.getVerificationTags()
  
  return (
    <>
      {verificationTags.yandex && (
        <meta name="yandex-verification" content={verificationTags.yandex} />
      )}
      {verificationTags.baidu && (
        <meta name="baidu-site-verification" content={verificationTags.baidu} />
      )}
    </>
  )
}