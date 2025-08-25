import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { siteConfig } from "@/config/site";
import Script from 'next/script';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter'
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: `Take Care of Shadow Milk - Play Free Virtual Pet Game Online | ${siteConfig.domain}`,
  description: siteConfig.description,
  keywords: siteConfig.metadata.keywords,
  openGraph: {
    title: `Take Care of Shadow Milk - Ultimate Virtual Pet Simulator Online Free`,
    description: siteConfig.description,
    type: 'website',
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.images.og,
        alt: `${siteConfig.name} Screenshot`,
      }
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Take Care of Shadow Milk - Virtual Pet Game',
    description: 'Play free virtual pet simulator featuring Shadow Milk Cookie online',
    images: [siteConfig.images.og],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en">
      <head>
        {/* 性能优化 meta 标签 */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        
        {/* SEO优化 meta 标签 */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="google" content="notranslate" />
        <meta name="language" content="English" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="1 day" />
        
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//turbowarp.org" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        <link rel="apple-touch-icon" sizes="180x180" href={siteConfig.images.icon.apple} />
        <link rel="icon" type="image/png" sizes="32x32" href={siteConfig.images.icon.favicon32} />
        <link rel="icon" type="image/png" sizes="16x16" href={siteConfig.images.icon.favicon16} />
        <link rel="manifest" href={siteConfig.metadata.manifestPath} />
        {/* <link rel="mask-icon" href={siteConfig.images.icon.safari} color="#5bbad5" /> */}
        <link rel="shortcut icon" href={siteConfig.images.icon.favicon} />
        <meta name="theme-color" content={siteConfig.metadata.themeColor} />
        
        {/* Error Handlers */}
        <script src="/assets/js/global-error-suppression.js" defer></script>
        <script src="/assets/js/iframe-error-handler.js" defer></script>
        
        {/* Google Analytics - 只在有GA ID时加载 */}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

