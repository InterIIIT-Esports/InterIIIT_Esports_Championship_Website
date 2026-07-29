export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://iec-esports.in";

  const routes = [
    "",
    "/iec-team",
    "/join-iec",
    "/leaderboard",
    "/participating-colleges",
    "/participating-teams",
    "/register",
    "/register-college",
    "/support",
    "/games/bgmi",
    "/games/ff",
    "/games/valo",
    "/event-details",
    "/sitemap-page",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: route === "" ? 1.0 : 0.8,
  }));

  return routes;
}
