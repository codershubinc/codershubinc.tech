import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'github-readme-states-repo-self-inst.vercel.app',
      "opengraph.githubassets.com",
      "i.scdn.co",
      "img.shields.io",
      "cdn.jsdelivr.net"
    ],
  },
};

export default nextConfig;
