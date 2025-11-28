/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",     // allow any remote images if needed
      },
    ],
  },
};

export default nextConfig;
