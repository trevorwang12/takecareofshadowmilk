"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { theme } from "@/config/theme";
import { content } from "@/config/content";
import { layout } from "@/config/layout";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface HeaderProps {
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
  onSearch?: (e: React.FormEvent) => void;
}

export function Header({ searchQuery = "", onSearchChange = () => {}, onSearch = () => {} }: HeaderProps) {
  if (!layout.header.isVisible) return null;

  // 添加路径解析
  // const pathname = usePathname(); // No longer needed for title generation
  // const isHomePage = pathname === "/"; // No longer needed for title generation

  // 格式化路径为标题 - 现在固定返回品牌名称
  const formatPathToTitle = () => {
    return content.header.title; // content.header.title is siteConfig.name
  };

  const headerClassName = cn(
    layout.header.isVisible ? "" : "hidden",
    theme.header.layout.position,
    theme.header.layout.zIndex,
    theme.header.colors.border,
    theme.header.colors.background,
    theme.header.layout.blur,
  );

  const containerClassName = cn(
    theme.header.spacing.container,
    "flex",
    theme.header.layout.height,
    "items-center justify-between",
    layout.header.container.padding
  );

  return (
    <header className={headerClassName}>
      <div className={containerClassName}>
        {/* 左侧 Logo 和标题 */}
        <div className={theme.header.layout.logo.wrapper}>
          <Link href="/">
            <img
              src={layout.header.logo.src}
              alt={content.header.title}
              className={cn(
                layout.header.logo.size,
                theme.header.layout.logo.image,
                "cursor-pointer hover:opacity-90 transition-opacity"
              )}
            />
          </Link>
          <Link href="/" className="no-underline">
            <h1 className={cn(
              layout.header.logoSize,
              "font-bold",
              theme.header.colors.text,
              theme.header.colors.hover // Apply hover effect to text as well
            )}>
              {formatPathToTitle()}
            </h1>
          </Link>
        </div>

        {/* 右侧导航和搜索 */}
        <div className={theme.header.layout.nav.wrapper}>
          <nav className={theme.header.layout.nav.list}>
            {content.header.navigation.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  theme.header.colors.text,
                  "hover:text-primary"
                )}
                onClick={(e) => {
                  e.preventDefault();
                  // 修复：在当前页面查找锚点，如果找不到才跳转到首页
                  const targetElement = document.querySelector(link.href);
                  if (targetElement) {
                    targetElement.scrollIntoView({
                      behavior: 'smooth'
                    });
                  } else {
                    // 如果当前页面没有找到目标元素，则跳转到首页对应的锚点
                    window.location.href = '/' + link.href;
                  }
                }}
              >
                {link.text}
              </a>
            ))}
          </nav>

          {layout.header.searchEnabled && (
            <form
              onSubmit={onSearch}
              className={cn("flex", layout.header.maxWidth, "items-center", theme.header.spacing.search)}
            >
              <Input
                type="search"
                placeholder={content.header.search.placeholder}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                aria-label={content.header.search.ariaLabel}
              />
              <Button
                type="submit"
                size="icon"
                aria-label={content.header.search.buttonAriaLabel}
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>
          )}
        </div>
      </div>
    </header>
  );
}
