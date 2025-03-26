import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 's3-bucket-open-island.s3.ap-southeast-1.amazonaws.com'],
  },  
};

export default nextConfig;
