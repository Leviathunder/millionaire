/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => [
    {
      source: '/',
      destination: '/start',
      permanent: true,
    },
  ],
};

export default nextConfig;
