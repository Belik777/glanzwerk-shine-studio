import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Cookie } from "lucide-react";

export type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

const COOKIE_KEY = "ms-glanzwerk-cookie-consent";

function dispatchCookieEvent(eventName: string, detail?: CookiePreferences) {
  try {
    if (typeof window === "undefined") return;
    const event = detail
      ? new CustomEvent(eventName, { detail })
      : new Event(eventName);
    window.dispatchEvent(event);
  } catch {}
}

export function getCookiePreferences(): CookiePreferences | null {
  try {
    if (typeof window === "undefined") return null;
    const stored = window.localStorage.getItem(COOKIE_KEY);
    if (!stored) return null;

    const parsed = JSON.parse(stored) as Partial<CookiePreferences>;
    return {
      necessary: true,
      analytics: parsed.analytics === true,
      marketing: parsed.marketing === true,
    };
  } catch {
    return null;
  }
}

export function hasAnalyticsConsent(): boolean {
  return getCookiePreferences()?.analytics === true;
}

export function hasMarketingConsent(): boolean {
  return getCookiePreferences()?.marketing === true;
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    try {
      const stored = getCookiePreferences();
      if (stored) {
        setPreferences(stored);
        return;
      }
    } catch {}

    setVisible(true);
  }, []);

  const saveAndClose = (prefs: CookiePreferences) => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(COOKIE_KEY, JSON.stringify(prefs));
      }
    } catch {}

    setPreferences(prefs);
    setVisible(false);
    dispatchCookieEvent("cookie-consent-changed", prefs);
  };

  const acceptAll = () => {
    saveAndClose({ necessary: true, analytics: true, marketing: true });
  };

  const rejectAll = () => {
    saveAndClose({ necessary: true, analytics: false, marketing: false });
  };

  const saveCustom = () => {
    saveAndClose({ ...preferences, necessary: true });
  };

  if (!visible) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
    >
      <div className="container mx-auto max-w-4xl">
        <div className="bg-card border border-border/40 rounded-2xl shadow-2xl p-6 md:p-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Cookie className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-lg">Cookie-Einstellungen</h3>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-2">
            Wir verwenden Cookies, um Ihre Erfahrung zu verbessern. Sie können optionale Cookies akzeptieren oder ablehnen.
          </p>
          <p className="text-xs text-muted-foreground mb-6">
            Weitere Informationen finden Sie in unserer{" "}
            <Link to="/datenschutz" className="text-primary hover:underline">
              Datenschutzerklärung
            </Link>
            {" "}und im{" "}
            <Link to="/impressum" className="text-primary hover:underline">
              Impressum
            </Link>
            .
          </p>

          {showCustomize && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              className="overflow-hidden mb-6"
            >
              <div className="space-y-3 border border-border/30 rounded-xl p-4 bg-secondary/20">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <span className="text-sm font-medium">Notwendig</span>
                    <p className="text-xs text-muted-foreground">Für die Grundfunktionen der Website erforderlich.</p>
                  </div>
                  <span className="text-xs text-primary font-medium bg-primary/10 px-3 py-1 rounded-full">Immer aktiv</span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <span className="text-sm font-medium">Analyse</span>
                    <p className="text-xs text-muted-foreground">Helfen uns zu verstehen, wie die Website genutzt wird.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPreferences((current) => ({ ...current, analytics: !current.analytics }))}
                    className={`w-12 h-6 rounded-full transition-colors relative ${preferences.analytics ? "bg-primary" : "bg-muted"}`}
                    aria-pressed={preferences.analytics}
                    aria-label="Analyse-Cookies umschalten"
                  >
                    <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-foreground transition-transform ${preferences.analytics ? "left-[26px]" : "left-0.5"}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <span className="text-sm font-medium">Marketing</span>
                    <p className="text-xs text-muted-foreground">Werden für personalisierte Werbung verwendet.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPreferences((current) => ({ ...current, marketing: !current.marketing }))}
                    className={`w-12 h-6 rounded-full transition-colors relative ${preferences.marketing ? "bg-primary" : "bg-muted"}`}
                    aria-pressed={preferences.marketing}
                    aria-label="Marketing-Cookies umschalten"
                  >
                    <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-foreground transition-transform ${preferences.marketing ? "left-[26px]" : "left-0.5"}`} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={acceptAll}
              className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              Alle akzeptieren
            </button>
            <button
              type="button"
              onClick={rejectAll}
              className="border border-border/50 text-foreground px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-secondary/50 transition-colors"
            >
              Alle ablehnen
            </button>
            {!showCustomize ? (
              <button
                type="button"
                onClick={() => setShowCustomize(true)}
                className="border border-border/50 text-muted-foreground px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-secondary/50 transition-colors"
              >
                Anpassen
              </button>
            ) : (
              <button
                type="button"
                onClick={saveCustom}
                className="border border-primary/50 text-primary px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/10 transition-colors"
              >
                Auswahl speichern
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function openCookieSettings() {
  try {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(COOKIE_KEY);
    }
  } catch {}

  dispatchCookieEvent("cookie-consent-reset");
}
