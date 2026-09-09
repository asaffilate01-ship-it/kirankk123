import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLang } from "@/lib/i18n";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Eye, EyeOff, LockKeyhole, ShieldCheck } from "lucide-react";
import { useState, type FormEvent } from "react";
import { WorkspaceHeader, workspaceAreas, type WorkspaceArea } from "./workspace-navigation";

const copy = {
  portfolio: {
    en: [
      "Explore our portfolio.",
      "Discover our brands, the people they serve and the services they bring to market.",
      "Open portfolio",
    ],
    de: [
      "Unser Portfolio entdecken.",
      "Entdecken Sie unsere Marken, ihre Zielgruppen und ihre Dienstleistungen.",
      "Portfolio öffnen",
    ],
  },
  investor: {
    en: [
      "See the bigger picture.",
      "Explore the financial model, investment plans and detailed forecasts for every brand.",
      "Open investor dashboard",
    ],
    de: [
      "Das Gesamtbild verstehen.",
      "Entdecken Sie das Finanzmodell, Investitionspläne und detaillierte Prognosen für jede Marke.",
      "Investorenbereich öffnen",
    ],
  },
  marketing: {
    en: [
      "Turn strategy into action.",
      "Access brand marketing plans, campaign priorities and the next steps for each market.",
      "Open marketing workspace",
    ],
    de: [
      "Strategie in die Tat umsetzen.",
      "Öffnen Sie Markenmarketingpläne, Kampagnenprioritäten und nächste Schritte für jeden Markt.",
      "Marketingbereich öffnen",
    ],
  },
};
export function WorkspaceAccess({
  area,
  action,
  onSubmit,
  busy,
  error,
  returnTo,
}: {
  area: WorkspaceArea;
  action: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  busy: boolean;
  error?: string;
  returnTo?: string;
}) {
  const { lang } = useLang();
  const [show, setShow] = useState(false);
  const [caps, setCaps] = useState(false);
  const [edited, setEdited] = useState(false);
  const item = workspaceAreas.find((x) => x.id === area)!;
  const [headline, description, cta] = copy[area][lang];
  const activeError = !edited && error;
  return (
    <>
      <WorkspaceHeader area={area} title={lang === "de" ? item.de : item.en} />
      <main id="workspace-main" className="workspace-access" tabIndex={-1}>
        <section className="access-story">
          <span className="access-eyebrow">
            iTechLounge · {lang === "de" ? "Privater Zugang" : "Private access"}
          </span>
          <h1>{headline}</h1>
          <p>{description}</p>
          <div className="access-assurance">
            <ShieldCheck size={21} />
            <span>
              {lang === "de"
                ? "Jeder Bereich hat einen eigenen Zugang. Verwenden Sie das Passwort für den gewählten Bereich."
                : "Each area has its own access. Use the password for the area you have selected."}
            </span>
          </div>
          <Link to="/">
            {lang === "de" ? "Zurück zur Startseite" : "Back to the homepage"}
            <ArrowRight size={16} />
          </Link>
        </section>
        <Card className="access-card">
          <div className="access-lock">
            <LockKeyhole size={23} />
          </div>
          <h2>{lang === "de" ? `${item.de} — Zugang` : `${item.en} access`}</h2>
          <p>
            {lang === "de"
              ? "Geben Sie Ihr Zugangspasswort ein."
              : "Enter your access password to continue."}
          </p>
          <form
            method="post"
            action={action}
            onSubmit={(e) => {
              setEdited(false);
              onSubmit(e);
            }}
            aria-busy={busy}
          >
            {returnTo && <input type="hidden" name="returnTo" value={returnTo} />}
            <label htmlFor="access-password">{lang === "de" ? "Passwort" : "Password"}</label>
            <div className="access-password">
              <Input
                id="access-password"
                name="password"
                type={show ? "text" : "password"}
                autoComplete="current-password"
                required
                disabled={busy}
                aria-invalid={activeError === "invalid"}
                aria-describedby="access-feedback"
                onChange={() => setEdited(true)}
                onKeyUp={(e) => setCaps(e.getModifierState("CapsLock"))}
                onKeyDown={(e) => setCaps(e.getModifierState("CapsLock"))}
                onBlur={() => setCaps(false)}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                disabled={busy}
                onClick={() => setShow(!show)}
                aria-label={
                  lang === "de"
                    ? show
                      ? "Passwort verbergen"
                      : "Passwort anzeigen"
                    : show
                      ? "Hide password"
                      : "Show password"
                }
                aria-pressed={show}
              >
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </Button>
            </div>
            <div id="access-feedback" className="access-feedback" aria-live="polite">
              {caps && (
                <p>{lang === "de" ? "Feststelltaste ist aktiviert." : "Caps Lock is on."}</p>
              )}
              {activeError && (
                <p role="alert">
                  {activeError === "invalid"
                    ? lang === "de"
                      ? "Falsches Passwort. Prüfen Sie den gewählten Bereich und versuchen Sie es erneut."
                      : "Incorrect password. Check you have selected the right area and try again."
                    : lang === "de"
                      ? "Zugang vorübergehend nicht verfügbar. Bitte später erneut versuchen."
                      : "Access is temporarily unavailable. Please try again shortly."}
                </p>
              )}
            </div>
            <Button type="submit" disabled={busy} className="access-submit">
              {busy ? (lang === "de" ? "Wird geprüft…" : "Checking access…") : cta}
              <ArrowRight size={17} />
            </Button>
          </form>
          <p className="access-help">
            {lang === "de"
              ? "Kein Passwort? Wenden Sie sich an Ihren iTechLounge-Ansprechpartner."
              : "Need access? Ask your iTechLounge contact for the password."}
          </p>
        </Card>
      </main>
    </>
  );
}
