import { Link } from "@tanstack/react-router";
import { ArrowRight,ChevronDown,Mail,MapPin,Menu,Send,ShieldCheck,X } from "lucide-react";
import { useEffect,useState } from "react";
import { AccessMenu } from "./workspace-navigation";

import { areas } from "./expertise";

import logoAssetDe from "@/assets/itechlounge-logo-de.png.asset.json";
import logoAsset from "@/assets/itechlounge-logo-en.png.asset.json";
import { openCookieSettings } from "@/lib/cookie-consent";
import { getLocale,LANGUAGE_CHANGE_EVENT,setLanguage,translateTree } from "@/lib/corporate-i18n";
import { services } from "./site-data";

export function Logo({ footer = false, hero = false }: { footer?: boolean; hero?: boolean }) {
  const [de, setDe] = useState(false);
  useEffect(() => {
    const syncLanguage = () => setDe(getLocale() === "de");
    syncLanguage();
    window.addEventListener(LANGUAGE_CHANGE_EVENT, syncLanguage);
    return () => window.removeEventListener(LANGUAGE_CHANGE_EVENT, syncLanguage);
  }, []);
  return (
    <img
      className={`siteLogo${footer ? " footerLogo" : ""}${hero ? " heroLogo" : ""}`}
      src={de ? logoAssetDe.url : logoAsset.url}
      alt={
        de
          ? "iTechLounge – Digitale Ideen. Wunderschön umgesetzt."
          : "iTechLounge – Digital ideas. Beautifully built."
      }
    />
  );
}

function LanguageSwitch() {
  const [lang, setLang] = useState<"en" | "de">("en");
  useEffect(() => {
    const syncLanguage = () => setLang(getLocale());
    syncLanguage();
    window.addEventListener(LANGUAGE_CHANGE_EVENT, syncLanguage);
    return () => window.removeEventListener(LANGUAGE_CHANGE_EVENT, syncLanguage);
  }, []);
  return (
    <div className="languageSwitch" aria-label="Language">
      {(["en", "de"] as const).map((l) => (
        <button
          key={l}
          type="button"
          className={lang === l ? "active" : ""}
          onClick={(e) => {
            e.stopPropagation();
            setLanguage(l);
          }}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

function I18nObserver() {
  useEffect(() => {
    translateTree();
    const handleLanguageChange = () => translateTree();
    window.addEventListener(LANGUAGE_CHANGE_EVENT, handleLanguageChange);
    const observer = new MutationObserver((entries) =>
      entries.forEach((entry) => entry.addedNodes.forEach((node) => translateTree(node))),
    );
    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      window.removeEventListener(LANGUAGE_CHANGE_EVENT, handleLanguageChange);
      observer.disconnect();
    };
  }, []);
  return null;
}

const navLinks: [string, string][] = [
  ["/", "Home"],
  ["/services", "Services"],
  ["/industries", "Industries"],
  ["/about", "About"],
  ["/portfolio", "Portfolio"],
];

const Facebook = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v7h4v-7h3l1-4h-4V9c0-.7.3-1 1-1Z" className="fillMark" />
  </svg>
);
const Instagram = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" className="fillMark" />
  </svg>
);
const TikTok = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M15 4v11.5a4.5 4.5 0 1 1-4-4.47M15 4c.7 3.1 2.4 4.7 5 5" />
  </svg>
);
const Youtube = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="2.5" y="5" width="19" height="14" rx="4" />
    <path d="m10 9 5 3-5 3Z" className="fillMark" />
  </svg>
);

