import { SortModes, type BaseMedia, type Filter } from "@/types";

type FetchMediasGraphqlVariables = {
  type: "ANIME";
  page: number;
  perPage: number;
  sort: SortModes | SortModes[];
  seasonYear?: number;
} & Partial<Filter>


const apiUrl = "https://graphql.anilist.co";

export const fetchMedias = async (options: { page: number, sort: SortModes } & Filter, signal?: AbortSignal) => {
  const { page, sort, genres, statuses, formats, year, season, search } = options;
  const variables: FetchMediasGraphqlVariables = {
    type: "ANIME",
    page,
    perPage: 24,
    sort: sort === SortModes.TRENDING ? [sort, SortModes.POPULARITY] : sort,
  };

  if (search) variables.search = search;
  if (statuses && statuses.length) variables.statuses = statuses;
  if (genres && genres.length) variables.genres = genres;
  if (formats && formats.length) variables.formats = formats;
  if (season) variables.season = season;
  if (year && season) variables.seasonYear = Number(year);
  else if (year) variables.year = `${year}%`;

  const query = `
  query (
    $page: Int,
    $perPage: Int,
    $type: MediaType,
    $search: String,
    $genres: [String],
    $statuses: [MediaStatus],
    $formats: [MediaFormat],
    $season: MediaSeason,
    $seasonYear: Int,
    $year: String,
    $sort: [MediaSort]
  ) {
    Page(page: $page, perPage: $perPage) {
      media(type: $type,
        genre_in: $genres,
        isAdult: false,
        search: $search,
        status_in: $statuses,
        format_in: $formats,
        season: $season,
        seasonYear: $seasonYear,
        startDate_like: $year,
        sort: $sort
      ) {
        id
        title {
          romaji
          english
        }
        type
        coverImage {
          large
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
  `;

  const requestOptions = {
    method: "POST",
    body: JSON.stringify({ query, variables }),
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    signal,
  };

  try {
    const response = await fetch(apiUrl, requestOptions);
    const { data } = await response.json();
    const { pageInfo, media } = data?.Page;

    return {
      hasNextPage: pageInfo?.hasNextPage as boolean || false,
      media: !media?.length ? [] : media as BaseMedia[],
    };
  } catch (error: unknown) {
    if (error instanceof Error && error.name === "AbortError") {
      throw error;
    }
    return { hasNextPage: false, media: [] };
  }
};
