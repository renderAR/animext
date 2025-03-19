import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SortMode, type BaseMedia, type Filter } from "@/types";

export const useMedia = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [medias, setMedias] = useState<BaseMedia[]>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [favourites, setFavourites] = useState({} as Record<number, number>);

  // using purely URL params as state may be slow, so we also use UI states for filter/sort
  const [sort, _setSort] = useState<SortMode>(searchParams.get("sort") as SortMode || "SCORE_DESC");
  const setSort = (sort: SortMode) => {
    _setSort(sort);
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", sort);

    router.push(`${pathname}?${params.toString()}`);
  };

  const [filter, _setFilter] = useState({
    search: searchParams.get("search") || "",
    genres: searchParams.getAll("genres"),
    statuses: searchParams.getAll("statuses"),
    formats: searchParams.getAll("formats"),
    year: searchParams.get("year"),
    season: searchParams.get("season"),
  } as Filter);
  const setFilter = (filters: Filter) => {
    _setFilter(filters);
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        params.delete(key);
        value.forEach((v) => params.append(key, v));
      } else if (!value) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    router.push(`${pathname}?${params.toString()}`);
  };

  return {
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
  };
};
