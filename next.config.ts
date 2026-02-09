import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { 
        protocol: 'https',
        hostname: 'rds.co.id',
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "sentolop-img.com",
      },
      {
        protocol: "https",
        hostname: "cdn.company.com",
      },
    ],
  },
};

export default nextConfig;
