import { content } from "@/config/content";
import { theme } from "@/config/theme";
import { GameCard } from "./GameCard";
import { cn } from "@/lib/utils";

interface Game {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
}

interface OtherGamesProps {
  games: Game[];
  onGameSelect: (url: string) => void;
}

// Removed incorrect import: import { layout as globalLayout } from "@/config/layout";

export function OtherGames({ games, onGameSelect }: OtherGamesProps) {
  if (games.length === 0) return null;

  return (
    <section
      id="other-games"
      className={cn(
        theme.otherGames.layout.section, // Contains mb-16 (specific to OtherGames section)
        theme.layout.section.scrollMargin // Contains scroll-mt-16 (general for all sections)
      )}
    >
      <h2 className={cn(
        theme.otherGames.typography.title,
        theme.otherGames.spacing.title
      )}>
        {content.otherGames.title}
      </h2>
      <div className={theme.otherGames.layout.grid}>
        {games.map((game) => (
          <GameCard
            key={game.id}
            {...game}
            // onPlay prop removed as GameCard now handles navigation directly
            // and no longer accepts onPlay. The onGameSelect prop passed to OtherGames
            // is now effectively unused by GameCard.
          />
        ))}
      </div>
    </section>
  );
}
