import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  certifications,
  education,
  pageHead,
  siteUrl,
  story,
  toolset,
  work,
} from "@/lib/portfolio";
import { projectSlides } from "@/lib/showcase";
import { ToolLogo } from "@/components/portfolio/tool-logos";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("matches the Attijari customer feedback case study", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/projects/attijari");

    expect(matches.at(-1)?.routeId).toBe("/projects/attijari");
  });

  it("provides branded certification metadata for polished logo badges", () => {
    expect(certifications[0]).toMatchObject({
      brand: "Microsoft",
      logoText: "MS",
      variant: "microsoft",
      status: "Certified",
    });
    expect(certifications.every((item) => item.logoText && item.variant)).toBe(true);
  });

  it("links every home carousel slide to its case-study route", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    for (const slide of projectSlides) {
      expect(router.matchRoutes(slide.to).at(-1)?.routeId).toBe(slide.to);
      expect(slide.pages.length).toBeGreaterThan(0);
    }
  });

  it("points canonical links at the slash-ending addresses GitHub Pages serves", () => {
    const head = pageHead({ title: "About", description: "About page", path: "/about" });

    expect(head.links).toEqual([{ rel: "canonical", href: `${siteUrl}/about/` }]);
    expect(head.meta).toContainEqual({ property: "og:url", content: `${siteUrl}/about/` });
    expect(head.meta).toContainEqual({ property: "og:image", content: `${siteUrl}/og-image.png` });
  });

  it("lists only real pages in the sitemap", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    const sitemap = readFileSync(resolve(__dirname, "../../public/sitemap.xml"), "utf8");
    const paths = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) =>
      match[1]!.replace(siteUrl, ""),
    );

    expect(paths).toHaveLength(7);
    for (const path of paths) {
      expect(path.endsWith("/")).toBe(true);
      expect(router.matchRoutes(path).at(-1)?.routeId).not.toBe(rootRouteId);
    }
  });

  it("tells every role and degree somewhere in the home story", () => {
    const told = story.flatMap((chapter) => chapter.evidence);

    for (const item of [...work, ...education]) {
      expect(told).toContainEqual(item);
    }
  });

  it("has a logo or icon for every tool named on the site", () => {
    const tools = new Set([...toolset, ...projectSlides.flatMap((slide) => slide.tools)]);

    for (const tool of tools) {
      expect(ToolLogo({ tool }), tool).not.toBeNull();
    }
  });
});
