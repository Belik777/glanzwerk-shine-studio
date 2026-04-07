import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/Layout";
import { CookieConsent } from "@/components/CookieConsent";
import Index from "./pages/Index";
import UeberUns from "./pages/UeberUns";
import Leistungen from "./pages/Leistungen";
import Kontakt from "./pages/Kontakt";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();
const APP_ROUTE_SEGMENTS = new Set(["", "ueber-uns", "leistungen", "kontakt", "impressum", "datenschutz"]);

const getRouterBasename = () => {
  if (typeof window === "undefined") return "/";

  const [firstSegment = ""] = window.location.pathname.split("/").filter(Boolean);
  return APP_ROUTE_SEGMENTS.has(firstSegment) ? "/" : `/${firstSegment}`;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Sonner />
        <BrowserRouter basename={getRouterBasename()}>
          <ScrollToTop />
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/ueber-uns" element={<UeberUns />} />
              <Route path="/leistungen" element={<Leistungen />} />
              <Route path="/kontakt" element={<Kontakt />} />
              <Route path="/impressum" element={<Impressum />} />
              <Route path="/datenschutz" element={<Datenschutz />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
          <CookieConsent />
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
