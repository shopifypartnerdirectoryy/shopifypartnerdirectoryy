import { createFileRoute } from "@tanstack/react-router";
import { getRouterInstance } from "@tanstack/react-start";
import { experts } from "@/data/experts";
import { isSitemapRouteIncluded, sitemapPathForLocation, sitemapStaticPaths, sitemapXML, type SitemapEntry } from "@/lib/sitemap";

const BASE_URL = "https://shopifypartnerdirectoryy.lovable.app";

export const Route = createFileRoute("/sitemap.xml")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      GET: async () => {
        const router = await getRouterInstance();
        const entries: SitemapEntry[] = sitemapStaticPaths(router).map((path) => ({ path }));
        const route = router.routesById["/experts/$slug"];
        if (isSitemapRouteIncluded(route)) {
          for (const expert of experts) {
            const location = router.buildLocation({ to: "/experts/$slug", params: { slug: expert.slug }, search: () => ({}), hash: "" });
            const path = sitemapPathForLocation(router, location, "/experts/$slug");
            if (path) entries.push({ path });
          }
        }
        if (!entries.length) return new Response("No public pages configured", { status: 404 });
        return new Response(sitemapXML(BASE_URL, entries), { headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" } });
      },
    },
  },
});