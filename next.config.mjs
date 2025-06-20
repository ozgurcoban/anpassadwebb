/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
    // Allow Next.js to optimize images from the public folder
    unoptimized: false,
  },
  transpilePackages: ['next-mdx-remote'],
  experimental: {
    taint: true,
  },
};

export default nextConfig;