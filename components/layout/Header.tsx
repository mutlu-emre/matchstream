import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-light dark:border-border-dark bg-light-surface dark:bg-dark-surface">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold text-primary">match</span>
          <span className="text-xl font-bold text-text-inverse dark:text-text-primary">stream</span>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
