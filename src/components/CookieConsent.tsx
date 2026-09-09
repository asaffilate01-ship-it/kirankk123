import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { t } from "@/lib/i18n";
import {
  OPEN_SETTINGS_EVENT,
  acceptAll,
  readConsent,
  rejectAll,
  saveConsent,
} from "@/lib/cookie-consent";
import { Cookie, Settings2, ShieldCheck } from "lucide-react";

export function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [preferences, setPreferences] = useState(true);

  useEffect(() => {
    const existing = readConsent();
    if (!existing) setOpen(true);
    else {
      setAnalytics(existing.analytics);
      setPreferences(existing.preferences);
    }
    const handler = () => {
      const c = readConsent();
      setAnalytics(c?.analytics ?? false);
      setPreferences(c?.preferences ?? true);
      setSettings(true);
    };
    window.addEventListener(OPEN_SETTINGS_EVENT, handler);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, handler);
  }, []);

  function close() {
    setOpen(false);
    setSettings(false);
  }

  return (
    <>
      {open && !settings && (
        <aside className="fixed inset-x-0 bottom-0 z-[60] p-3 pb-[calc(0.75rem+var(--tabbar-h,0px)+env(safe-area-inset-bottom))] md:p-6 md:pb-6" aria-label={t("Cookie settings")}>
          <div className="cookie-premium mx-auto max-w-4xl border border-border bg-foreground p-5 text-background shadow-2xl md:p-6">
            <div className="flex items-start gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center border border-primary/40 bg-primary/10 text-primary">
                <Cookie className="h-5 w-5" />
              </span>
              <div className="min-w-0 text-sm text-muted-foreground">
                <p className="text-base font-semibold text-background">{t("Your privacy matters")}</p>
                <p className="mt-1 max-w-2xl leading-relaxed">
                  {t(
                    "Essential cookies keep you signed in and the dashboard secure. Optional cookies help us remember your language and understand usage.",
                  )}{" "}
                  <Link to="/cookies" className="font-medium text-primary underline underline-offset-4 hover:text-background">
                    {t("Cookie policy")}
                  </Link>
                </p>
              </div>
            </div>
            <div className="mt-5 grid gap-2 sm:flex sm:flex-wrap sm:justify-end">
              <Button
                size="sm"
                className="h-10 rounded-none px-5"
                onClick={() => {
                  acceptAll();
                  close();
                }}
              >
                {t("Accept all")}
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="h-10 rounded-none border-background/25 bg-transparent px-5 text-background hover:bg-background hover:text-foreground"
                onClick={() => {
                  rejectAll();
                  close();
                }}
              >
                {t("Essential only")}
              </Button>
              <Button size="sm" variant="ghost" className="h-10 rounded-none px-5 text-background hover:bg-background/10 hover:text-background" onClick={() => setSettings(true)}>
                <Settings2 />
                {t("Manage choices")}
              </Button>
            </div>
          </div>
        </aside>
      )}

      <Dialog open={settings} onOpenChange={(v) => (v ? setSettings(true) : close())}>
        <DialogContent className="max-w-md rounded-none border-border p-0 shadow-2xl">
          <DialogHeader>
            <div className="border-b bg-muted/50 p-6">
              <ShieldCheck className="mb-4 h-7 w-7 text-primary" />
              <DialogTitle className="text-2xl">{t("Cookie settings")}</DialogTitle>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t("Choose which optional cookies you allow. Essential protection always stays on.")}</p>
            </div>
          </DialogHeader>
          <div className="space-y-0 px-6 text-sm">
            <div className="flex items-start justify-between gap-4 border-b py-5">
              <div>
                <p className="font-medium">{t("Strictly necessary")}</p>
                <p className="text-xs text-muted-foreground">
                  {t("Login, security and session cookies. Always on.")}
                </p>
              </div>
              <Switch checked disabled aria-label={t("Strictly necessary")} />
            </div>
            <div className="flex items-start justify-between gap-4 border-b py-5">
              <div>
                <p className="font-medium">{t("Preferences")}</p>
                <p className="text-xs text-muted-foreground">
                  {t("Remembers your language and dashboard choices.")}
                </p>
              </div>
              <Switch checked={preferences} onCheckedChange={setPreferences} aria-label={t("Preferences")} />
            </div>
            <div className="flex items-start justify-between gap-4 py-5">
              <div>
                <p className="font-medium">{t("Analytics")}</p>
                <p className="text-xs text-muted-foreground">
                  {t("Anonymous usage statistics so we can improve the dashboard.")}
                </p>
              </div>
              <Switch checked={analytics} onCheckedChange={setAnalytics} aria-label={t("Analytics")} />
            </div>
          </div>
          <DialogFooter className="gap-2 border-t bg-muted/40 p-6 sm:gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                rejectAll();
                close();
              }}
            >
              {t("Essential only")}
            </Button>
            <Button
              size="sm"
              onClick={() => {
                saveConsent({ analytics, preferences });
                close();
              }}
            >
              {t("Save choices")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
