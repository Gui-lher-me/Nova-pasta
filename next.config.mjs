/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DATABASE_URL: process.env.DATABASE_URL ?? "",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dc-imports.s3.ca-central-1.amazonaws.com",
      },
      { protocol: "https", hostname: "s3.ca-central-1.amazonaws.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "cdn.shopify.com" },
      { protocol: "https", hostname: "app.dropcommerce.com" },
      { protocol: "https", hostname: "dnvlxjuzig5dx.cloudfront.net" },
      {
        protocol: "https",
        hostname: "dropcommerce-images.s3.ca-central-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "premade-store-images.s3.ca-central-1.amazonaws.com",
      },
      { protocol: "https", hostname: "flagcdn.com" },
      { protocol: "https", hostname: "www.unitetolight.org" },
    ],
  },
};

export default nextConfig;
