import { createFileRoute } from "@tanstack/react-router";
import { Github, Linkedin, ArrowUpRight, MapPin } from "lucide-react";
import { PageIntro, Availability } from "@/components/portfolio/shell";
import { pageHead, identity } from "@/lib/portfolio";
export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead(
      "Let’s talk",
      "Connect with Ayoub Ben Bouyahia on LinkedIn or GitHub about Business Intelligence and Data Analyst opportunities.",
    ),
  component: Contact,
});
function Contact() {
  return (
    <main>
      <PageIntro label="GET IN TOUCH" title="Good conversations lead to great work.">
        Have an opportunity, a business question, or a shared interest in data? Let’s connect.
      </PageIntro>
      <section className="container contact-layout">
        <div className="contact-message">
          <Availability />
          <h2>Get in touch.</h2>
          <p>
            I’m open to Business Intelligence, Data Analyst, and BI Developer roles. I bring a
            business-first perspective to SQL, Power BI, and reporting.
          </p>
          <div className="portrait-caption">
            <MapPin size={14} /> Based in Tunis, Tunisia
          </div>
        </div>
        <div className="contact-links">
          <a className="contact-link" href={identity.linkedin} target="_blank" rel="noreferrer">
            <Linkedin size={24} />
            <div>
              <h3>Connect on LinkedIn</h3>
              <p>Opportunities, ideas, and conversations.</p>
            </div>
            <ArrowUpRight size={20} />
          </a>
          <a className="contact-link" href={identity.github} target="_blank" rel="noreferrer">
            <Github size={24} />
            <div>
              <h3>Explore my GitHub</h3>
              <p>The work behind the dashboards.</p>
            </div>
            <ArrowUpRight size={20} />
          </a>
        </div>
      </section>
    </main>
  );
}
