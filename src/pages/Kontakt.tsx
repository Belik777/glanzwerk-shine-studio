import { useState } from "react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Phone, MapPin, Clock, Send, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { SEOHead } from "@/components/SEOHead";

export default function Kontakt() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", service: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Vielen Dank! Wir melden uns schnellstmöglich bei Ihnen.");
    setFormData({ name: "", email: "", phone: "", service: "", message: "" });
  };

  return (
    <>
      <SEOHead
        title="Kontakt"
        description="Kontaktieren Sie MS Glanzwerk in Merzig. Termin vereinbaren für professionelle Autopflege. Telefon: 0177 2725455."
        path="/kontakt"
      />
      <section className="section-padding">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gold-gradient">Kontakt</span> aufnehmen
            </h1>
            <p className="text-lg text-muted-foreground">
              Haben Sie Fragen oder möchten einen Termin vereinbaren? Wir freuen uns auf Sie!
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatedSection delay={0.1}>
              <div className="glass-card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold mb-1">Telefon</h3>
                    <a href="tel:01772725455" className="text-muted-foreground hover:text-primary transition-colors">0177 2725455</a>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="glass-card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold mb-1">WhatsApp</h3>
                    <a
                      href="https://wa.me/491772725455"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      Nachricht senden
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="glass-card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold mb-1">Adresse</h3>
                    <p className="text-muted-foreground text-sm">Trierer Str. 74<br />66663 Merzig</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.25}>
              <div className="glass-card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold mb-1">Öffnungszeiten</h3>
                    <div className="text-muted-foreground text-sm space-y-0.5">
                      <p>Mo–Fr: 09:00–17:00 Uhr</p>
                      <p>Sa & So: Geschlossen</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Form */}
          <AnimatedSection delay={0.1} className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="glass-card p-8">
              <h2 className="font-heading text-xl font-bold mb-6">Anfrage senden</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="Ihr Name"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">E-Mail *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      placeholder="ihre@email.de"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Telefon</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      placeholder="Ihre Telefonnummer"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Gewünschte Leistung</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  >
                    <option value="">Bitte wählen...</option>
                    <option>Außenwäsche Premium</option>
                    <option>Innenreinigung Komplett</option>
                    <option>Polieren & Kratzerentfernung</option>
                    <option>Versiegelung & Coating</option>
                    <option>Komplettaufbereitung</option>
                    <option>Sonstiges</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Nachricht</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                    placeholder="Ihr Anliegen..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all inline-flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Anfrage absenden
                </button>
              </div>
            </form>
          </AnimatedSection>
        </div>

        {/* Map */}
        <AnimatedSection className="mt-12 max-w-5xl mx-auto">
          <div className="glass-card overflow-hidden">
            <iframe
              title="MS Glanzwerk Standort"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2588.5!2d6.6361!3d49.4420!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4795b680d7a0df1f%3A0x422d4db817204b0!2sTrierer%20Str.%2074%2C%2066663%20Merzig!5e0!3m2!1sde!2sde!4v1"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
