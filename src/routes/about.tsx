import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Handshake, PackageCheck, Search, Sparkles, type LucideIcon } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About iTechLounge | Digital ideas, beautifully built" },
      {
        name: "description",
        content:
          "iTechLounge turns useful ideas into dependable digital services for businesses that want technology to simplify and grow.",
      },
      { property: "og:title", content: "About iTechLounge" },
      {
        property: "og:description",
        content: "We turn useful ideas into dependable digital services.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://itechlounge.co.uk/about" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "keywords", content: "iTechLounge about, digital product studio, UK software company, German software company" },
    ],
    links: [{ rel: "canonical", href: "https://itechlounge.co.uk/about" }],
  }),
  component: AboutPage,
});

const values: [LucideIcon, string, string][] = [
  [Search, "Understand", "We learn how the business and its users really work."],
  [Sparkles, "Shape", "We turn complexity into a clear product and delivery plan."],
  [PackageCheck, "Deliver", "We design, build, connect and test the complete experience."],
  [Handshake, "Stay involved", "We support and improve the service after launch."],
];

function AboutPage() {
  return (
    <main className="innerPage aboutPage">
      <div className="innerHero">
        <span className="kicker">About iTechLounge</span>
        <h1>We turn useful ideas into dependable digital services.</h1>
        <p>
          We work with businesses that want technology to simplify operations, improve customer
          experience and create room for growth.
        </p>
        <Link to="/contact">
          Work with us <ArrowRight />
        </Link>
      </div>
      <section className="aboutValues">
        {values.map(([I, t, d]) => (
          <article key={t}>
            <I />
            <h2>{t}</h2>
            <p>{d}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
