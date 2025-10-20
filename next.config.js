/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.ucarecdn.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ucarecdn.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'egov-cdn.e.gov.ph',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'egov-cdn-stg.oueg.info',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'staging-files.oueg.info',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'files.e.gov.ph',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
