import type { NextConfig } from "next";

// Turbopack is already disabled at runtime by using
// `next dev --webpack` / `next build --webpack` in package.json.
// We keep this config minimal to satisfy type checking.
const nextConfig: NextConfig = {};

export default nextConfig;
