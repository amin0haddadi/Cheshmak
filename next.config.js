/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/storage/**",
      },
      {
        protocol: "https",
        hostname: "api.cheshmak-store.ir",
        pathname: "/storage/**",
      },
      {
        protocol: "http",
        hostname: "api.cheshmak-store.ir",
        pathname: "/storage/**",
      },
    ],
  },
};

module.exports = nextConfig;


