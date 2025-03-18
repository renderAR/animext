"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useMediaContext } from "@/contexts/MediaProvider";
import SkeletonCard from "./SkeletonCard";

type Props = {
  skeletons: number;
}

export default function MediaLoader({ skeletons }: Props) {
  const { loadMedias, page, hasNextPage, isLoading, setLoading } = useMediaContext();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && !isLoading) {
      loadMedias(page + 1)
        .finally(() => setLoading(false));
    }
  }, [inView]);

  return (hasNextPage || isLoading) && (
    <>
      <SkeletonCard ref={ref} />
      {Array(skeletons - 1).fill(null).map((_, index) => <SkeletonCard key={index} />)}
    </>
  );
}
