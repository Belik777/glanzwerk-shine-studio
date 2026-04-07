import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

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

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const STORAGE_KEY = "ms-glanzwerk-cookie-consent";
const CONSENT_COOKIE_NAME = "ms_glanzwerk_cookie_consent";
const NECESSARY_COOKIE_NAME = "ms_glanzwerk_necessary";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

const defaultPreferences: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
};

const CookieConsentContext = createContext<CookieConsentContextType | null>(null);

function getCookieAttributes() {
  const secure = typeof window !== "undefined" && window.location.protocol === "https:" ? "; Secure" : "";
  return `Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax${secure}`;
}

function writeCookie(name: string, value: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${encodeURIComponent(value)}; ${getCookieAttributes()}`;
}

function readCookie(name: string) {
  if (typeof document === "undefined") return null;
  const prefix = `${name}=`;
  const match = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(prefix));

  return match ? decodeURIComponent(match.slice(prefix.length)) : null;
}

function ensureNecessaryCookie() {
  writeCookie(NECESSARY_COOKIE_NAME, "true");
}

function syncGoogleConsent(preferences: CookiePreferences) {
  if (typeof window === "undefined" || !window.gtag) return;

  window.gtag("consent", "update", {
    analytics_storage: preferences.analytics ? "granted" : "denied",
    ad_storage: preferences.marketing ? "granted" : "denied",
    ad_user_data: preferences.marketing ? "granted" : "denied",
    ad_personalization: preferences.marketing ? "granted" : "denied",
  });
}

function normalizePreferences(preferences: CookiePreferences) {
  return {
    necessary: true,
    analytics: Boolean(preferences.analytics),
    marketing: Boolean(preferences.marketing),
  };
}

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
    ensureNecessaryCookie();

    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "default", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
    }

    const storedValue = localStorage.getItem(STORAGE_KEY) ?? readCookie(CONSENT_COOKIE_NAME);

    if (!storedValue) {
      setShowBanner(true);
      return;
    }

    try {
      const parsed = normalizePreferences(JSON.parse(storedValue) as CookiePreferences);
      setPreferences(parsed);
      setConsentGiven(true);
      setShowBanner(false);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
      writeCookie(CONSENT_COOKIE_NAME, JSON.stringify(parsed));
      syncGoogleConsent(parsed);
    } catch {
      setPreferences(defaultPreferences);
      setConsentGiven(false);
      setShowBanner(true);
    }
  }, []);

  const persist = useCallback((prefs: CookiePreferences) => {
    const safePreferences = normalizePreferences(prefs);
    const serialized = JSON.stringify(safePreferences);

    ensureNecessaryCookie();
    localStorage.setItem(STORAGE_KEY, serialized);
    writeCookie(CONSENT_COOKIE_NAME, serialized);
    setPreferences(safePreferences);
    setConsentGiven(true);
    setShowBanner(false);
    syncGoogleConsent(safePreferences);
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
