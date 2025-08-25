// "use client"; // No longer strictly needed if useRouter is removed and Card/subcomponents are server components.
// However, shadcn/ui components can sometimes pull in client-side dependencies implicitly.
// For now, let's try removing it. If issues arise, it can be re-added.

import Link from 'next/link';
import Image from 'next/image';
import { theme } from "@/config/theme";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface GameCardProps {
  id: string; // id is used as key by parent component
  title: string;
  description: string; // Kept in props for type consistency, though not displayed
  image: string;
  url: string;
}

export function GameCard({ id, title, description, image, url }: GameCardProps) {
  // const router = useRouter(); // Removed
  // const handleClick = () => { router.push(url); }; // Removed

  return (
    <Link
      href={url}
      aria-label={`Play ${title}`} // More direct aria-label for a link
      className="block h-full no-underline text-inherit rounded-lg hover:shadow-lg transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <Card
        // Removed interactive props (onClick, role, tabIndex, onKeyDown) as Link handles them.
        // className adjusted: original theme.otherGames.layout.card was "overflow-hidden hover:shadow-lg transition-shadow"
        // Hover effects are now on the Link.
        className="overflow-hidden h-full flex flex-col" // h-full to fill Link, flex flex-col for content alignment
      >
        <CardHeader className="p-0 relative">
          <Image
            src={image}
            alt={`${title} preview`}
            width={384}
            height={192}
            className={theme.otherGames.layout.image}
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyiqQzRtEwHcN3vv7+Eeqz3Kt96kiCuEqCKw5d6NzMYgJm3cP8AC54zlr9Md0="
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ width: "auto", height: "auto" }}
          />
        </CardHeader>
        <CardContent className="p-4 flex-grow flex flex-col justify-center"> {/* flex-grow to push title down if card is taller, justify-center for title vertical centering if needed */}
          <CardTitle className={`${theme.otherGames.typography.cardTitle} ${theme.otherGames.spacing.cardTitle}`}>
            {title}
          </CardTitle>
        </CardContent>
      </Card>
    </Link>
  );
}
