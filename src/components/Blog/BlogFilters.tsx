'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface BlogFiltersProps {
  tags: string[];
  onSearch: (query: string) => void;
  onTagFilter: (tags: string[]) => void;
  searchQuery: string;
  selectedTags: string[];
}

export function BlogFilters({
  tags,
  onSearch,
  onTagFilter,
  searchQuery,
  selectedTags,
}: BlogFiltersProps) {
  const [showAllTags, setShowAllTags] = useState(false);

  const displayedTags = useMemo(() => {
    return showAllTags ? tags : tags.slice(0, 6);
  }, [tags, showAllTags]);

  const handleTagToggle = (tag: string) => {
    const newSelectedTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    onTagFilter(newSelectedTags);
  };

  const clearAllFilters = () => {
    onSearch('');
    onTagFilter([]);
  };

  const hasActiveFilters = searchQuery || selectedTags.length > 0;

  return (
    <div className="space-y-4">
      {/* Search and Filter Row */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search Bar */}
        <div className="relative flex-1 sm:max-w-md">
          <svg 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
          <Input
            type="text"
            placeholder="Sök artiklar..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            className="pl-10 pr-4 py-2.5 text-sm bg-white border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <Button
            onClick={clearAllFilters}
            variant="outline"
            size="sm"
            className="whitespace-nowrap"
          >
            Rensa filter
          </Button>
        )}
      </div>

      {/* Tags Filter Row */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Kategorier:
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:inline">
            (klicka för att filtrera)
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {displayedTags.map((tag) => {
            const isSelected = selectedTags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isSelected
                    ? 'bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {tag}
              </button>
            );
          })}
          
          {tags.length > 6 && (
            <button
              onClick={() => setShowAllTags(!showAllTags)}
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-all duration-200 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-gray-700"
            >
              {showAllTags ? '− Visa färre' : `+ ${tags.length - 6} fler`}
            </button>
          )}
          
          <Link 
            href="/blogg/tag" 
            className="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700"
          >
            Alla kategorier →
          </Link>
        </div>
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && selectedTags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">Aktiva filter:</span>
          {selectedTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagToggle(tag)}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium hover:bg-blue-200 transition-colors dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"
            >
              {tag}
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}