import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { theme } from "@/config/theme";
import { cn } from "@/lib/utils";

interface HowToPlayCardProps {
  position: number;
  name: string;
  text: string;
  image: string;
  imageAlt: string;
}

export function HowToPlayCard({ position, name, text, image, imageAlt }: HowToPlayCardProps) {
  return (
    <Card className={cn(theme.howToPlay.layout.card)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className={cn(
            "flex items-center justify-center w-8 h-8 rounded-full",
            theme.howToPlay.colors.stepNumber
          )}>
            {position}
          </span>
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent className={theme.howToPlay.spacing.content}>
        <div className={theme.howToPlay.layout.imageContainer}>
          <img
            src={image}
            alt={imageAlt}
            className="object-cover w-full h-full"
          />
        </div>
        <p className={cn("mt-4", theme.howToPlay.colors.description)}>
          {text}
        </p>
      </CardContent>
    </Card>
  );
}
