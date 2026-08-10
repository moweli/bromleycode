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
  async redirects() {
    return [
      // The two service slugs changed when data engineering was promoted to the
      // lead practice. Permanent, because the old paths were published and are
      // in the sitemap crawlers already hold.
      {
        source: "/services/data-pipeline-engineering",
        destination: "/services/data-platform-engineering",
        permanent: true,
      },
      {
        source: "/services/ai-strategy-roadmap",
        destination: "/services/data-ai-strategy",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
