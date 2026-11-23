import { createFileRoute } from "@tanstack/react-router";
import { Github, Linkedin, ArrowUpRight, MapPin, Mail } from "lucide-react";
import { PageIntro, Availability } from "@/components/portfolio/shell";
import { pageHead, identity, roles, emailLink } from "@/lib/portfolio";
export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead({
      title: `Contact ${identity.name} | BI Analyst in Tunis`,
      fullTitle: true,
      description:
        "Hiring a Business Intelligence or Data Analyst in Tunis? Email Ayoub Ben Bouyahia, message him on LinkedIn, or browse his project files on GitHub.",
      path: "/contact",
    }),
  component: Contact,
});
function Contact() {
  return (
    <main>
      <PageIntro label="CONTACT" title="Hiring a BI analyst? Let’s talk." accent={["talk."]}>
        Email is the quickest way to reach me. You can also message me on LinkedIn.
      </PageIntro>
      <section className="container contact-layout">
        <div className="contact-message" data-stagger>
          <Availability />
          <h2>What to send me.</h2>
          <p>
            The role, the team, and what they report on today. I’m looking for a {roles} role. If
            you just want to compare notes on Power BI or DAX, that’s welcome too.
          </p>
          <div className="portrait-caption">
            <MapPin size={14} /> Based in {identity.location}
          </div>
        </div>
        <div className="contact-links" data-stagger>
          <a className="contact-link" href={emailLink}>
            <Mail size={24} />
            <div>
              <h3>Send me an email</h3>
              <p>{identity.email}</p>
            </div>
            <ArrowUpRight size={20} />
          </a>
          <a className="contact-link" href={identity.linkedin} target="_blank" rel="noreferrer">
            <Linkedin size={24} />
            <div>
              <h3>Message me on LinkedIn</h3>
              <p>Connect or send me a message.</p>
            </div>
            <ArrowUpRight size={20} />
          </a>
          <a className="contact-link" href={identity.github} target="_blank" rel="noreferrer">
            <Github size={24} />
            <div>
              <h3>Browse my GitHub</h3>
              <p>Project files behind the case studies.</p>
            </div>
            <ArrowUpRight size={20} />
          </a>
        </div>
      </section>
    </main>
  );
}
