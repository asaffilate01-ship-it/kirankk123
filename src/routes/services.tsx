import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";

import { groups } from "@/components/site-data";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services | iTechLounge — AI, software, web and cloud" },
      {
        name: "description",
        content:
          "AI and automation, software and SaaS platforms, web and mobile apps, commerce, cloud and ongoing support from iTechLounge.",
      },
      { property: "og:title", content: "Services | iTechLounge" },
      {
        property: "og:description",
        content: "Digital capability brought together: AI, software, web, commerce and cloud.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://itechlounge.co.uk/services" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "keywords", content: "software development services, AI integration, web design, mobile app development, cloud hosting, ecommerce build" },
    ],
    links: [{ rel: "canonical", href: "https://itechlounge.co.uk/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <main className="innerPage">
      <div className="innerHero">
        <span className="kicker">Our services</span>
        <h1>Digital capability, brought together.</h1>
        <p>
          Choose one focused service or bring us a wider challenge. We provide the strategy, design
          and technology needed to move it forward.
        </p>
        <Link to="/contact">
          Discuss what you need <ArrowRight />
        </Link>
      </div>
      <div className="serviceGroups">
        {groups.map(([t, items], i) => (
          <article key={t}>
            <span>0{i + 1}</span>
            <h2>{t}</h2>
            <ul>
              {items.map((x) => (
                <li key={x}>
                  <Check />
                  {x}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <div className="simpleCta">
        <div>
          <span className="kicker light">Not sure where to start?</span>
          <h2>Tell us the outcome you need.</h2>
        </div>
        <Link to="/contact">
          Start a conversation <ArrowRight />
        </Link>
      </div>
    </main>
  );
}
