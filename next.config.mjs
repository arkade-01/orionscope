/** @type {import('next').NextConfig} */
const nextConfig = {
  // The design uses plain <img> with a runtime fallback for optional assets,
  // so we skip next/image optimization and the Google-fonts eslint image rule.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
