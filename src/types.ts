export type BaseMedia = {
  id: number;
  title: {
    romaji: string;
    english?: string;
  };
  type: "ANIME" | "MANGA";
  coverImage: {
    large: string;
  };
}

export enum SortModes {
  POPULARITY = "POPULARITY_DESC",
  SCORE = "SCORE_DESC",
  TRENDING = "TRENDING_DESC",
  FAVOURITES = "FAVOURITES_DESC",
  ID = "ID_DESC",
  START_DATE = "START_DATE_DESC",
}

export type Filter = {
  search: string;
  genres: string[];
  statuses: Statuses[];
  formats: AnimeFormats[];
  year: string | null;
  season: Seasons | null;
}

export enum Seasons {
  WINTER = "WINTER",
  SPRING = "SPRING",
  SUMMER = "SUMMER",
  FALL = "FALL",
}

export enum Statuses {
  FINISHED = "FINISHED",
  RELEASING = "RELEASING",
  UNRELEASED = "NOT_YET_RELEASED",
  CANCELLED = "CANCELLED",
}

export enum AnimeFormats {
  TV = "TV",
  TV_SHORT = "TV_SHORT",
  MOVIE = "MOVIE",
  OVA = "OVA",
  ONA = "ONA",
  SPECIAL = "SPECIAL",
  MUSIC = "MUSIC",
}
