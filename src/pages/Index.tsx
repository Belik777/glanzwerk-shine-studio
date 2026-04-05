import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Shield, Award, Sparkles, ChevronRight, Phone, ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import heroImg from "@/assets/hero-car.jpg";
import interiorImg from "@/assets/service-interior.jpg";
import polishImg from "@/assets/service-polish.jpg";
import coatingImg from "@/assets/service-coating.jpg";
import washImg from "@/assets/service-wash.jpg";
import beforeAfterImg from "@/assets/before-after.jpg";

const services = [
  {
    title: "Außenwäsche Premium",
    desc: "Schonende Handwäsche mit hochwertigen Produkten für strahlenden Glanz.",
    img: washImg,
  },
  {
    title: "Innenreinigung",
    desc: "Gründliche Reinigung des gesamten Innenraums – wie am ersten Tag.",
    img: interiorImg,
  },
  {
    title: "Polieren & Kratzerentfernung",
    desc: "Professionelles Polieren für eine makellose Lackoberfläche.",
    img: polishImg,
  },
  {
    title: "Versiegelung & Coating",
    desc: "Langanhaltender Schutz durch hochwertige Versiegelungen.",
    img: coatingImg,
  },
];

const reviews = [
  { name: "Marco S.", text: "Das Team war total freundlich und hat sehr sauber und genau gearbeitet.", stars: 5 },
  { name: "Lisa M.", text: "Top Zufriedenheit, nettes Personal, faire Preise – sehr empfehlenswert.", stars: 5 },
  { name: "Thomas K.", text: "Das Team war sehr nett und hat alles super ordentlich gemacht.", stars: 5 },
  { name: "Sandra W.", text: "Mein Auto sah aus wie neu! Absolut professionelle Arbeit.", stars: 5 },
];

const advantages = [
  { icon: Shield, title: "100% Handarbeit", desc: "Jedes Fahrzeug wird mit Sorgfalt und Liebe zum Detail behandelt." },
  { icon: Award, title: "Premium Produkte", desc: "Wir verwenden ausschließlich hochwertige Pflegeprodukte." },
  { icon: Sparkles, title: "Ergebnis-Garantie", desc: "Nicht zufrieden? Wir arbeiten nach, bis es perfekt ist." },
  { icon: Star, title: "4,7 ★ Bewertung", desc: "Unsere Kunden sind begeistert – überzeugen Sie sich selbst." },
];

export default function Index() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Professionelle Fahrzeugaufbereitung"
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30" />
        </div>
        <div className="container mx-auto px-4 relative z-10 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Professionelle Autopflege in Merzig</span>
            </div>
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 text-balance">
              Ihr Fahrzeug verdient <span className="text-gold-gradient">Perfektion</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
              Von der schonenden Handwäsche bis zur professionellen Lackaufbereitung – wir bringen Ihr Auto zum
              Strahlen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/kontakt"
                className="bg-primary text-primary-foreground px-8 py-3.5 rounded-lg font-semibold hover:bg-primary/90 transition-all inline-flex items-center justify-center gap-2 group"
              >
                Termin vereinbaren
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="tel:01772725455"
                className="border border-border/50 text-foreground px-8 py-3.5 rounded-lg font-semibold hover:bg-secondary/50 transition-all inline-flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Jetzt anrufen
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Advantages */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-14">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Warum <span className="text-gold-gradient">MS Glanzwerk</span>?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Qualität, Erfahrung und Leidenschaft – das macht uns aus.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((a, i) => (
              <AnimatedSection key={a.title} delay={i * 0.1}>
                <div className="glass-card p-6 hover-lift text-center h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <a.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold mb-2">{a.title}</h3>
                  <p className="text-sm text-muted-foreground">{a.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-secondary/20">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-14">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Unsere Leistungen</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Vom Kleinwagen bis zum SUV – wir pflegen jedes Fahrzeug mit Perfektion.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((s, i) => (
              <AnimatedSection key={s.title} delay={i * 0.1}>
                <div className="glass-card overflow-hidden group hover-lift">
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={s.img}
                      alt={s.title}
                      loading="lazy"
                      width={800}
                      height={600}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-lg font-semibold mb-2">{s.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{s.desc}</p>
                    <Link
                      to="/leistungen"
                      className="text-primary text-sm font-medium inline-flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      Mehr erfahren <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="section-padding bg-secondary/20">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-14">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="font-heading text-4xl font-bold">4,7</span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < 5 ? "text-primary fill-primary" : "text-muted"}`} />
                  ))}
                </div>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Was unsere Kunden sagen</h2>
              <p className="text-muted-foreground">13 Bewertungen auf Google</p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((r, i) => (
              <AnimatedSection key={r.name} delay={i * 0.1}>
                <div className="glass-card p-6 h-full flex flex-col">
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(r.stars)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-primary fill-primary" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground flex-1 italic">„{r.text}"</p>
                  <p className="font-medium text-sm mt-4">{r.name}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="glass-card p-10 md:p-16 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
              <div className="relative z-10">
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                  Bereit für den <span className="text-gold-gradient">perfekten Glanz</span>?
                </h2>
                <p className="text-muted-foreground max-w-lg mx-auto mb-8">
                  Vereinbaren Sie jetzt Ihren Termin und erleben Sie den Unterschied professioneller Fahrzeugpflege.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/kontakt"
                    className="bg-primary text-primary-foreground px-8 py-3.5 rounded-lg font-semibold hover:bg-primary/90 transition-all inline-flex items-center justify-center gap-2 group"
                  >
                    Jetzt Termin buchen
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <a
                    href="tel:01772725455"
                    className="border border-border/50 text-foreground px-8 py-3.5 rounded-lg font-semibold hover:bg-secondary/50 transition-all inline-flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" /> 0177 2725455
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
