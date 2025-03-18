"use client";

import debounce from "lodash.debounce";
import { useState, useCallback } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { MultiSelect } from "./ui/multi-select";
import { useMediaContext } from "@/contexts/MediaProvider";
import {
  sortModeLabels,
  seasonLabels,
  statusLabels,
  animeFormatLabels,
  genres,
  type Season,
  type AnimeFormat,
  type Status,
} from "@/types";

const genreOptions = genres.map((value) => ({ value, label: value }));
const formatOptions = Object.entries(animeFormatLabels).map(([value, label]) => ({ value, label }));
const seasonOptions = Object.entries(seasonLabels).map(([value, label]) => ({ value, label }));
const statusOptions = Object.entries(statusLabels).map(([value, label]) => ({ value, label }));
const currentYear = new Date().getFullYear(), startYear = 1940;
const yearOptions = Array.from({ length: currentYear - startYear + 1 })
  .map((_, index) => `${currentYear - index}`)
  .map((value) => ({ value, label: value }));

export default function MediaFilters() {
  const { filter, sort, setFilter, setSort } = useMediaContext();

  // have 2 search filter states, a latest state for UI and a debounced state for filtering
  const [search, setSearch] = useState(filter.search);
  const setFilterOnDelay = useCallback(debounce(setFilter, 1000), []);

  return (
    <div className="flex flex-col min-[1400px]:flex-row gap-4">
      <span className="flex flex-row w-full gap-4">
        <div className="w-full">
          <span className="font-bold">Search</span>
          <Input
            className="shadow-md bg-card"
            value={search}
            onChange={({ target }) => {
              setSearch(target.value);
              setFilterOnDelay({ ...filter, search: target.value });
            }}
          />
        </div>

        <div className="flex flex-col max-[400px]:w-12 min-[400px]:min-w-33">
          <span className="font-bold">Sort </span>
          <Select defaultValue={sort} onValueChange={setSort}>
            <SelectTrigger className="w-full shadow-md bg-card">
              <SelectValue className="hidden min-[400px]:block" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(sortModeLabels).map(([value, label]) => (
                <SelectItem key={value} value={value}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </span>

      <div className="flex flex-row gap-4 lg:grid lg:grid-cols-5 lg:min-w-220 overflow-auto">
        <div className="flex flex-col space-x-2 min-w-40 pb-3">
          <span className="font-bold">Genre</span>
          <MultiSelect
            className="shadow-md bg-card"
            options={genreOptions}
            selectedValues={filter.genres}
            onValueChange={(genres) => setFilter({ ...filter, genres })}
            placeholder="Any"
            variant="inverted"
            maxCount={1}
            isSearchable
          />
        </div>

        <div className="flex flex-col space-x-2 min-w-40 pb-3">
          <span className="font-bold">Year</span>
          <MultiSelect
            className="shadow-md bg-card"
            options={yearOptions}
            selectedValues={filter.year ? [filter.year] : []}
            onValueChange={(years) => setFilter({ ...filter, year: years[0] || null })}
            placeholder="Any"
            variant="inverted"
            maxCount={1}
            isSearchable
            isSingle
          />
        </div>

        <div className="flex flex-col space-x-2 min-w-40 pb-3">
          <span className="font-bold">Seasons</span>
          <MultiSelect
            className="shadow-md bg-card"
            options={seasonOptions}
            selectedValues={filter.season ? [filter.season] : []}
            onValueChange={(seasons) => setFilter({
              ...filter,
              season: seasons[0] as Season || null,
              year: (seasons[0] && !filter.year) ? currentYear.toString() : filter.year,
            })}
            placeholder="Any"
            variant="inverted"
            maxCount={1}
            isSingle
          />
        </div>

        <div className="flex flex-col space-x-2 min-w-40 pb-3">
          <span className="font-bold">Format</span>
          <MultiSelect
            className="shadow-md bg-card"
            options={formatOptions}
            selectedValues={filter.formats}
            onValueChange={(formats) => setFilter({ ...filter, formats: formats as AnimeFormat[] })}
            placeholder="Any"
            variant="inverted"
            maxCount={1}
          />
        </div>

        <div className="flex flex-col space-x-2 min-w-40 pb-3">
          <span className="font-bold">Airing Status</span>
          <MultiSelect
            className="shadow-md bg-card"
            options={statusOptions}
            selectedValues={filter.statuses}
            onValueChange={(statuses) => setFilter({ ...filter, statuses: statuses as Status[] })}
            placeholder="Any"
            variant="inverted"
            maxCount={1}
          />
        </div>
      </div>
    </div>
  );
}
