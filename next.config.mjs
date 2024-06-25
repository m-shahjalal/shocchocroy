/** @type {import('next').NextConfig} */
await import("./src/env.mjs");

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatar.iran.liara.run",
        pathname: "/username",
      },
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
        pathname: "/img/*",
      },
    ],
  },
};

export default nextConfig;
