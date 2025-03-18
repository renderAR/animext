import { Skeleton } from "./ui/skeleton";

export default function SkeletonCard({ ...props }) {
  return (
    <div className="flex flex-col gap-2 max-w-sm w-full" {...props}>
      <Skeleton className="relative aspect-185/265 w-full" />
      <Skeleton className="w-full h-4" />
    </div>
  );
}
