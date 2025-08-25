import { content as defaultContent } from "@/config/content";
import { theme } from "@/config/theme";
import { cn } from "@/lib/utils";
import { HowToPlayCard } from "./HowToPlayCard";
import { HowToPlayGuide } from "./HowToPlayGuide";
import { howToPlaySchema } from "@/app/schema";

interface HowToPlayProps {
  content?: typeof defaultContent;
}

export function HowToPlay({ content = defaultContent }: HowToPlayProps) {
  const paragraphs = content.howToPlay.description.split('\n\n');

  return (
    <section
      id="how-to-play"
      className={cn(
        "mb-24",
        theme.howToPlay.spacing.section,
        theme.layout.section.scrollMargin  // 添加滚动偏移
      )}
    >
      <h2 className={cn(
        "text-3xl font-bold text-center",
        theme.howToPlay.spacing.title,
        theme.howToPlay.colors.title
      )}>
        {content.howToPlay.title}
      </h2>

      <div className={theme.howToPlay.layout.container}>
        <div className={cn(theme.howToPlay.layout.content, "flex flex-col justify-between h-full")}>
          <div className="flex-1 space-y-6">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className={cn(
                theme.howToPlay.colors.description,
                "text-lg leading-relaxed"
              )}>
                {paragraph}
              </p>
            ))}
          </div>
          
          {/* 添加游戏特点卡片 */}
          <div className="mt-8 space-y-4">
            <h3 className="text-xl font-semibold text-foreground mb-4">Game Features:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-4 rounded-lg border-2 border-amber-200">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🎮</span>
                  <h4 className="font-semibold text-amber-800">Interactive Gameplay</h4>
                </div>
                <p className="text-sm text-amber-700">Drag and drop mechanics for intuitive pet interaction</p>
              </div>
              
              <div className="bg-gradient-to-r from-orange-100 to-amber-100 p-4 rounded-lg border-2 border-orange-200">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🍪</span>
                  <h4 className="font-semibold text-amber-800">Shadow Milk Cookie</h4>
                </div>
                <p className="text-sm text-amber-700">Official Cookie Run: Kingdom character with unique reactions</p>
              </div>
              
              <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-4 rounded-lg border-2 border-amber-200">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🚫</span>
                  <h4 className="font-semibold text-amber-800">No Rules</h4>
                </div>
                <p className="text-sm text-amber-700">Complete freedom to care or prank your virtual pet</p>
              </div>
              
              <div className="bg-gradient-to-r from-orange-100 to-amber-100 p-4 rounded-lg border-2 border-orange-200">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">📱</span>
                  <h4 className="font-semibold text-amber-800">Cross-Platform</h4>
                </div>
                <p className="text-sm text-amber-700">Play on any device - desktop, tablet, or mobile</p>
              </div>
            </div>
          </div>

          {/* 添加提示区域 */}
          <div className="mt-6 bg-gradient-to-r from-yellow-100 to-amber-100 p-6 rounded-lg border-2 border-yellow-300">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">💡</span>
              <h4 className="text-lg font-semibold text-amber-800">Pro Tips for New Players</h4>
            </div>
            <ul className="space-y-2 text-amber-700">
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-1">•</span>
                <span className="text-sm">Start with basic feeding and caring actions to understand Shadow Milk's reactions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-1">•</span>
                <span className="text-sm">Experiment with different room combinations for unique interactions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-1">•</span>
                <span className="text-sm">Watch the status bars to understand your pet's current mood and needs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-1">•</span>
                <span className="text-sm">Remember: there's no wrong way to play - embrace the chaos!</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className={cn(theme.howToPlay.layout.imageContainer, "relative h-full min-h-[600px]")}>
          <HowToPlayGuide />
        </div>
      </div>
    </section>
  );
}




