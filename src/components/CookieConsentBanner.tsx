import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Cookie } from "lucide-react";
import { useCookieConsent, type CookiePreferences } from "@/contexts/CookieConsentContext";

export function CookieConsentBanner() {
  const { showBanner, acceptAll, rejectAll, savePreferences, preferences } = useCookieConsent();
  const [showCustomize, setShowCustomize] = useState(false);
  const [localPrefs, setLocalPrefs] = useState<CookiePreferences>(preferences);

  if (!showBanner) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
      >
        <div className="container mx-auto max-w-3xl">
          <div className="bg-card border border-border/40 rounded-2xl shadow-2xl shadow-black/30 p-6 md:p-8">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Cookie className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-foreground">Cookie-Einstellungen</h3>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground mb-2 leading-relaxed">
              Wir verwenden Cookies, um Ihre Erfahrung zu verbessern. Sie können optionale Cookies akzeptieren oder ablehnen.
            </p>
            <p className="text-xs text-muted-foreground mb-5">
              Weitere Informationen finden Sie in unserer{" "}
              <Link to="/datenschutz" className="text-primary hover:underline">Datenschutzerklärung</Link>
              {" "}und im{" "}
              <Link to="/impressum" className="text-primary hover:underline">Impressum</Link>.
            </p>

            {/* Customize section */}
            <AnimatePresence>
              {showCustomize && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden mb-5"
                >
                  <div className="space-y-3 py-2">
                    {/* Necessary */}
                    <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/30">
                      <div className="flex items-center gap-3">
                        <Shield className="w-4 h-4 text-primary" />
                        <div>
                          <p className="text-sm font-medium text-foreground">Notwendig</p>
                          <p className="text-xs text-muted-foreground">Immer aktiv – für den Betrieb der Website erforderlich</p>
                        </div>
                      </div>
                      <div className="w-11 h-6 bg-primary rounded-full flex items-center px-0.5 cursor-not-allowed">
                        <div className="w-5 h-5 bg-primary-foreground rounded-full ml-auto" />
                      </div>
                    </div>

                    {/* Analytics */}
                    <label className="flex items-center justify-between p-3 rounded-xl bg-secondary/30 cursor-pointer">
                      <div>
                        <p className="text-sm font-medium text-foreground">Analyse</p>
                        <p className="text-xs text-muted-foreground">Hilft uns, die Nutzung der Website zu verstehen</p>
                      </div>
                      <button
                        onClick={() => setLocalPrefs(p => ({ ...p, analytics: !p.analytics }))}
                        className={`w-11 h-6 rounded-full flex items-center px-0.5 transition-colors ${
                          localPrefs.analytics ? "bg-primary" : "bg-muted"
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full transition-all ${
                          localPrefs.analytics ? "bg-primary-foreground ml-auto" : "bg-muted-foreground/50 ml-0"
                        }`} />
                      </button>
                    </label>

                    {/* Marketing */}
                    <label className="flex items-center justify-between p-3 rounded-xl bg-secondary/30 cursor-pointer">
                      <div>
                        <p className="text-sm font-medium text-foreground">Marketing</p>
                        <p className="text-xs text-muted-foreground">Ermöglicht personalisierte Werbung</p>
                      </div>
                      <button
                        onClick={() => setLocalPrefs(p => ({ ...p, marketing: !p.marketing }))}
                        className={`w-11 h-6 rounded-full flex items-center px-0.5 transition-colors ${
                          localPrefs.marketing ? "bg-primary" : "bg-muted"
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full transition-all ${
                          localPrefs.marketing ? "bg-primary-foreground ml-auto" : "bg-muted-foreground/50 ml-0"
                        }`} />
                      </button>
                    </label>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={acceptAll}
                className="flex-1 bg-primary text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                Alle akzeptieren
              </button>
              <button
                onClick={rejectAll}
                className="flex-1 border border-border/50 text-foreground px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-secondary/50 transition-colors"
              >
                Alle ablehnen
              </button>
              {showCustomize ? (
                <button
                  onClick={() => savePreferences(localPrefs)}
                  className="flex-1 border border-primary/30 text-primary px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/10 transition-colors"
                >
                  Auswahl speichern
                </button>
              ) : (
                <button
                  onClick={() => setShowCustomize(true)}
                  className="flex-1 border border-border/50 text-muted-foreground px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-secondary/50 transition-colors"
                >
                  Anpassen
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
