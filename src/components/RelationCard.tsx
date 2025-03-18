import Image from "next/image";
import Link from "next/link";
import { animeFormatLabels, relationLabels, statusLabels, type RelatedMedia } from "@/types";

type Props = {
  media: RelatedMedia;
}

export default function RelationCard({ media }: Props) {
  return (
    <div className="flex flex-row h-29 rounded-md overflow-hidden bg-card shadow-md">
      <div className="relative h-29 w-[85px] min-w-[85px]">
        <Link href={`/${media.type === "MANGA" ? "manga" : "anime"}/${media.id}`}>
          <Image
            src={media.coverImage.medium}
            alt={media.title.english ?? media.title.romaji}
            layout="fill"
          />
        </Link>
      </div>

      <div className="flex flex-col px-2 py-2 line-clamp-1">
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
