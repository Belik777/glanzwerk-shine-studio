import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

export type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

type CookieConsentContextType = {
  preferences: CookiePreferences;
  consentGiven: boolean;
  showBanner: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  savePreferences: (prefs: CookiePreferences) => void;
  openSettings: () => void;
};

const STORAGE_KEY = "ms-glanzwerk-cookie-consent";

const defaultPreferences: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
};

const CookieConsentContext = createContext<CookieConsentContextType | null>(null);

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) throw new Error("useCookieConsent must be used within CookieConsentProvider");
  return ctx;
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);
  const [consentGiven, setConsentGiven] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as CookiePreferences;
        setPreferences({ ...parsed, necessary: true });
        setConsentGiven(true);
        setShowBanner(false);
      } catch {
        setShowBanner(true);
      }
    } else {
      setShowBanner(true);
    }
  }, []);

  const persist = useCallback((prefs: CookiePreferences) => {
    const safe = { ...prefs, necessary: true };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(safe));
    setPreferences(safe);
    setConsentGiven(true);
    setShowBanner(false);

    // Fire analytics if consented
    if (safe.analytics && typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("consent", "update", {
        analytics_storage: "granted",
      });
    }
    if (safe.marketing && typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("consent", "update", {
        ad_storage: "granted",
      });
    }
  }, []);

  const acceptAll = useCallback(() => {
    persist({ necessary: true, analytics: true, marketing: true });
  }, [persist]);

  const rejectAll = useCallback(() => {
    persist({ necessary: true, analytics: false, marketing: false });
  }, [persist]);

  const savePreferences = useCallback((prefs: CookiePreferences) => {
    persist(prefs);
  }, [persist]);

  const openSettings = useCallback(() => {
    setShowBanner(true);
  }, []);

  return (
    <CookieConsentContext.Provider
      value={{ preferences, consentGiven, showBanner, acceptAll, rejectAll, savePreferences, openSettings }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}
