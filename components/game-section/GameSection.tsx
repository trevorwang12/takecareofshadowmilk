'use client';

import { useState, useRef, useEffect } from 'react';
import { content as defaultContent } from "@/config/content";
import { theme } from "@/config/theme";
import { layout } from "@/config/layout";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface GameSectionProps {
  content?: typeof defaultContent;
}

export function GameSection({ content = defaultContent }: GameSectionProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Listen for fullscreen changes to update state
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    // Handle postMessage errors and suppress console spam
    const handleMessage = (event: MessageEvent) => {
      // Suppress all postMessage errors to prevent console spam
      event.stopPropagation();
    };

    // Override console.error temporarily to suppress iframe-related errors
    const originalError = console.error;
    const suppressError = (...args: any[]) => {
      const message = args.join(' ');
      if (message.includes('postMessage') || 
          message.includes('target origin') || 
          message.includes('sandboxed') ||
          message.includes('cookie')) {
        return; // Suppress these specific errors
      }
      originalError.apply(console, args);
    };

    // Apply error suppression
    console.error = suppressError;
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    window.addEventListener('message', handleMessage);
    
    return () => {
      // Restore original console.error
      console.error = originalError;
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  // Share functionality
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = content.gameSection.title;
  const shareText = content.gameSection.description || 'Play Take Care of Shadow Milk - Free virtual pet simulator online!';

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareToLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareToWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
    window.open(url, '_blank');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      // Could add a toast notification here
      alert('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <section
      id="game-section"
      className={cn(
        theme.gameSection.layout.section,
        theme.layout.section.scrollMargin
      )}
    >
      {layout.gameSection.isVisible.title && (
        <h2 className={cn(
          theme.gameSection.typography.title,
          theme.gameSection.spacing.title
        )}>
          {content.gameSection.title}
        </h2>
      )}

      {/* 游戏容器 - 移除圆角 */}
      <div
        ref={containerRef}
        className={cn(
          "w-full max-w-4xl mx-auto overflow-hidden shadow-xl relative",
          theme.gameSection.colors.container,
          "mb-0 rounded-none" // 移除底部边距，移除圆角
        )}
      >
        <iframe
          src={content.gameSection.game.url}
          className={cn(
            "w-full border-0",
            isFullscreen ? "h-screen" : "h-full aspect-video"
          )}
          allow="fullscreen; autoplay; storage-access"
          title={content.gameSection.game.title}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* 按钮行 - 在游戏区域下方，带暗色背景，移除上部圆角 */}
      <div className="flex justify-between items-center w-full max-w-4xl mx-auto mb-16 bg-gray-700/70 dark:bg-gray-800/70 text-white rounded-none p-2 shadow-md">
        {/* 分享按钮组 */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium mr-2">Share:</span>
          
          {/* Twitter */}
          <Button
            onClick={shareToTwitter}
            size="icon"
            variant="ghost"
            className="hover:bg-blue-500/20 text-white rounded-full p-1.5 transition-colors"
            aria-label="Share on Twitter"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </Button>

          {/* Facebook */}
          <Button
            onClick={shareToFacebook}
            size="icon"
            variant="ghost"
            className="hover:bg-blue-600/20 text-white rounded-full p-1.5 transition-colors"
            aria-label="Share on Facebook"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </Button>

          {/* WhatsApp */}
          <Button
            onClick={shareToWhatsApp}
            size="icon"
            variant="ghost"
            className="hover:bg-green-500/20 text-white rounded-full p-1.5 transition-colors"
            aria-label="Share on WhatsApp"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.892 3.488"/>
            </svg>
          </Button>

          {/* Copy Link */}
          <Button
            onClick={copyToClipboard}
            size="icon"
            variant="ghost"
            className="hover:bg-gray-500/20 text-white rounded-full p-1.5 transition-colors"
            aria-label="Copy Link"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
            </svg>
          </Button>
        </div>

        {/* 全屏按钮 */}
        <Button
          onClick={toggleFullscreen}
          size="icon"
          variant="ghost"
          className="hover:bg-white/20 text-white rounded-full p-1.5 transition-colors"
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 9L4 4m0 0l5 0M4 4l0 5" />
            <path d="M15 9l5-5m0 0h-5m5 0v5" />
            <path d="M9 15l-5 5m0 0h5m-5 0v-5" />
            <path d="M15 15l5 5m0 0v-5m0 5h-5" />
          </svg>
        </Button>
      </div>
    </section>
  );
}
