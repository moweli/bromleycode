import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // The tab icon is generated at /icon and linked from the document head,
      // which is what browsers actually use. Crawlers, feed readers and older
      // clients still request /favicon.ico by convention, so point it at the
      // same image rather than leaving a 404 in the logs. Browsers accept a PNG
      // served from that path.
      { source: "/favicon.ico", destination: "/icon" },
    ];
  },
};

export default nextConfig;
