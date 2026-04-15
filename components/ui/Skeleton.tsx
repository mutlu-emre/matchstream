export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`skeleton-shimmer bg-light-elevated dark:bg-dark-elevated rounded ${className}`} />
  );
}
