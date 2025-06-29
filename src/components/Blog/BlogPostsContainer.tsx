'use client';

import { useState, useMemo, useCallback, Suspense } from 'react';
import { type Post } from '@/lib/mdx';
import { Posts } from '@/components/Posts';
import { BlogFilters } from './BlogFilters';
import { BlogPostsSkeleton } from './BlogPostsSkeleton';
import { Card, CardContent } from '@/components/ui/card';

interface BlogPostsContainerProps {
  posts: Post[];
  locale?: string;
}

export function BlogPostsContainer({ posts, locale }: BlogPostsContainerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Get all unique tags from posts with performance optimization
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach(post => {
      post.frontmatter.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [posts]);

  // Memoized filter functions for better performance
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleTagFilter = useCallback((tags: string[]) => {
    setSelectedTags(tags);
  }, []);

  // Filter posts based on search query and selected tags
  const filteredPosts = useMemo(() => {
    let filtered = posts;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(post => 
        post.frontmatter.title?.toLowerCase().includes(query) ||
        post.frontmatter.description?.toLowerCase().includes(query) ||
        post.frontmatter.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Filter by selected tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(post =>
        selectedTags.every(selectedTag =>
          post.frontmatter.tags?.includes(selectedTag)
        )
      );
    }

    return filtered;
  }, [posts, searchQuery, selectedTags]);

  return (
    <div className="space-y-8">
      {/* Horizontal Filters Section */}
      <Card className="backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/50">
        <CardContent className="p-4 md:p-6">
          <BlogFilters
            tags={allTags}
            onSearch={handleSearch}
            onTagFilter={handleTagFilter}
            searchQuery={searchQuery}
            selectedTags={selectedTags}
          />
        </CardContent>
      </Card>
      
      {/* Posts Content */}
      <div>
        {filteredPosts.length === 0 ? (
        <Card className="max-w-md mx-auto">
          <CardContent className="text-center py-16 space-y-4">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 rounded-full flex items-center justify-center dark:from-gray-700 dark:via-gray-600 dark:to-gray-700">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.5H10a3.374 3.374 0 00-1.895-1.447l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Inga artiklar hittades
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Prova att justera dina söktermer eller filter för att hitta fler artiklar.
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Results count and future pagination area */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {(searchQuery || selectedTags.length > 0) 
                ? `Visar ${filteredPosts.length} av ${posts.length} artiklar`
                : `${posts.length} artiklar`
              }
            </p>
            
            {/* Space reserved for future pagination controls */}
            <div className="flex items-center gap-2">
              {/* Pagination will be added here when needed */}
            </div>
          </div>
          
          <Suspense fallback={<BlogPostsSkeleton count={filteredPosts.length} />}>
            <Posts posts={filteredPosts} locale={locale} />
          </Suspense>
          
          {/* Footer area for future pagination */}
          {filteredPosts.length > 9 && (
            <div className="mt-12 flex justify-center">
              {/* Pagination component will be added here when we have more posts */}
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {/* Placeholder for pagination */}
              </div>
            </div>
          )}
        </>
      )}
      </div>
    </div>
  );
}