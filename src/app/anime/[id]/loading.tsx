import { Skeleton } from "@/components/ui/skeleton";

export default async function Loading() {
  const ScoreText = ({ ...props }) => (
    <div {...props}>
      <span className="text-yellow-400 text-2xl">★</span>
      <span className="text-2xl font-bold"> - </span>
      <span className="text-muted-foreground font-semibold">
        /100
      </span>
    </div>
  );

  return (
    <div className="flex flex-col px-4 gap-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col gap-2 w-full max-w-full md:max-w-[33vh]">
          <Skeleton className="relative aspect-17/23 w-full shadow-md rounded-md" />
          <div className="flex flex-row gap-2">
            <Skeleton className="grow h-9" />
            <ScoreText className="flex items-center gap-1" />
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-[30px] w-full max-w-140" />
            <Skeleton className="h-5 w-1/2 max-w-100" />
          </div>
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-8 w-22 rounded-full" />
            <Skeleton className="h-8 w-22 rounded-full" />
            <Skeleton className="h-8 w-22 rounded-full" />
            <Skeleton className="h-8 w-22 rounded-full" />
            <Skeleton className="h-8 w-22 rounded-full" />
            <Skeleton className="h-8 w-22 rounded-full" />
          </div>
          <Skeleton className="h-5 w-1/2 w-full" />
          <Skeleton className="h-5 w-1/2 w-full" />
          <Skeleton className="h-5 w-1/2 w-3/4" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-12 lg:grid-cols-3 gap-4">
        <Skeleton className="h-29 w-full rounded-md" />
        <Skeleton className="h-29 w-full rounded-md" />
        <Skeleton className="h-29 w-full rounded-md" />
      </div>
    </div>
  );
}
