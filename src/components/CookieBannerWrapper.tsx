import { useState, useEffect } from "react";
import { CookieConsent } from "./CookieConsent";

export function CookieBannerWrapper() {
  const [key, setKey] = useState(0);

  useEffect(() => {
    const handler = () => setKey(k => k + 1);
    window.addEventListener("cookie-consent-reset", handler);
    return () => window.removeEventListener("cookie-consent-reset", handler);
  }, []);

  return <CookieConsent key={key} />;
}
