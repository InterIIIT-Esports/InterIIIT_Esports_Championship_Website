export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://esports.iiitiansnetwork.in";

  const routes = [
    "",
    "/event-details",
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
    "/rules",
    "/conduct",
    "/privacy",
    "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  return routes;
}
