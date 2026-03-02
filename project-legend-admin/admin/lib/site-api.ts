/**
 * Base URL of the project-legend site (the main public website).
 * All admin API calls go to this origin.
 */
export function getSiteApiUrl(): string {
  if (typeof window !== "undefined") {
    return process.env.NEXT_PUBLIC_SITE_API_URL || "http://localhost:3000";
  }
  return process.env.NEXT_PUBLIC_SITE_API_URL || "http://localhost:3000";
}

/** Main site URL for "Back to site" link */
export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_SITE_API_URL || "http://localhost:3000";
}
