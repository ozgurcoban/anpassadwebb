'use client';

import React from 'react';
import BlogHeroSection from './sections/BlogHeroSection';

const BlogComponents: React.FC = () => {
  return (
    <>
      <BlogHeroSection />
      {/* Featured posts and main posts sections are rendered in page.tsx as they need server-side data */}
    </>
  );
};

export default BlogComponents;