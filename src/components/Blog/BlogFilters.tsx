'use client';

import { useState, useMemo } from 'react';
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
    <div className="space-y-6 mb-12">
      {/* Search Bar */}
      <div className="relative max-w-2xl mx-auto">
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
            placeholder="Sök efter artiklar..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            className="pl-12 pr-4 py-3 text-lg bg-white/70 backdrop-blur-sm border-white/30 rounded-2xl focus:bg-white/90 transition-all duration-300 dark:bg-gray-800/70 dark:border-gray-700/30"
          />
        </div>
      </div>

      {/* Tags Filter */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Filtrera efter kategori
          </h3>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Rensa filter
            </Button>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          {displayedTags.map((tag) => {
            const isSelected = selectedTags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                  isSelected
                    ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white border-transparent shadow-lg'
                    : 'bg-white/70 backdrop-blur-sm border-white/30 text-gray-700 hover:bg-white/90 hover:border-gray-300 dark:bg-gray-800/70 dark:border-gray-700/30 dark:text-gray-300 dark:hover:bg-gray-700/90'
                }`}
              >
                #{tag}
              </button>
            );
          })}
          
          {tags.length > 6 && (
            <button
              onClick={() => setShowAllTags(!showAllTags)}
              className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-300 border border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:border-gray-600"
            >
              {showAllTags ? 'Visa färre' : `+${tags.length - 6} till`}
            </button>
          )}
        </div>
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="flex items-center gap-3 p-4 bg-blue-50/50 backdrop-blur-sm rounded-2xl border border-blue-200/30 dark:bg-blue-900/20 dark:border-blue-800/30">
          <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
            Aktiva filter:
          </span>
          {searchQuery && (
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
              Sökning: &quot;{searchQuery}&quot;
            </Badge>
          )}
          {selectedTags.map((tag) => (
            <Badge 
              key={tag} 
              variant="secondary" 
              className="bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100"
            >
              #{tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}