const socials: [React.ComponentType, string, string][] = [
  [Facebook, "Facebook", "https://www.facebook.com/itechlounge"],
  [Instagram, "Instagram", "https://www.instagram.com/itechlounge"],
  [X, "X", "https://x.com/itechlounge"],
  [TikTok, "TikTok", "https://www.tiktok.com/@itechlounge"],
  [Youtube, "YouTube", "https://www.youtube.com/@itechlounge"],
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  return (
    <header className="nav">
      <I18nObserver />
      <Link to="/">
        <Logo />
      </Link>
      <button className="menu" onClick={() => setOpen(!open)} aria-label="Menu">
        {open ? <X /> : <Menu />}
      </button>
      <nav
        className={open ? "links open" : "links"}
        onClick={() => {
          setOpen(false);
          setExpanded(false);
        }}
      >
        <Link to="/">Home</Link>
        <div className="expertiseMenu" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls="expertise-menu"
            onClick={() => setExpanded(!expanded)}
          >
            Expertise
            <ChevronDown size={16} className={expanded ? "rotated" : ""} />
          </button>
          {expanded && (
            <div className="megaPanel" id="expertise-menu">
              <div className="megaIntro">
                <small>HOW WE CAN HELP</small>
                <strong>Technology, built around you.</strong>
                <Link to="/services" onClick={() => setExpanded(false)}>
                  All services <ArrowRight size={16} />
                </Link>
              </div>
              <div className="megaAreas">
                {areas.map(({ id, name, Icon, title }) => (
                  <Link
                    key={id}
                    to="/"
                    hash={id}
                    onClick={() => {
                      setExpanded(false);
                      setOpen(false);
                    }}
                  >
                    <Icon />
                    <span>
                      {title}
                      <small>{name} · Virtual guide</small>
                    </span>
                    <ArrowRight size={16} />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
        {navLinks.slice(1).filter(([url]) => url !== "/portfolio").map(([u, n]) => (
          <Link key={u} to={u}>
            {n}
          </Link>
        ))}
        <div onClick={(event) => event.stopPropagation()}><AccessMenu /></div>
        <LanguageSwitch />
        <Link className="navCta" to="/contact">
          Discuss your project <ArrowRight size={16} />
        </Link>
      </nav>
    </header>
  );
}

export function ContactSection({ full = false }: { full?: boolean }) {
  const [de, setDe] = useState(false);
  useEffect(() => setDe(getLocale() === "de"), []);
  const email = de ? "hallo@itechlounge.de" : "hello@itechlounge.co.uk";
  const [f, setF] = useState({
    name: "",
    business: "",
    email: "",
    service: "",
    message: "",
    consent: false,
  });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    location.href = `mailto:${email}?subject=${encodeURIComponent(
      (de ? "Projektanfrage — " : "Project enquiry — ") + f.name,
    )}&body=${encodeURIComponent(
      `Name: ${f.name}\n${de ? "Unternehmen" : "Business"}: ${f.business}\nE-Mail: ${f.email}\n${de ? "Leistung" : "Service"}: ${f.service}\n\n${f.message}`,
    )}`;

  };
  return (
    <section className={full ? "contactSection contactPage" : "contactSection"}>
      <div className="contactIntro">
        <span className="kicker light">Start a conversation</span>
        <h2>Tell us what you want to improve or build.</h2>
        <p>
          You do not need a technical specification. Start with the business problem, opportunity or
          customer experience.
        </p>
        <div className="contactDetails">
          <a href={`mailto:${email}`}>
            <Mail />
            <span>
              <small>Email</small>
              {email}
            </span>
          </a>
          <div>
            <MapPin />
            <span>
              <small>Location</small>United Kingdom & Germany
            </span>
          </div>
        </div>
      </div>
      <form className="contactForm" onSubmit={submit}>
        <div className="fieldRow">
          <label>
            Your name
            <input required value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
          </label>
          <label>
            Business
            <input value={f.business} onChange={(e) => setF({ ...f, business: e.target.value })} />
          </label>
        </div>
        <label>
          Email
          <input
            required
            type="email"
            value={f.email}
            onChange={(e) => setF({ ...f, email: e.target.value })}
          />
        </label>
        <label>
          Area of interest
          <select
            required
            value={f.service}
            onChange={(e) => setF({ ...f, service: e.target.value })}
          >
            <option value="">Choose an area</option>
            {services.map((x) => (
              <option key={x[1]}>{x[1]}</option>
            ))}
            <option>Something else</option>
          </select>
        </label>
        <label>
          How can we help?
          <textarea
            required
            rows={5}
            value={f.message}
            onChange={(e) => setF({ ...f, message: e.target.value })}
          />
        </label>
        <label className="consent">
          <input
            required
            type="checkbox"
            checked={f.consent}
            onChange={(e) => setF({ ...f, consent: e.target.checked })}
          />
          <span>I agree that iTechLounge may use these details to respond.</span>
        </label>
        <button>
          Prepare enquiry <Send size={17} />
        </button>
      </form>
    </section>
  );
}

export function Restricted({ name }: { name: string }) {
  return (
    <main className="restricted">
      <div className="restrictedCard">
        <Logo />
        <span className="secureBadge">
          <ShieldCheck /> Secure area
        </span>
        <h1>{name}</h1>
        <p>This area is private and available only to authorised iTechLounge users.</p>
        <Link to="/">
          <button>Return to public website</button>
        </Link>
        <small>Live authentication will be connected before protected content is deployed.</small>
      </div>
    </main>
  );
}

export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="corporate-site app">
      <Header />
      {children}
      <footer className="siteFooter">
        <div className="footerIdentity">
          <Logo footer />
          <p>Digital ideas. Beautifully built.</p>
        </div>
        <div className="footerAddresses">
          <address>
            <strong>iTechLounge</strong>
            <span>3rd Floor, 45 Albemarle Street</span>
            <span>Mayfair, London, England, W1S 4JL</span>
          </address>
          <address>
            <strong>iTechLounge Digitallösungen GmbH</strong>
            <span>Berlin, Germany</span>
          </address>
        </div>
        <div className="footerActions">
          <div className="socialLinks" aria-label="iTechLounge social media">
            {socials.map(([I, n, u]) => (
              <a
                key={n}
                href={u}
                target="_blank"
                rel="noreferrer"
                aria-label={`iTechLounge on ${n}`}
                title={n}
              >
                <I />
              </a>
            ))}
          </div>
          <div className="legalLinks">
            <Link to="/portfolio">Portfolio</Link>
            <Link to="/marketing">Marketing</Link>
            <Link to="/investment">Investor</Link>
            <span>© 2026 iTechLounge</span>
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/cookies">Cookies</Link>
            <button onClick={openCookieSettings}>Cookie settings</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
