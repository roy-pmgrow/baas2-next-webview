/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  experimental: {
    externalDir: true,
  },
  images: {
    // loader: "akamai",
    // path: "/",
    domains: ["evplay.test.evmon.io"],
  },
  async rewrites() {
    return [
    {
        source: "/app/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/app/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
