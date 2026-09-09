import { Link } from "@tanstack/react-router";
import { ArrowRight, BrainCircuit, Cloud, MonitorSmartphone, Workflow, type LucideIcon } from "lucide-react";

import { PresenterVideo } from "./presenter-video";

export type Area = {
  id: string;
  name: string;
  Icon: LucideIcon;
  title: string;
  desc: string;
  items: string;
};

export const areas: Area[] = [
  {
    id: "ai",
    name: "Ada",
    Icon: BrainCircuit,
    title: "AI and innovation",
    desc: "Turn new possibilities into practical improvements for your business.",
    items: "AI strategy · Intelligent assistants · Knowledge tools",
  },
  {
    id: "cloud",
    name: "Miles",
    Icon: Cloud,
    title: "Cloud and connected systems",
    desc: "Bring your systems and information together, ready for what comes next.",
    items: "Cloud services · APIs · Data connections",
  },
  {
    id: "apps",
    name: "Aiza",
    Icon: MonitorSmartphone,
    title: "Apps and user experience",
    desc: "Make every interaction simpler, from the first visit to everyday use.",
    items: "Websites · Mobile apps · Ecommerce · UX design",
  },
  {
    id: "software",
    name: "Kai",
    Icon: Workflow,
    title: "Software and automation",
    desc: "Give your team better tools and more time for the work that matters.",
    items: "Business software · Workflows · Operational tools",
  },
];

export function Expertise() {
  return (
    <section className="expertise section" aria-labelledby="expertise-title">
      <div className="sectionHead">
        <div>
          <span className="kicker">Our expertise</span>
          <h2 id="expertise-title">Four areas. One connected approach.</h2>
        </div>
        <p>
          Explore what we can help you build, connect and improve. Meet your virtual guides along
          the way.
        </p>
      </div>
      <div className="expertiseGrid">
        {areas.map(({ id, name, Icon, title, desc, items }, i) => (
          <article className="expertiseCard" id={id} key={id}>
            <div className="expertiseTop">
              <span className="expertiseIcon">
                <Icon />
              </span>
              <span className="expertiseIndex">0{i + 1}</span>
            </div>
            <PresenterVideo name={name} />
            <h3>{title}</h3>
            <p>{desc}</p>
            <p className="expertiseItems">{items}</p>
            <Link to="/contact">
              Let’s talk
              <ArrowRight size={18} />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
