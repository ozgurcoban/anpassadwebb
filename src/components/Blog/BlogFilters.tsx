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
    <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 space-y-6">
      {/* Header with title */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
          Filtrera artiklar
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Hitta artiklar som intresserar dig
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <div className="relative">
          <svg 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
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
            className="pl-10 pr-4 py-2 text-sm bg-gray-50 border-gray-200 rounded-lg focus:bg-white transition-all duration-200 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 dark:border-gray-700"></div>

      {/* Tags Filter */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Kategorier
          </h4>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Rensa alla
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {displayedTags.map((tag) => {
            const isSelected = selectedTags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                  isSelected
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600'
                }`}
              >
                {tag}
              </button>
            );
          })}
          
          {tags.length > 6 && (
            <button
              onClick={() => setShowAllTags(!showAllTags)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-50 text-gray-500 hover:bg-gray-100 transition-all duration-200 dark:bg-gray-800 dark:text-gray-500 dark:hover:bg-gray-700"
            >
              {showAllTags ? 'Visa färre' : `+${tags.length - 6} till`}
            </button>
          )}
        </div>
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="p-3 bg-gray-50 rounded-lg dark:bg-gray-700/50">
          <div className="flex flex-wrap gap-2">
            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-white rounded text-xs dark:bg-gray-600">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                &quot;{searchQuery}&quot;
              </span>
            )}
            {selectedTags.map((tag) => (
              <span 
                key={tag} 
                className="inline-flex items-center gap-1 px-2 py-1 bg-white rounded text-xs dark:bg-gray-600"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Divider */}
      <div className="border-t border-gray-200 dark:border-gray-700"></div>

      {/* Explore all categories link */}
      <Link 
        href="/tag" 
        className="block w-full text-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
      >
        Visa alla kategorier →
      </Link>
    </div>
  );
}