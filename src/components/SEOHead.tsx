import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
}

const BASE_URL = "https://ms-glanzwerk.de";

export function SEOHead({ title, description, canonical, ogTitle, ogDescription }: SEOHeadProps) {
  useEffect(() => {
    try {
      if (typeof document === "undefined") return;

      document.title = title;

      const setMeta = (attr: string, key: string, content: string) => {
        let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
        if (!el) {
          el = document.createElement("meta");
          el.setAttribute(attr, key);
          document.head.appendChild(el);
        }
        el.setAttribute("content", content);
      };

      setMeta("name", "description", description);
      setMeta("property", "og:title", ogTitle || title);
      setMeta("property", "og:description", ogDescription || description);
      setMeta("property", "og:type", "website");

      const fullCanonical = canonical ? `${BASE_URL}${canonical}` : undefined;

      if (fullCanonical) {
        setMeta("property", "og:url", fullCanonical);

        let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
        if (!link) {
          link = document.createElement("link");
          link.setAttribute("rel", "canonical");
          document.head.appendChild(link);
        }
        link.setAttribute("href", fullCanonical);
      }
    } catch {
      // Never crash the app
    }
  }, [title, description, canonical, ogTitle, ogDescription]);

  return null;
}
