"use client";

import { Heart, HeartOff } from "lucide-react";
import { Button } from "./ui/button";
import { useMediaContext } from "@/contexts/MediaProvider";
import type { MediaDetails } from "@/types";

type Props = {
  media: Pick<MediaDetails, "id" | "favourites" | "title">;
} & React.ComponentPropsWithoutRef<"button">

export default function FavouriteToggle({ media, ...props }: Props) {
  const { isLoading, favourites, toggleFavourite } = useMediaContext();

  return (
    <Button
      aria-label={favourites[media.id] ? "Remove from favourites" : "Add to favourites"}
      onClick={() => toggleFavourite(media)}
      disabled={isLoading}
      {...props}
    >
      {favourites[media.id] ? <HeartOff /> : <Heart />}
      {media.favourites + (favourites[media.id] ? 1 : 0)}
    </Button>
  );
};
