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
      {
        source: "/addrlink/:path*",
        destination: `${process.env.NEXT_PUBLIC_ADDRESS_API_URL}/addrlink/:path*`,
      },
      {
        source: "/v1/:path*",
        destination: `${process.env.NEXT_PUBLIC_KAKAO_NAVI_API_URL}/v1/:path*`,
      },
      {
        source: "/v2/:path*",
        destination: `${process.env.NEXT_PUBLIC_KAKAO_MAP_API_URL}/v2/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
