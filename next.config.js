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
        hostname: "beauty-center.mrhn.ir",
        pathname: "/storage/**",
      },
      {
        protocol: "http",
        hostname: "beauty-center.mrhn.ir",
        pathname: "/storage/**",
      },
    ],
  },
};

module.exports = nextConfig;


