import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fetchMediaDetails } from "@/services/mediaService";
import { durationToString, fuzzyDateToString } from "@/lib/utils";
import { type AnimeFormat, animeFormatLabels } from "@/types";

export default async function Anime({ params }: { params: Promise<{ id: number }> }) {
  const { id } = (await params);
  const media = await fetchMediaDetails(id);
  if (!media) {
    notFound();
  }

  const TitleText = ({ ...props }) => (
    <h1
      dangerouslySetInnerHTML={{ __html: media.title.english || media.title.romaji }}
      {...props}
    />
  );

  const DescriptionText = ({ ...props }) => (
    <p
      dangerouslySetInnerHTML={{ __html: media.description }}
      {...props}
    />
  );

  const ScoreText = ({ ...props }) => (
    <div {...props}>
      <span className="text-yellow-400 text-2xl">★</span>
      <span className="text-2xl font-bold">
        {media.averageScore ?? "-"}
      </span>
      <span className="text-muted-foreground font-semibold">
        /100
      </span>
    </div>
  );

  const GenreBadges = ({ ...props }) => (
    <div {...props}>
      {media.genres.map((genre: string) => (
        <Badge
          key={genre}
          variant="default"
          className="px-3 py-1 rounded-full text-sm shadow-md"
        >
          {genre}
        </Badge>
      ))}
      {media.tags
        .filter(({ isMediaSpoiler }) => !isMediaSpoiler)
        .map(({ name }) => (
          <Badge
            key={name}
            variant="secondary"
            className="px-3 py-1 rounded-full text-sm shadow-md"
          >
            {name}
          </Badge>
        ))
      }
    </div>
  );

  const FormatNotes = ({ ...props }) => (
    <div {...props}>
      {[
        media.episodes && `${media.episodes} episode${media.episodes > 1 ? "s" : ""}`,
        media.duration && durationToString(media.duration),
        media.volumes && `${media.volumes} volume${media.volumes > 1 ? "s" : ""}`,
        media.volumes && `${media.chapters} chapter${media.chapters > 1 ? "s" : ""}`,
      ].filter(Boolean).join(" • ") || "Unknown duration"}
    </div>
  );

  const ReleaseNotes = ({ ...props }) => (
    <div {...props}>
      {[
        animeFormatLabels[media.format as AnimeFormat],
        (
          media.startDate.year === media.endDate.year &&
          media.startDate.month === media.endDate.month &&
          media.startDate.day === media.endDate.day
        )
          ? fuzzyDateToString(media.startDate) || "TBD"
          : [
            fuzzyDateToString(media.startDate) || false,
            fuzzyDateToString(media.endDate) || "TBD",
          ].filter(Boolean).join(" to ")
      ].filter(Boolean).join(" • ")}
    </div>
  );

  const CoverImage = ({ ...props }) => (
    <div {...props}>
      <Image
        src={media.coverImage.extraLarge}
        alt={media.title.english ?? media.title.romaji}
        fill
        priority
        sizes="54vw, (max-width: 768px) 68vw, (max-width: 1024px) 100vw"
        className="object-cover rounded-md"
      />
    </div>
  );

  return (
    <div className="flex flex-col px-4 gap-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col gap-2 w-full max-w-full md:max-w-[33vh]">
          <CoverImage className="relative aspect-17/23 w-full shadow-md rounded-md" />
          <div className="flex flex-row gap-2">
            <Button
              className="grow transition duration-200 ease-in-out hover:scale-105"
              disabled
            />
            <ScoreText className="flex items-center gap-1" />
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <div>
            <TitleText className="text-3xl font-bold line-clamp-2" />
            <div className="lg:flex flex-row gap-1">
              <ReleaseNotes />
              <div className="hidden lg:block"> • </div>
              <FormatNotes />
            </div>
          </div>
          <GenreBadges className="flex flex-wrap gap-2" />
          <DescriptionText />
        </div>
      </div>
    </div>
  );
}
