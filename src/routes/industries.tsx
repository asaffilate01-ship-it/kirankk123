import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { industries } from "@/components/site-data";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries | iTechLounge technology by sector" },
      {
        name: "description",
        content:
          "Technology shaped around hospitality, retail, events, education, property and professional services.",
      },
      { property: "og:title", content: "Industries | iTechLounge" },
      {
        property: "og:description",
        content: "Sector-shaped technology for hospitality, retail, events, education and more.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://itechlounge.co.uk/industries" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "keywords", content: "software for retail, healthcare software, property software, jobs platforms, travel technology, education software" },
    ],
    links: [{ rel: "canonical", href: "https://itechlounge.co.uk/industries" }],
  }),
  component: IndustriesPage,
});

function IndustriesPage() {
  return (
    <main className="innerPage">
      <div className="innerHero">
        <span className="kicker">Industries</span>
        <h1>Technology shaped around your sector.</h1>
        <p>
          Different industries have different customers, teams and workflows. We adapt our services
          around those realities.
        </p>
        <Link to="/contact">
          Talk about your industry <ArrowRight />
        </Link>
      </div>
      <div className="industryPageGrid">
        {industries.map(([I, n, t, d]) => (
          <article key={n}>
            <I />
            <span>{t}</span>
            <h2>{n}</h2>
            <p>{d}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
