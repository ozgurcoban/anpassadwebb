'use client';

import React from 'react';
import BlogHeroSection from './sections/BlogHeroSection';

const BlogComponents: React.FC = () => {
  return (
    <>
      <BlogHeroSection />
      {/* Posts section is rendered in page.tsx as it needs server-side data */}
    </>
  );
};

export default BlogComponents;