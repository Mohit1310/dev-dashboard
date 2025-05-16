import { Skeleton } from "@/components/ui/skeleton";

const NewsSkeleton = () =>
  Array.from({ length: 3 }).map((_, i) => (
    // biome-ignore lint: react/no-array-index-key
    <div key={i} className="border p-3 rounded space-y-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/3" />
    </div>
  ));

export default NewsSkeleton;
