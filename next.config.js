/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8080/:path*",
      },
    ];
  },
  images: {
    domains: ["pub-730d41d50aa14413843d2f22e88310a6.r2.dev"],
  },
};

module.exports = nextConfig;
