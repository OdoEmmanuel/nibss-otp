import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://dev.lyvac.net/api/:path*",
      },
    ];
  },
};

export default nextConfig;
