import Image from "next/image";
import Link from "next/link";
import type { BaseMedia } from "@/types";

interface Prop {
  media: BaseMedia;
  fadeinDelay?: number;
}

export default function MediaCard({ media, fadeinDelay }: Prop) {
  return (
    <div
      className="flex flex-col gap-2 max-w-sm w-full transition duration-200 ease-in-out hover:scale-110 animate-fade-in group"
      style={{ animationDelay: `${fadeinDelay ?? 0}ms`, animationFillMode: "both" }}
    >
      <Link href={`/anime/${media.id}`}>
        <div className="relative aspect-185/265 w-full shadow-md rounded-md">
          <Image
            src={media.coverImage.large}
            alt={media.title.english ?? media.title.romaji}
            fill
            sizes="54vw, (max-width: 768px) 68vw, (max-width: 1024px) 100vw"
            className="object-cover rounded-md hover:opacity-90"
          />
        </div>
      </Link>

      <Link
        href={`/anime/${media.id}`}
        className="font-semibold text-xs lg:text-base min-[2000px]:text-lg not-group-hover:line-clamp-2"
      >
        {media.title.english ?? media.title.romaji}
      </Link>
    </div>
  );
}
