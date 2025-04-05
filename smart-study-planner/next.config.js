/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Add output configuration for Vercel
  output: 'standalone',
  // Add experimental features
  experimental: {
    serverComponentsExternalPackages: ['sequelize', 'pg', 'pg-hstore'],
  },
  // Add webpack configuration
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('pg', 'pg-hstore');
    }
    return config;
  },
}

module.exports = nextConfig 