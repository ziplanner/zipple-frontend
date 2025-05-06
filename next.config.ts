import type { NextConfig } from "next";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  compiler: {
    styledComponents: true,
  },
  output: "standalone",
  images: {
    domains: ["k.kakaocdn.net"],
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
  async rewrites() {
    return [
      {
        source: "/api/v2/:path*",
        destination: `${API_URL}/api/v2/:path*`,
      },
      {
        source: "/api/realtors",
        destination: "https://api.vworld.kr/ned/data/getEBBrokerInfo",
      },
      {
        source: "/api/broker",
        destination: "https://api.vworld.kr/ned/data/getEBBrokerInfo",
      },
    ];
  },
};

export default nextConfig;
