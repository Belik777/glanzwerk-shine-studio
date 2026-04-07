import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MapPin, Clock } from "lucide-react";
import { openCookieSettings } from "@/components/CookieConsent";

const navItems = [
  { label: "Startseite", path: "/" },
  { label: "Über uns", path: "/ueber-uns" },
  { label: "Leistungen", path: "/leistungen" },
  { label: "Kontakt", path: "/kontakt" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <div className="bg-secondary/50 border-b border-border/20 py-2 px-4 hidden md:block">
        <div className="container mx-auto flex justify-between items-center text-sm text-muted-foreground">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Trierer Str. 74, 66663 Merzig</span>
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Mo–Fr: 09:00–17:00</span>
          </div>
          <a href="tel:01772725455" className="flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors">
            <Phone className="w-3.5 h-3.5" /> 0177 2725455
          </a>
        </div>
      </div>

      {/* Navigation */}
      <header className="glass-nav sticky top-0 z-50">
        <nav className="container mx-auto px-4 flex items-center justify-between h-16">
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          <Link to="/" className="font-heading text-xl font-bold tracking-tight">
            <span className="text-gold-gradient">MS</span> Glanzwerk
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === item.path ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/kontakt"
              className="bg-primary text-primary-foreground px-5 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              Termin buchen
            </Link>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-foreground p-2">
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-card border-t border-border/30 overflow-hidden"
            >
              <div className="px-4 py-4 flex flex-col gap-3">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className={`text-sm font-medium py-2 transition-colors ${
                      location.pathname === item.path ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  to="/kontakt"
                  onClick={() => setMenuOpen(false)}
                  className="bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold text-center mt-2"
                >
                  Termin buchen
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-secondary/30 border-t border-border/30 section-padding !py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <h3 className="font-heading text-lg font-bold mb-4">
                <span className="text-gold-gradient">MS</span> Glanzwerk
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Professionelle Autopflege & Fahrzeugaufbereitung in Merzig. Qualität, die man sieht und fühlt.
              </p>
            </div>
            <div>
              <h4 className="font-heading font-semibold mb-4">Schnelllinks</h4>
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link key={item.path} to={item.path} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item.label}
                  </Link>
                ))}
                  <Link to="/impressum" className="text-sm text-muted-foreground hover:text-primary transition-colors">Impressum</Link>
                  <Link to="/datenschutz" className="text-sm text-muted-foreground hover:text-primary transition-colors">Datenschutz</Link>
                  <button onClick={openCookieSettings} className="text-sm text-muted-foreground hover:text-primary transition-colors text-left">Cookie-Einstellungen</button>
              </div>
            </div>
            <div>
              <h4 className="font-heading font-semibold mb-4">Kontakt</h4>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <span>Trierer Str. 74, 66663 Merzig</span>
                <a href="tel:01772725455" className="hover:text-primary transition-colors">0177 2725455</a>
                <span>Mo–Fr: 09:00–17:00 Uhr</span>
              </div>
            </div>
          </div>
          <div className="border-t border-border/30 mt-10 pt-6 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} MS Glanzwerk. Alle Rechte vorbehalten.
          </div>
        </div>
      </footer>
    </div>
  );
}
