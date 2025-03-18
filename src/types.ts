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

export type SortMode = keyof typeof sortModeLabels
export const sortModeLabels = {
  POPULARITY_DESC: "Popularity",
  SCORE_DESC: "Score",
  TRENDING_DESC: "Trending",
  FAVOURITES_DESC: "Favourites",
  ID_DESC: "Date Added",
  START_DATE_DESC: "Release Date",
};

export type Filter = {
  search: string;
  genres: string[];
  statuses: Status[];
  formats: AnimeFormat[];
  year: string | null;
  season: Season | null;
}

export type Status = keyof typeof statusLabels
export const statusLabels = {
  FINISHED: "Finished",
  RELEASING: "Releasing",
  NOT_YET_RELEASED: "Not Yet Released",
  CANCELLED: "Cancelled",
};

export type Season = keyof typeof seasonLabels
export const seasonLabels = {
  WINTER: "Winter",
  SPRING: "Spring",
  SUMMER: "Summer",
  FALL: "Fall",
};

export type AnimeFormat = keyof typeof animeFormatLabels
export const animeFormatLabels = {
  TV: "TV Show",
  TV_SHORT: "TV Short",
  MOVIE: "Movie",
  OVA: "OVA",
  ONA: "ONA",
  SPECIAL: "Special",
  MUSIC: "Music",
};
