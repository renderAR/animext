"use client";

import { createContext, useContext, useEffect } from "react";
import { toast } from "sonner";
import { useMedia } from "@/hooks/useMedia";
import { fetchMedias } from "@/services/mediaService";
import type { BaseMedia, Filter, SortModes } from "@/types";

type MediaContextInfo = {
  medias: BaseMedia[],
  filter: Filter,
  sort: SortModes,
  page: number,
  hasNextPage: boolean,
  isLoading: boolean,
  loadMedias: (page: number, signal?: AbortSignal) => Promise<void>,
  setFilter: (filter: Filter) => void,
  setSort: (sort: SortModes) => void,
  setLoading: (isLoading: boolean) => void,
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
    setMedias,
    setFilter,
    setSort,
    setPage,
    setHasNextPage,
    setLoading,
  } = useMedia();

  const loadMedias = async (page: number, signal?: AbortSignal) => {
    const response = await fetchMedias({ ...filter, sort, page }, signal);
    setMedias(page === 1 ? response.media : [...medias, ...response.media]);
    setPage(page);
    setHasNextPage(response.hasNextPage);
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

  return (
    <MediaContext.Provider
      value={{
        medias,
        filter,
        sort,
        page,
        hasNextPage,
        isLoading,
        loadMedias,
        setFilter,
        setSort,
        setLoading,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export const useMediaContext = () => {
  return useContext(MediaContext) as MediaContextInfo;
};
