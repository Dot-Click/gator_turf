import type { NextConfig } from "next";

// The site renders entirely from lib/content.json: no route handlers, server
// actions, database reads or request-time APIs. Exporting it as static HTML
// lets any CDN serve it, which is what the Vercel deployment expects.
//
// Do NOT set `trailingSlash: true` here. vinext 1.0.0-beta.5 prerenders each
// route by requesting it from a local production server, and trailingSlash
// makes that server answer 308 instead of rendering, so every route fails with
// "RSC handler returned 308" and the export aborts. Trailing-slash canonical
// URLs are enforced by vercel.json instead, which serves `faqs.html` at
// `/faqs/` and matches the trailing-slash links used throughout the site.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
