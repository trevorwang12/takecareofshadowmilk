'use client';

import { content as defaultContent } from "@/config/content";
import { theme } from "@/config/theme";
import { layout } from "@/config/layout";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from 'react';
import { Gamepad as GamepadIcon, HelpCircle as HelpCircleIcon, Info as InfoIcon } from 'lucide-react';
import { ShadowMilkLogo } from './ShadowMilkLogo';

const IconMap = {
  GamepadIcon,
  HelpCircleIcon,
  InfoIcon
};

interface WhatIsProps {
  content?: typeof defaultContent;
}

export function WhatIs({ content = defaultContent }: WhatIsProps) {
  const [imageError, setImageError] = useState(false);
  const [fallbackError, setFallbackError] = useState(false);
  
  return (
    <section
      id="what-is"
      className={cn(
        theme.whatIs.layout.section,
        theme.layout.section.scrollMargin
      )}
    >
      <div className={theme.whatIs.layout.container}>
        <div className={cn(theme.whatIs.colors.card, theme.whatIs.layout.card, theme.whatIs.spacing.card)}>
          <div className={layout.whatIs.grid.columns}>
            <div className={theme.whatIs.layout.logoWrapper}>
              {imageError && fallbackError ? (
                <ShadowMilkLogo 
                  className={cn(
                    layout.whatIs.logo.size.width,
                    layout.whatIs.logo.size.height,
                    theme.whatIs.layout.logo
                  )}
                />
              ) : (
                <img
                  src={imageError && content.whatIs.logo.fallback ? content.whatIs.logo.fallback : content.whatIs.logo.src}
                  alt={content.whatIs.logo.alt}
                  className={cn(
                    layout.whatIs.logo.size.width,
                    layout.whatIs.logo.size.height,
                    theme.whatIs.layout.logo
                  )}
                  onError={() => {
                    if (imageError && content.whatIs.logo.fallback) {
                      setFallbackError(true);
                    } else {
                      setImageError(true);
                    }
                  }}
                  onLoad={() => {
                    setImageError(false);
                    setFallbackError(false);
                  }}
                />
              )}
            </div>
            <div className={layout.whatIs.content.span}>
              <h2 className={cn(theme.whatIs.typography.title, theme.whatIs.spacing.title)}>
                {content.whatIs.title}
              </h2>
              <p className={cn(
                theme.whatIs.typography.description,
                theme.whatIs.colors.description,
                theme.whatIs.spacing.description
              )}>
                {content.whatIs.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}






