import { Component, type ReactNode, useEffect, useState } from "react";
import { CookieConsent } from "./CookieConsent";

class CookieBannerErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {}

  render() {
    if (this.state.hasError) {
      return null;
    }

    return this.props.children;
  }
}

export function CookieBannerWrapper() {
  const [key, setKey] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    let timeoutId: number | undefined;

    const handleReset = () => setKey((current) => current + 1);

    try {
      timeoutId = window.setTimeout(() => setIsMounted(true), 0);
      window.addEventListener("cookie-consent-reset", handleReset);
    } catch {
      setIsMounted(true);
    }

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }

      try {
        window.removeEventListener("cookie-consent-reset", handleReset);
      } catch {}
    };
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <CookieBannerErrorBoundary>
      <CookieConsent key={key} />
    </CookieBannerErrorBoundary>
  );
}
