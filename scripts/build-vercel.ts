// Materialize portfolio media for self-hosting: Lovable's media proxy is not
// available on third-party hosts. These are the owner's original public assets.
import { mkdir } from "node:fs/promises";
const images = [
  "olist-dashboard.png",
  "Sales-analysis.png",
  "Customer-service.png",
  "linkedin_profile_high_quality.png",
];
await mkdir("public/images", { recursive: true });
await Promise.all(
  images.map(async (name) => {
    const response = await fetch(
      `https://raw.githubusercontent.com/benbouyahia/benbouyahia.github.io/main/images/${name}`,
    );
    if (!response.ok) throw new Error(`Could not download portfolio image: ${name}`);
    await Bun.write(`public/images/${name}`, await response.arrayBuffer());
  }),
);
const child = Bun.spawn(["bun", "run", "build"], {
  env: { ...process.env, NITRO_PRESET: "vercel", VITE_SELF_HOSTED: "true" },
  stdout: "inherit",
  stderr: "inherit",
});
process.exit(await child.exited);
