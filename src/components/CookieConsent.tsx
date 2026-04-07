import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, Settings } from "lucide-react";

export type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

const DEFAULT_PREFS: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
};

const STORAGE_KEY = "ms-glanzwerk-cookie-consent";

export function getCookiePreferences(): CookiePreferences | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return null;
}

export function hasAnalyticsConsent(): boolean {
  const prefs = getCookiePreferences();
  return prefs?.analytics === true;
}

export function hasMarketingConsent(): boolean {
  const prefs = getCookiePreferences();
  return prefs?.marketing === true;
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [prefs, setPrefs] = useState<CookiePreferences>(DEFAULT_PREFS);

  useEffect(() => {
    const stored = getCookiePreferences();
    if (!stored) {
      setVisible(true);
    }
  }, []);

  const saveAndClose = (preferences: CookiePreferences) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    setVisible(false);
    setShowCustomize(false);

    // Dispatch event so analytics scripts can listen
    window.dispatchEvent(new CustomEvent("cookie-consent-updated", { detail: preferences }));
  };

  const acceptAll = () => {
    saveAndClose({ necessary: true, analytics: true, marketing: true });
  };

  const rejectAll = () => {
    saveAndClose({ necessary: true, analytics: false, marketing: false });
  };

  const saveCustom = () => {
    saveAndClose({ ...prefs, necessary: true });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
        >
          <div className="max-w-3xl mx-auto bg-card border border-border/40 rounded-2xl shadow-2xl shadow-black/30 p-6 md:p-8">
            <div className="flex items-start gap-3 mb-4">
              <Cookie className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <h3 className="font-heading font-semibold text-foreground mb-1">Cookie-Einstellungen</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Wir verwenden Cookies, um Ihre Erfahrung zu verbessern. Sie können optionale Cookies akzeptieren oder ablehnen.{" "}
                  <Link to="/datenschutz" className="text-primary hover:underline">Datenschutz</Link>
                  {" · "}
                  <Link to="/impressum" className="text-primary hover:underline">Impressum</Link>
                </p>
              </div>
            </div>

            <AnimatePresence>
              {showCustomize && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden mb-4"
                >
                  <div className="space-y-3 pt-4 border-t border-border/30">
                    <label className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium text-foreground">Notwendig</span>
                        <p className="text-xs text-muted-foreground">Erforderlich für die Grundfunktion der Website</p>
                      </div>
                      <div className="bg-primary/20 text-primary text-xs px-2 py-1 rounded-full font-medium">Immer aktiv</div>
                    </label>

                    <label className="flex items-center justify-between cursor-pointer">
                      <div>
                        <span className="text-sm font-medium text-foreground">Analyse</span>
                        <p className="text-xs text-muted-foreground">Hilft uns die Nutzung der Website zu verstehen</p>
                      </div>
                      <button
                        onClick={() => setPrefs(p => ({ ...p, analytics: !p.analytics }))}
                        className={`w-10 h-6 rounded-full transition-colors relative ${prefs.analytics ? "bg-primary" : "bg-muted"}`}
                      >
                        <span className={`absolute top-1 w-4 h-4 rounded-full bg-foreground transition-transform ${prefs.analytics ? "left-5" : "left-1"}`} />
                      </button>
                    </label>

                    <label className="flex items-center justify-between cursor-pointer">
                      <div>
                        <span className="text-sm font-medium text-foreground">Marketing</span>
                        <p className="text-xs text-muted-foreground">Für personalisierte Inhalte und Werbung</p>
                      </div>
                      <button
                        onClick={() => setPrefs(p => ({ ...p, marketing: !p.marketing }))}
                        className={`w-10 h-6 rounded-full transition-colors relative ${prefs.marketing ? "bg-primary" : "bg-muted"}`}
                      >
                        <span className={`absolute top-1 w-4 h-4 rounded-full bg-foreground transition-transform ${prefs.marketing ? "left-5" : "left-1"}`} />
                      </button>
                    </label>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={acceptAll}
                className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors flex-1"
              >
                Alle akzeptieren
              </button>
              <button
                onClick={rejectAll}
                className="border border-border/50 text-foreground px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-secondary/50 transition-colors flex-1"
              >
                Alle ablehnen
              </button>
              {showCustomize ? (
                <button
                  onClick={saveCustom}
                  className="border border-primary/30 text-primary px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/10 transition-colors flex-1"
                >
                  Auswahl speichern
                </button>
              ) : (
                <button
                  onClick={() => setShowCustomize(true)}
                  className="border border-border/50 text-muted-foreground px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-secondary/50 transition-colors flex-1 inline-flex items-center justify-center gap-2"
                >
                  <Settings className="w-4 h-4" /> Anpassen
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Reopen cookie settings programmatically */
export function CookieSettingsButton() {
  const openSettings = () => {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event("cookie-consent-reset"));
    window.location.reload();
  };

  return (
    <button
      onClick={openSettings}
      className="text-sm text-muted-foreground hover:text-primary transition-colors"
    >
      Cookie-Einstellungen
    </button>
  );
}
