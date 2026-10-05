import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    // Projects are listed on the home page; only /projects/<slug> is a real page.
    return [{ source: "/projects", destination: "/#projects", permanent: false }];
  },
};

export default nextConfig;
