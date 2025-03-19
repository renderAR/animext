"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useMediaContext } from "@/contexts/MediaProvider";
import MediaCard from "@/components/MediaCard";
import SkeletonCard from "@/components/SkeletonCard";
import { fetchFavouriteMedias } from "@/services/mediaService";
import { BaseMedia } from "@/types";

export default function Media() {
  const { favourites } = useMediaContext();
  const [isFavouritesLoading, setFavouritesLoading] = useState(false);
  const [favouriteMedias, setFavouriteMedias] = useState<BaseMedia[]>([]);

  useEffect(() => {
    const mediaIds = Object.keys(favourites).map((mediaId) => Number(mediaId));
    if (mediaIds.length === 0) {
      return;
    }

    setFavouritesLoading(true);
    fetchFavouriteMedias(mediaIds)
      .then(({ media }) => {
        const sortedFavourites = media.sort((a, b) => favourites[b.id] - favourites[a.id]);
        setFavouriteMedias(sortedFavourites);
      })
      .catch(() => toast.error("Failed to load favourites."))
      .finally(() => setFavouritesLoading(false));
  }, [favourites]);

  return (
    <main className="px-4 md:px-16 py-20 flex flex-col gap-6 h-101vh">
      {!isFavouritesLoading && favouriteMedias.length === 0
        ? <div className="w-full flex justify-center align-center">No favourites found.</div>
        : <div className="grid gap-12 grid-cols-[repeat(auto-fill,minmax(100px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(125px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(185px,1fr))]">
          {isFavouritesLoading
            ? Array(12).fill(null).map((_, index) => <SkeletonCard key={index} />)
            : favouriteMedias && favouriteMedias.map((item, index: number) => (
              <MediaCard key={item.id} media={item} fadeinDelay={15 * index} />
            ))
          }
        </div>
      }
    </main>
  );
}
