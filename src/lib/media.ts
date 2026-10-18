// Use local public assets in all environments so portfolio images render reliably
// without the Lovable media proxy. The original hosted URLs remain available as a fallback.
export function portfolioMedia(asset: { url: string; original_filename: string }) {
  if (asset.original_filename) {
    return `/images/${asset.original_filename}`;
  }
  return asset.url;
}
