import { Skeleton } from "@/components/ui/Skeleton";

export function MatchCardSkeleton() {
  return (
    <div className="rounded-xl border border-border-light dark:border-border-dark bg-light-surface dark:bg-dark-surface p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-4 w-24" />
      </div>
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-28" />
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-6 w-28" />
      </div>
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-9 w-20 rounded-lg" />
      </div>
    </div>
  );
}
