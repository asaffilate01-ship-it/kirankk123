import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  BrainCircuit,
  Check,
  ChevronDown,
  Cloud,
  CreditCard,
  MonitorSmartphone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";


import { ContactSection, Logo } from "@/components/site-chrome";
import { BackToTop } from "@/components/BackToTop";
import { Expertise } from "@/components/expertise";
import { faqs, services } from "@/components/site-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "iTechLounge | AI, software, web and cloud for business" },
      {
        name: "description",
        content:
          "iTechLounge plans, designs and builds AI, software, websites, apps, commerce and cloud services around your business goals.",
      },
      { property: "og:title", content: "iTechLounge | Digital ideas. Beautifully built." },
      {
        property: "og:description",
        content: "Technology that helps your business work better — planned, designed and built around your goals.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://itechlounge.co.uk/" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "keywords",
        content:
          "iTechLounge, software development UK, AI development, web design, mobile apps, cloud services, ecommerce development, digital agency Germany",
      },
    ],
    links: [{ rel: "canonical", href: "https://itechlounge.co.uk/" }],
  }),
  component: HomePage,
});

function Hero() {
  return (
    <section className="hero newHero premiumHero">
      <div className="heroMesh" aria-hidden="true" />
      <div className="heroCopy">
        <span className="heroOverline">Strategy · Design · Technology</span>
        <h1>
          Technology that helps your business <span>work better.</span>
        </h1>
        <p>
          AI, software, websites, apps, commerce and cloud services—planned clearly, designed
          thoughtfully and built around your goals.
        </p>
        <div className="heroActions">
          <Link className="primary" to="/contact">
            Discuss your project <ArrowRight />
          </Link>
          <Link className="secondary" to="/services">
            Explore services
          </Link>
        </div>
        <div className="trust">
          <span>
            <Check /> From idea to launch
          </span>
          <span>
            <Check /> Built to evolve
          </span>
          <span>
            <Check /> Ongoing support
          </span>
        </div>
      </div>
      <div className="heroBrand">
        <div className="brandHalo" aria-hidden="true" />
        <div className="orbit orbitOuter">
          <span>
            <BrainCircuit />
            AI
          </span>
          <span>
            <MonitorSmartphone />
            Apps
          </span>
          <span>
            <Cloud />
            Cloud
          </span>
          <span>
            <CreditCard />
            Commerce
          </span>
        </div>
        <div className="orbitInner" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <div className="brandCore">
          <Logo hero />
        </div>
        <div className="signalCard signalOne">
          <Sparkles />
          <span>
            <b>Thoughtful</b>
            <small>Design-led delivery</small>
          </span>
        </div>
        <div className="signalCard signalTwo">
          <ShieldCheck />
          <span>
            <b>Dependable</b>
            <small>Built for growth</small>
          </span>
        </div>
      </div>
    </section>
  );
}


const why: [string, string, string][] = [
  ["01", "Business first", "We begin with the result, not the software."],
  ["02", "Connected", "Your digital services work together."],
  ["03", "Clear delivery", "Priorities and progress stay visible."],
  ["04", "Built to evolve", "Your solution can grow over time."],
];

function HomePage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <>
      <Hero />
      <section className="logoStrip">
        <span>DISCOVER</span>
        <i />
        <span>DESIGN</span>
        <i />
        <span>BUILD</span>
        <i />
        <span>CONNECT</span>
        <i />
        <span>IMPROVE</span>
      </section>
      <Expertise />
      <section className="section">
        <div className="sectionHead">
          <div>
            <span className="kicker">What we do</span>
            <h2>One partner for your digital journey.</h2>
          </div>
          <p>
            Bring us one clear requirement or a wider business challenge. We bring together the
            services needed to move it forward.
          </p>
        </div>
        <div className="grid">
          {services.map(([I, t, d], i) => (
            <article className="card" key={t}>
              <span className="num">0{i + 1}</span>
              <div className="icon">
                <I />
              </div>
              <h3>{t}</h3>
              <p>{d}</p>
            </article>
          ))}
        </div>
        <Link className="sectionLink" to="/services">
          View all services <ArrowRight />
        </Link>
      </section>
      <section className="why">
        <div className="whyIntro">
          <div>
            <span className="kicker">Why iTechLounge</span>
            <h2>Clear thinking. Joined-up technology.</h2>
          </div>
          <p>
            We focus on useful outcomes, straightforward delivery and systems that can grow with
            your business.
          </p>
        </div>
        <div className="whyGrid">
          {why.map((x) => (
            <div key={x[0]}>
              <strong>{x[0]}</strong>
              <h3>{x[1]}</h3>
              <p>{x[2]}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="section faq">
        <div className="faqIntro">
          <span className="kicker">Common questions</span>
          <h2>A straightforward start.</h2>
          <p>We keep early conversations practical and free of unnecessary technical language.</p>
        </div>
        <div className="faqList">
          {faqs.map(([q, a], i) => (
            <article className={open === i ? "faqItem active" : "faqItem"} key={q}>
              <button onClick={() => setOpen(open === i ? null : i)}>
                <span>{q}</span>
                <ChevronDown />
              </button>
              {open === i && <p>{a}</p>}
            </article>
          ))}
        </div>
      </section>
      <ContactSection />
      <BackToTop />
    </>
  );
}
