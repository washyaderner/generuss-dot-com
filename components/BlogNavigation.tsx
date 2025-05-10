import Link from 'next/link';
import { ArrowLeft, BookOpen } from 'lucide-react';

interface BlogNavigationProps {
  showBrowseArticles?: boolean;
}

export function BlogNavigation({ showBrowseArticles = true }: BlogNavigationProps) {
  return (
    <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
      <Link
        href="/"
        className="group relative px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-out hover:text-white"
      >
        <span className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-r from-teal-500/20 to-violet-600/20 opacity-50 group-hover:opacity-100 blur-sm transition-opacity" />
        <span className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-r from-teal-500/40 to-violet-600/40 opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="relative text-white flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </span>
      </Link>
      
      {showBrowseArticles && (
        <Link
          href="/blog"
          className="group relative px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-out hover:text-white"
        >
          <span className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-r from-violet-600/20 to-teal-500/20 opacity-50 group-hover:opacity-100 blur-sm transition-opacity" />
          <span className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-r from-violet-600/40 to-teal-500/40 opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative text-white flex items-center">
            <BookOpen className="mr-2 h-4 w-4" />
            Browse All Articles
          </span>
        </Link>
      )}
    </div>
  );
} 