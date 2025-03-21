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

export type RelatedMedia = {
  relation: Relation;
  format: AnimeFormat;
  status: Status;
  coverImage: { medium: string };
} & Omit<BaseMedia, "coverImage">

export type MediaDetails = {
  coverImage: { extraLarge: string }
  description: string;
  genres: string[];
  tags: { name: string; isMediaSpoiler: boolean }[];
  format: AnimeFormat;
  episodes: number;
  duration: number;
  volumes: number;
  chapters: number;
  status: Status;
  season: Season;
  seasonYear: number;
  startDate: { year: number; month: number; day: number };
  endDate: { year: number; month: number; day: number };
  averageScore: number;
  favourites: number;
  relations: {
    edges: {
      id: number;
      relationType: Relation;
      node: Omit<RelatedMedia, "relation">;
    }[];
  };
} & Omit<BaseMedia, "coverImage">

export type Relation = keyof typeof relationLabels
export const relationLabels = {
  SOURCE: "Source",
  ADAPTATION: "Adaptation",
  PARENT: "Parent",
  PREQUEL: "Prequel",
  SEQUEL: "Sequel",
  ALTERNATIVE: "Alternative",
  SIDE_STORY: "Side Story",
  SPIN_OFF: "Spin-off",
  SUMMARY: "Summary",
  CHARACTER: "Character",
  COMPILATION: "Compilation",
  CONTAINS: "Contains",
  OTHER: "Other",
};

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

export const genres = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Ecchi",
  "Fantasy",
  "Horror",
  "Mahou Shoujo",
  "Mecha",
  "Music",
  "Mystery",
  "Psychological",
  "Romance",
  "Sci-Fi",
  "Slice of Life",
  "Sports",
  "Supernatural",
  "Thriller",
];
