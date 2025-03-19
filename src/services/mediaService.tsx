import type { BaseMedia, MediaDetails, SortMode, Filter } from "@/types";

type FetchMediasGraphqlVariables = {
  type: "ANIME";
  page: number;
  perPage: number;
  sort: SortMode | SortMode[];
  seasonYear?: number;
} & Partial<Filter>

const apiUrl = "https://graphql.anilist.co";

export const fetchMedias = async (options: { page: number, sort: SortMode } & Filter, signal?: AbortSignal) => {
  const { page, sort, genres, statuses, formats, year, season, search } = options;
  const variables: FetchMediasGraphqlVariables = {
    type: "ANIME",
    page,
    perPage: 24,
    sort: sort === "TRENDING_DESC" ? [sort, "POPULARITY_DESC"] : sort,
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

export const fetchMediaDetails = async (id: number) => {
  const variables = { id, type: "ANIME" };
  const query = `
  query ($id: Int, $type: MediaType) {
    Media(id: $id, type: $type, isAdult: false) {
      title {
        romaji
        english
      }
      coverImage {
        extraLarge
      }
      type
      description
      genres
      tags {
        name
        isMediaSpoiler
      }
      format
      episodes
      duration
      volumes
      chapters
      status
      season
      seasonYear
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
      averageScore
      favourites
      relations {
        edges {
          id
          relationType(version: 2)
          node {
            id
            title {
              romaji
              english
            }
            format
            type
            status(version: 2)
            coverImage {
              medium
            }
          }
        }
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
  };

  try {
    const response = await fetch(apiUrl, requestOptions);
    const { data } = await response.json();
    if (!data?.Media) return null;

    data.Media.id = id;
    return data.Media as MediaDetails;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchFavourites = async () => {
  // simulate an api request by delaying the response
  await new Promise((resolve) => setTimeout(resolve, 500));
  const favourites = localStorage.getItem("favourites");
  return favourites ? JSON.parse(favourites) as Record<number, number> : {};
};

export const postFavourites = async (favourites: Record<number, number>) => {
  // simulate an api request by delaying the response
  await new Promise((resolve) => setTimeout(resolve, 500));
  localStorage.setItem("favourites", JSON.stringify(favourites));
};
