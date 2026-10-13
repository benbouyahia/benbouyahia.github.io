import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { certifications } from "@/lib/portfolio";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
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
});
