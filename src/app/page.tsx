"use client";

import MediaCard from "@/components/MediaCard";
import MediaLoader from "@/components/MediaLoader";
import { useMediaContext } from "@/contexts/MediaProvider";

export default function Home() {
  const { medias, isLoading, hasNextPage } = useMediaContext();

  return (
    <main className="px-4 md:px-16 flex flex-col gap-6 h-101vh">
      {medias.length === 0 && !isLoading && !hasNextPage
        ? <div className="w-full flex justify-center align-center">No results found.</div>
        : <div className="grid gap-12 grid-cols-[repeat(auto-fill,minmax(100px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(125px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(185px,1fr))]">
          {medias.map((item, index) => (
            <MediaCard key={item.id} media={item} fadeinDelay={15 * (index % 24)} />
          ))}
          <MediaLoader skeletons={medias.length > 0 ? 12 : 24} />
        </div>
      }
    </main>
  );
}
