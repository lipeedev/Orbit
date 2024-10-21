/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: false,
      },
    ];
  },

  images: {
    remotePatterns: [{
      hostname: 'github.com',
      protocol: 'https',
    }]
  }
};

export default nextConfig;
