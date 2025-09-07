import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import HydrationErrorBoundary from '@/components/HydrationErrorBoundary'
import HydrationFix from '@/components/HydrationFix'
import SafePreloadManager from '@/components/optimization/SafePreloadManager'
import SafeAnalytics from '@/components/SafeAnalytics'
import SafeVerificationTags from '@/components/SafeVerificationTags'
import SafeCustomHeadTags from '@/components/SafeCustomHeadTags'
import { SeoService } from '@/lib/seo-service'
import './globals.css'

// "Simplicity is the ultimate sophistication." - Leonardo (Linus would approve)
export async function generateMetadata(): Promise<Metadata> {
  return SeoService.generateMetadata()
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="format-detection" content="telephone=no" />
        
        <SafeAnalytics />
        <SafeVerificationTags />
        <SafeCustomHeadTags />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/api/seo" as="fetch" crossOrigin="anonymous" />
        <link rel="prefetch" href="/api/homepage" as="fetch" crossOrigin="anonymous" />
        
        {/* Resource hints for performance */}
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
        <meta name="color-scheme" content="light" />
        <meta name="theme-color" content="#475569" />
        
        {/* 关键CSS内联 - 减少CLS */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html, body { 
                margin: 0; 
                padding: 0; 
                font-display: swap;
                -webkit-text-size-adjust: 100%;
                text-rendering: optimizeLegibility;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
              }
              .max-w-7xl { max-width: 80rem; }
              .mx-auto { margin-left: auto; margin-right: auto; }
              .px-4 { padding-left: 1rem; padding-right: 1rem; }
              .py-6 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
              .mb-8 { margin-bottom: 2rem; }
              .mt-12 { margin-top: 3rem; }
              .aspect-ratio-4-3 { aspect-ratio: 4/3; }
              footer { height: auto; min-height: 200px; }
              .font-sans { font-display: swap; }
              img { 
                max-width: 100%; 
                height: auto;
                image-rendering: -webkit-optimize-contrast;
                image-rendering: crisp-edges;
              }
              .grid { display: grid; }
              .grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
              .grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
              @media (min-width: 640px) {
                .sm\\:grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
              }
              @media (min-width: 768px) {
                .md\\:grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
              }
              * { will-change: auto; }
              .group:hover .group-hover\\:scale-105 {
                transform: scale(1.05);
              }
              
              /* Critical CSS for CLS prevention */
              .bg-white { background-color: #ffffff; }
              .border-b { border-bottom-width: 1px; }
              .border-gray-200 { border-color: #e5e7eb; }
              .text-center { text-align: center; }
              .text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
              .font-bold { font-weight: 700; }
              .text-gray-800 { color: #1f2937; }
              .gap-4 { gap: 1rem; }
              .gap-6 { gap: 1.5rem; }
              .flex { display: flex; }
              .items-center { align-items: center; }
              .justify-between { justify-content: space-between; }
              .h-full { height: 100%; }
              .w-full { width: 100%; }
              .rounded-lg { border-radius: 0.5rem; }
              .overflow-hidden { overflow: hidden; }
              .aspect-\\[4\\/3\\] { aspect-ratio: 4/3; }
              
              /* Layout skeleton to prevent CLS */
              .header-skeleton { height: 60px; }
              .footer-skeleton { height: 200px; }
              .h1-skeleton { height: 60px; }
              
              /* Prevent layout shift from images */
              img[loading="lazy"] {
                content-visibility: auto;
                contain-intrinsic-size: 300px 225px;
              }
            `,
          }}
        />
      </head>
      <body 
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}
        suppressHydrationWarning={true}
      >
        <div id="__next" suppressHydrationWarning={true}>
          <HydrationErrorBoundary>
            <HydrationFix />
            <SafePreloadManager />
            {children}
          </HydrationErrorBoundary>
        </div>
      </body>
    </html>
  )
}