import Image from "next/image";
import Link from "next/link";
import { animeFormatLabels, relationLabels, statusLabels, type RelatedMedia } from "@/types";

type Props = {
  media: RelatedMedia;
}

export default function RelationCard({ media }: Props) {
  return (
    <div className="flex flex-row h-29 rounded-md overflow-hidden bg-card shadow-md dark:border">
      <div className="relative h-full w-[85px]">
        <Link href={`/${media.type === "MANGA" ? "manga" : "anime"}/${media.id}`}>
          <Image
            src={media.coverImage.medium}
            alt={media.title.english ?? media.title.romaji}
            layout="fill"
          />
        </Link>
      </div>

      <div className="flex flex-col px-2 pt-1 pb-2 line-clamp-1">
        <span className="font-bold">{relationLabels[media.relation]}</span>
        <Link
          className="text-sm md:text-md line-clamp-2"
          href={`/${media.type === "MANGA" ? "manga" : "anime"}/${media.id}`}
        >
          {media.title.english ?? media.title.romaji}
        </Link>
        <span className="mt-auto text-xs md:text-xs">
          {`${animeFormatLabels[media.format]} • ${statusLabels[media.status]}`}
        </span>
      </div>
    </div>
  );
}
