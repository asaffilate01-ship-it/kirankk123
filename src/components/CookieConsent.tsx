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
import { Cookie } from "lucide-react";

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
        <div className="fixed inset-x-0 bottom-0 z-[60] p-3 pb-[calc(0.75rem+var(--tabbar-h,0px)+env(safe-area-inset-bottom))] md:p-4 md:pb-4">
          <div className="mx-auto max-w-3xl rounded-2xl border bg-card p-4 shadow-lg">
            <div className="flex items-start gap-3">
              <Cookie className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div className="min-w-0 text-sm text-muted-foreground">
                <p className="font-semibold text-foreground">{t("We use cookies")}</p>
                <p className="mt-1">
                  {t(
                    "Essential cookies keep you signed in and the dashboard secure. Optional cookies help us remember your language and understand usage.",
                  )}{" "}
                  <Link to="/cookies" className="underline hover:text-foreground">
                    {t("Cookie policy")}
                  </Link>
                </p>
              </div>
            </div>
            <div className="mt-3 grid gap-2 sm:flex sm:flex-wrap">
              <Button
                size="sm"
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
                onClick={() => {
                  rejectAll();
                  close();
                }}
              >
                {t("Essential only")}
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setSettings(true)}>
                {t("Manage choices")}
              </Button>
            </div>
          </div>
        </div>
      )}

      <Dialog open={settings} onOpenChange={(v) => (v ? setSettings(true) : close())}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{t("Cookie settings")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-medium">{t("Strictly necessary")}</p>
                <p className="text-xs text-muted-foreground">
                  {t("Login, security and session cookies. Always on.")}
                </p>
              </div>
              <Switch checked disabled aria-label={t("Strictly necessary")} />
            </div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-medium">{t("Preferences")}</p>
                <p className="text-xs text-muted-foreground">
                  {t("Remembers your language and dashboard choices.")}
                </p>
              </div>
              <Switch checked={preferences} onCheckedChange={setPreferences} aria-label={t("Preferences")} />
            </div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-medium">{t("Analytics")}</p>
                <p className="text-xs text-muted-foreground">
                  {t("Anonymous usage statistics so we can improve the dashboard.")}
                </p>
              </div>
              <Switch checked={analytics} onCheckedChange={setAnalytics} aria-label={t("Analytics")} />
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-2">
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
