/** @type {import('next').NextConfig} */
await import('./src/env.mjs');

const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'avatar.iran.liara.run',
            pathname: '/username',
          },
        ],
      },
};

export default nextConfig;
