/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "migrantscholar.vercel.app" }],
        destination: "https://migrantscholar.com/:path*",
        permanent: true,
      },
      // 301 redirects for deleted posts
      { source: "/blog/turkish-scholarships-pakistani-students-australia", destination: "/countries/Turkey", permanent: true },
      { source: "/blog/iranian-migrant-students-usa-f1-visa-internships", destination: "/guides/f1-visa-guide-migrants", permanent: true },
      { source: "/blog/afghan-women-stem-scholarships-usa", destination: "/by-eligibility/refugees", permanent: true },
      { source: "/blog/fully-funded-phd-programs-indian-nationals-university-manchester", destination: "/by-level/phd", permanent: true },
      { source: "/blog/turkey-pakistani-migrants-stem-scholarships", destination: "/countries/Turkey", permanent: true },
      { source: "/blog/university-of-london-masters-scholarships", destination: "/countries/UK", permanent: true },
      { source: "/blog/university-toronto-somali-asylum-seekers-phd", destination: "/universities/university-of-toronto", permanent: true },
      { source: "/blog/usa-emergency-funding-refugee-students", destination: "/countries/USA", permanent: true },
      { source: "/blog/turkey-research-funding-asylum-seekers-somalia", destination: "/countries/Turkey", permanent: true },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/googledf0cd3d970dff8cd.html",
        destination: "/googledf0cd3d970dff8cd",
      },
    ];
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
