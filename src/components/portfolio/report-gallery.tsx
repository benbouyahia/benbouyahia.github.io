import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Maximize2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { customerFeedbackPages, reports } from "@/lib/reports";

type GalleryItem = { name: string; image: string; alt: string };
type GalleryCopy = { description: string; caption: string; noun: string };

const olistCopy: GalleryCopy = {
  description: "Original Power BI report. Figures reflect its selected filters.",
  caption: "Original Power BI report",
  noun: "report",
};
const feedbackCopy: GalleryCopy = {
  description: "Full-size Attijari Bank customer feedback dashboard screenshot.",
  caption: "Power BI report page",
  noun: "page",
};

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
  const pad = (value: number) => String(value).padStart(2, "0");
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

export function ReportGallery() {
  const gallery = useGallery(reports.length);
  return (
    <div className="report-gallery">
      <div className="gallery-heading" data-reveal>
        <div>
          <span className="eyebrow">DASHBOARD COLLECTION</span>
          <h2>Three perspectives. One marketplace.</h2>
        </div>
        <span className="gallery-count">03 REPORT PAGES</span>
      </div>
      <div className="report-grid">
        {reports.map((item, index) => (
          <article className="report-page" key={item.name} data-reveal>
            <Button
              variant="ghost"
              className="image-open"
              aria-label={`Enlarge ${item.name}`}
              onClick={() => gallery.openAt(index)}
            >
              <img src={item.image} alt={item.alt} width={1300} height={727} loading="lazy" />
              <span className="report-enlarge">
                <Maximize2 size={16} />
              </span>
            </Button>
            <div className="report-page-copy">
              <span className="eyebrow">REPORT / 0{index + 1}</span>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <Button variant="ghost" className="text-link" onClick={() => gallery.openAt(index)}>
                View report <Maximize2 size={14} />
              </Button>
            </div>
          </article>
        ))}
      </div>
      <GalleryDialog items={reports} copy={olistCopy} gallery={gallery} />
    </div>
  );
}

export function DashboardPageGallery() {
  const gallery = useGallery(customerFeedbackPages.length);
  return (
    <div className="dashboard-page-gallery case-wide">
      <ol className="dashboard-page-list">
        {customerFeedbackPages.map((page, index) => (
          <li className="dashboard-page-item" key={page.name} data-reveal>
            <Button
              type="button"
              variant="ghost"
              className="image-open dashboard-page-image"
              aria-label={`Open full-size ${page.name} dashboard screenshot`}
              onClick={() => gallery.openAt(index)}
            >
              <img src={page.image} alt={page.alt} width={990} height={727} loading="lazy" />
              <span className="report-enlarge">
                <Maximize2 size={16} />
              </span>
            </Button>
            <div className="dashboard-page-copy">
              <span className="dashboard-page-number">{String(index + 1).padStart(2, "0")}</span>
              <h3>{page.name}</h3>
              <p>{page.description}</p>
              <ul>
                {page.keyVisuals.map((visual) => (
                  <li key={visual}>{visual}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
      <GalleryDialog items={customerFeedbackPages} copy={feedbackCopy} gallery={gallery} />
    </div>
  );
}
