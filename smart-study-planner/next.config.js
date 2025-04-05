/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Add output configuration for Vercel
  output: 'standalone',
  // Add experimental features
  experimental: {
    serverComponentsExternalPackages: ['sequelize', 'sqlite3'],
  },
  // Add webpack configuration
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('sqlite3');
    }
    return config;
  },
}

module.exports = nextConfig 