import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Permit local network device preview and Turbopack HMR over LAN during development
  allowedDevOrigins: ["192.168.68.111"],
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
