/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "alimg.szlcsc.com",
      },
    ],
  },
};

export default nextConfig;
