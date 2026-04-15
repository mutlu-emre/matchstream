interface BadgeProps {
  children: React.ReactNode;
  variant: "live" | "upcoming" | "finished" | "quality";
  className?: string;
}

const variants = {
  live: "bg-live/20 text-live border border-live/30 font-semibold",
  upcoming: "bg-primary/10 text-primary border border-primary/20",
  finished: "bg-light-overlay dark:bg-dark-overlay text-text-muted border border-border-light dark:border-border-dark",
  quality: "bg-light-overlay dark:bg-dark-elevated text-text-secondary",
};

export function Badge({ children, variant, className = "" }: BadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
