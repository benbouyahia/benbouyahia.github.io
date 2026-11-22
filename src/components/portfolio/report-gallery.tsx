import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Maximize2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { GalleryCopy } from "@/lib/reports";

type GalleryItem = {
  name: string;
  image: string;
  alt: string;
  description: string;
  keyVisuals: readonly string[];
  audience?: string;
};

const pad = (value: number) => String(value).padStart(2, "0");

function useGallery(length: number) {
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const opener = useRef<HTMLElement | null>(null);
  const openAt = (index: number) => {
    opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setSelected(index);
    setOpen(true);
  };
  const move = (direction: number) =>
    setSelected((current) => (current + direction + length) % length);
  return { selected, open, setOpen, openAt, move, opener };
}

function GalleryDialog({
  items,
  copy,
  gallery,
}: {
  items: readonly GalleryItem[];
  copy: GalleryCopy;
  gallery: ReturnType<typeof useGallery>;
}) {
  const item = items[gallery.selected] ?? items[0];
  if (!item) return null;
  return (
    <Dialog open={gallery.open} onOpenChange={gallery.setOpen}>
      <DialogContent
        className="gallery-dialog"
        data-lenis-prevent
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          gallery.opener.current?.focus();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") gallery.move(1);
          if (event.key === "ArrowLeft") gallery.move(-1);
        }}
      >
        <DialogTitle>{item.name}</DialogTitle>
        <DialogDescription className="sr-only">{copy.description}</DialogDescription>
        <img key={item.image} className="gallery-full-image" src={item.image} alt={item.alt} />
        <div className="gallery-dialog-footer">
          <span>
            {pad(gallery.selected + 1)} / {pad(items.length)} · {copy.caption}
          </span>
          <div>
            <Button
              variant="ghost"
              size="icon"
              aria-label={`Previous ${copy.noun}`}
              title={`Previous ${copy.noun}`}
              onClick={() => gallery.move(-1)}
            >
              <ArrowLeft />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label={`Next ${copy.noun}`}
              title={`Next ${copy.noun}`}
              onClick={() => gallery.move(1)}
            >
              <ArrowRight />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Report pages shown one after another, each large enough to read, with its purpose and
// key visuals beneath. Any image opens full size in a dialog that pages through the set.
export function DashboardPageGallery({
  items,
  copy,
  width,
  height,
}: {
  items: readonly GalleryItem[];
  copy: GalleryCopy;
  width: number;
  height: number;
}) {
  const gallery = useGallery(items.length);
  return (
    <div className="dashboard-page-gallery case-wide">
      <ol className="dashboard-page-list">
        {items.map((page, index) => (
          <li className="dashboard-page-item" key={page.name} data-reveal>
            <Button
              type="button"
              variant="ghost"
              className="image-open dashboard-page-image"
              aria-label={`Open full-size ${page.name} ${copy.noun}`}
              onClick={() => gallery.openAt(index)}
            >
              <img src={page.image} alt={page.alt} width={width} height={height} loading="lazy" />
              <span className="report-enlarge">
                <Maximize2 size={16} />
              </span>
            </Button>
            <div className="dashboard-page-copy">
              <div>
                <span className="dashboard-page-number">
                  {pad(index + 1)}
                  {page.audience ? ` · ${page.audience.toUpperCase()}` : null}
                </span>
                <h3>{page.name}</h3>
                <p>{page.description}</p>
              </div>
              <ul aria-label={`${page.name} key visuals`}>
                {page.keyVisuals.map((visual) => (
                  <li key={visual}>{visual}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
      <GalleryDialog items={items} copy={copy} gallery={gallery} />
    </div>
  );
}
