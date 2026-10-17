import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Maximize2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { customerFeedbackPages, reports } from "@/lib/reports";

export function ReportGallery({ compact = false }: { compact?: boolean }) {
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const opener = useRef<HTMLElement | null>(null);
  const openReport = (index: number) => {
    opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setSelected(index);
    setOpen(true);
  };
  const report = reports[selected] ?? reports[0];
  const move = (direction: number) =>
    setSelected((current) => (current + direction + reports.length) % reports.length);
  return (
    <div className={compact ? "report-gallery report-gallery-compact" : "report-gallery"}>
      {!compact && (
        <div className="gallery-heading">
          <div>
            <span className="eyebrow">DASHBOARD COLLECTION</span>
            <h2>Three perspectives. One marketplace.</h2>
          </div>
          <span className="gallery-count">03 REPORT PAGES</span>
        </div>
      )}
      {compact ? (
        <>
          <Button
            variant="ghost"
            className="image-open compact-report"
            aria-label={`Enlarge ${report.name}`}
            onClick={() => openReport(selected)}
          >
            <img src={report.image} alt={report.alt} width={1200} height={675} />
            <span className="report-enlarge">
              <Maximize2 size={16} />
            </span>
          </Button>
          <div className="report-thumbnails">
            {reports.map((item, index) => (
              <Button
                key={item.name}
                variant="ghost"
                className="report-thumbnail"
                aria-pressed={selected === index}
                onClick={() => setSelected(index)}
              >
                <img src={item.image} alt="" width={240} height={135} />
                <span>{item.name}</span>
              </Button>
            ))}
          </div>
        </>
      ) : (
        <div className="report-grid">
          {reports.map((item, index) => (
            <article className="report-page" key={item.name}>
              <Button
                variant="ghost"
                className="image-open"
                aria-label={`Enlarge ${item.name}`}
                onClick={() => openReport(index)}
              >
                <img src={item.image} alt={item.alt} width={1200} height={675} loading="lazy" />
                <span className="report-enlarge">
                  <Maximize2 size={16} />
                </span>
              </Button>
              <div className="report-page-copy">
                <span className="eyebrow">REPORT / 0{index + 1}</span>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <Button variant="ghost" className="text-link" onClick={() => openReport(index)}>
                  View report <Maximize2 size={14} />
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="gallery-dialog"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            opener.current?.focus();
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") move(1);
            if (event.key === "ArrowLeft") move(-1);
          }}
        >
          <DialogTitle>{report.name}</DialogTitle>
          <DialogDescription className="sr-only">
            Original Power BI report. Figures reflect its selected filters.
          </DialogDescription>
          <img className="gallery-full-image" src={report.image} alt={report.alt} />
          <div className="gallery-dialog-footer">
            <span>
              0{selected + 1} / 0{reports.length} · Original Power BI report
            </span>
            <div>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Previous report"
                title="Previous report"
                onClick={() => move(-1)}
              >
                <ArrowLeft />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Next report"
                title="Next report"
                onClick={() => move(1)}
              >
                <ArrowRight />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function DashboardPageGallery({ compact = false }: { compact?: boolean }) {
  const [selectedPage, setSelectedPage] = useState<(typeof customerFeedbackPages)[number]>(
    customerFeedbackPages[0],
  );
  const [open, setOpen] = useState(false);

  return (
    <div
      className={
        compact
          ? "dashboard-page-gallery dashboard-page-gallery--compact"
          : "dashboard-page-gallery"
      }
    >
      {!compact && (
        <div className="gallery-heading">
          <div>
            <span className="eyebrow">REPORT STRUCTURE</span>
            <h2>Five views of customer feedback</h2>
          </div>
          <span className="gallery-count">05 REPORT PAGES</span>
        </div>
      )}
      <ol className="dashboard-page-list">
        {customerFeedbackPages.map((page, index) => (
          <li className="dashboard-page-item" key={page.name}>
            <span className="dashboard-page-number">{String(index + 1).padStart(2, "0")}</span>
            <Button
              type="button"
              variant="ghost"
              className="dashboard-page-image"
              aria-label={`Open full-size ${page.name} dashboard screenshot`}
              onClick={() => {
                setSelectedPage(page);
                setOpen(true);
              }}
            >
              <img src={page.image} alt={page.alt} loading="lazy" />
            </Button>
            <div className="dashboard-page-copy">
              <h3>{page.name}</h3>
              {!compact && <p>{page.description}</p>}
              {!compact && (
                <ul>
                  {page.keyVisuals.map((visual) => (
                    <li key={visual}>{visual}</li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="gallery-dialog">
          <DialogTitle>{selectedPage.name}</DialogTitle>
          <DialogDescription className="sr-only">
            Full-size Attijari Bank customer feedback dashboard screenshot.
          </DialogDescription>
          <img className="gallery-full-image" src={selectedPage.image} alt={selectedPage.alt} />
          <div className="gallery-dialog-footer">
            <span>Power BI report page · {selectedPage.name}</span>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
