"use client";

import { createContext, useContext, useEffect } from "react";
import { toast } from "sonner";
import { useMedia } from "@/hooks/useMedia";
import { fetchFavourites, fetchMedias, postFavourites } from "@/services/mediaService";
import type { BaseMedia, MediaDetails, Filter, SortMode } from "@/types";

type MediaContextInfo = {
  medias: BaseMedia[],
  filter: Filter,
  sort: SortMode,
  page: number,
  hasNextPage: boolean,
  isLoading: boolean,
  favourites: Record<number, number>,
  loadMedias: (page: number, signal?: AbortSignal) => Promise<void>,
  setFilter: (filter: Filter) => void,
  setSort: (sort: SortMode) => void,
  setLoading: (isLoading: boolean) => void,
  toggleFavourite: (media: Pick<MediaDetails, "id" | "favourites" | "title">) => void,
}

const MediaContext = createContext<MediaContextInfo | undefined>(undefined);

export const MediaProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    medias,
    filter,
    sort,
    page,
    hasNextPage,
    isLoading,
    favourites,
    setMedias,
    setFilter,
    setSort,
    setPage,
    setHasNextPage,
    setLoading,
    setFavourites,
  } = useMedia();

  const loadMedias = async (page: number, signal?: AbortSignal) => {
    const response = await fetchMedias({ ...filter, sort, page }, signal);
    setMedias(page === 1 ? response.media : [...medias, ...response.media]);
    setPage(page);
    setHasNextPage(response.hasNextPage);
  };

  const toggleFavourite = (media: Pick<MediaDetails, "id" | "favourites" | "title">) => {
    const mediaTitle = media.title.english || media.title.romaji;
    const isFavourited = favourites[media.id];
    const newFavourites = { ...favourites };
    if (isFavourited) {
      delete newFavourites[media.id];
    } else {
      newFavourites[media.id] = Date.now();
    }

    setLoading(true);
    postFavourites(newFavourites)
      .then(() => {
        setFavourites(newFavourites);
        toast.success(`${isFavourited ? "Removed" : "Added"} ${mediaTitle} ${isFavourited ? "from" : "to"} favourites.`);
      })
      .catch(() => toast.error(`Failed to ${isFavourited ? "un-" : ""}favourite ${mediaTitle}.`))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    setMedias([]);

    const controller = new AbortController();
    const signal = controller.signal;
    loadMedias(1, signal)
      .then(() => {
        setLoading(false);
      }).catch(() => {
        if (!signal.aborted) {
          toast.error("Failed to fetch more media.");
        }
        setHasNextPage(true);
      });

    // abort pending requests on new filter/sort
    return () => controller.abort();
  }, [filter, sort]);

  useEffect(() => {
    fetchFavourites()
      .then(setFavourites)
      .catch(() => toast.error("Failed to load favourites."));
  }, []);

  return (
    <MediaContext.Provider
      value={{
        medias,
        filter,
        sort,
        page,
        hasNextPage,
        isLoading,
        favourites,
        loadMedias,
        setFilter,
        setSort,
        setLoading,
        toggleFavourite,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export const useMediaContext = () => {
  return useContext(MediaContext) as MediaContextInfo;
};
