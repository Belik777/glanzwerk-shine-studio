import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, X } from "lucide-react";

export type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

const COOKIE_KEY = "ms-glanzwerk-cookie-consent";

export function getCookiePreferences(): CookiePreferences | null {
  try {
    const stored = localStorage.getItem(COOKIE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function saveCookiePreferences(prefs: CookiePreferences) {
  localStorage.setItem(COOKIE_KEY, JSON.stringify(prefs));
  window.dispatchEvent(new CustomEvent("cookie-consent-changed", { detail: prefs }));
}

export function loadAnalyticsIfConsented() {
  const prefs = getCookiePreferences();
  if (prefs?.analytics) {
    // Google Analytics placeholder — add your GA ID here
    // const script = document.createElement("script");
    // script.src = "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX";
    // script.async = true;
    // document.head.appendChild(script);
  }
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [prefs, setPrefs] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const existing = getCookiePreferences();
    if (!existing) {
      setVisible(true);
    } else {
      loadAnalyticsIfConsented();
    }
  }, []);

  const accept = (all: boolean) => {
    const newPrefs: CookiePreferences = {
      necessary: true,
      analytics: all ? true : prefs.analytics,
      marketing: all ? true : prefs.marketing,
    };
    saveCookiePreferences(newPrefs);
    loadAnalyticsIfConsented();
    setVisible(false);
  };

  const reject = () => {
    saveCookiePreferences({ necessary: true, analytics: false, marketing: false });
    setVisible(false);
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
              <Shield className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div className="flex-1">
                <h3 className="font-heading font-semibold text-foreground mb-1">Cookie-Einstellungen</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Wir verwenden Cookies, um Ihre Erfahrung zu verbessern. Sie können optionale Cookies akzeptieren oder ablehnen.{" "}
                  <Link to="/datenschutz" className="text-primary hover:underline">Datenschutz</Link> ·{" "}
                  <Link to="/impressum" className="text-primary hover:underline">Impressum</Link>
                </p>
              </div>
              <button onClick={reject} className="text-muted-foreground hover:text-foreground p-1" aria-label="Schließen">
                <X className="w-4 h-4" />
              </button>
            </div>

            <AnimatePresence>
              {showCustomize && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden mb-4"
                >
                  <div className="space-y-3 py-3 border-t border-border/30">
                    <label className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium text-foreground">Notwendig</span>
                        <p className="text-xs text-muted-foreground">Für die Grundfunktion der Website erforderlich.</p>
                      </div>
                      <div className="w-10 h-5 bg-primary/30 rounded-full relative cursor-not-allowed">
                        <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-primary rounded-full" />
                      </div>
                    </label>
                    <label className="flex items-center justify-between cursor-pointer" onClick={() => setPrefs(p => ({ ...p, analytics: !p.analytics }))}>
                      <div>
                        <span className="text-sm font-medium text-foreground">Analyse</span>
                        <p className="text-xs text-muted-foreground">Hilft uns, die Website-Nutzung zu verstehen.</p>
                      </div>
                      <div className={`w-10 h-5 rounded-full relative transition-colors ${prefs.analytics ? "bg-primary/30" : "bg-secondary"}`}>
                        <div className={`absolute top-0.5 w-4 h-4 rounded-full transition-all ${prefs.analytics ? "right-0.5 bg-primary" : "left-0.5 bg-muted-foreground"}`} />
                      </div>
                    </label>
                    <label className="flex items-center justify-between cursor-pointer" onClick={() => setPrefs(p => ({ ...p, marketing: !p.marketing }))}>
                      <div>
                        <span className="text-sm font-medium text-foreground">Marketing</span>
                        <p className="text-xs text-muted-foreground">Ermöglicht personalisierte Werbung.</p>
                      </div>
                      <div className={`w-10 h-5 rounded-full relative transition-colors ${prefs.marketing ? "bg-primary/30" : "bg-secondary"}`}>
                        <div className={`absolute top-0.5 w-4 h-4 rounded-full transition-all ${prefs.marketing ? "right-0.5 bg-primary" : "left-0.5 bg-muted-foreground"}`} />
                      </div>
                    </label>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => accept(true)}
                className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors flex-1"
              >
                Alle akzeptieren
              </button>
              <button
                onClick={reject}
                className="border border-border/50 text-foreground px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-secondary/50 transition-colors flex-1"
              >
                Alle ablehnen
              </button>
              <button
                onClick={() => showCustomize ? accept(false) : setShowCustomize(true)}
                className="border border-border/50 text-foreground px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-secondary/50 transition-colors flex-1"
              >
                {showCustomize ? "Auswahl speichern" : "Anpassen"}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function CookieSettingsButton() {
  const openSettings = () => {
    localStorage.removeItem(COOKIE_KEY);
    window.location.reload();
  };

  return (
    <button onClick={openSettings} className="text-sm text-muted-foreground hover:text-primary transition-colors">
      Cookie-Einstellungen
    </button>
  );
}
