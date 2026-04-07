import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ArrowRight, Check } from "lucide-react";
import interiorImg from "@/assets/service-interior.jpg";
import polishImg from "@/assets/service-polish.jpg";
import coatingImg from "@/assets/service-coating.jpg";
import washImg from "@/assets/service-wash.jpg";

const allServices = [
  {
    title: "Außenwäsche Premium",
    desc: "Schonende Handwäsche für strahlenden Glanz und langanhaltenden Schutz.",
    img: washImg,
    features: ["Vorwäsche mit Schaumkanone", "Handwäsche mit Lammfellhandschuh", "Felgenreinigung", "Trocknung mit Mikrofaser", "Reifenpflege"],
  },
  {
    title: "Innenreinigung Komplett",
    desc: "Gründliche Reinigung des gesamten Innenraums – für ein Fahrgefühl wie am ersten Tag.",
    img: interiorImg,
    features: ["Staubsaugen aller Flächen", "Polster- & Lederreinigung", "Armaturenpflege", "Scheibenreinigung innen", "Geruchsneutralisation"],
  },
  {
    title: "Polieren & Kratzerentfernung",
    desc: "Professionelles Polieren für eine makellose, spiegelnde Lackoberfläche.",
    img: polishImg,
    features: ["Lackzustandsanalyse", "Mehrstufige Politur", "Kratzer- & Swirl-Entfernung", "Hochglanzfinish", "Lackversiegelung"],
  },
  {
    title: "Versiegelung & Coating",
    desc: "Langanhaltender Schutz durch hochwertige Keramik- und Nanoversiegelungen.",
    img: coatingImg,
    features: ["Lackvorbereitung", "Keramikversiegelung", "Hydrophober Schutz", "UV-Schutz", "Bis zu 2 Jahre Haltbarkeit"],
  },
];

export default function Leistungen() {
  return (
    <>
      <SEOHead
        title="Leistungen"
        description="Unsere Leistungen: Außenwäsche, Innenreinigung, Polieren, Kratzerentfernung, Versiegelung & Coating. Professionelle Autopflege in Merzig."
        path="/leistungen"
      />
    <section className="section-padding">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Unsere <span className="text-gold-gradient">Leistungen</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Von der einfachen Wäsche bis zur kompletten Aufbereitung – wir bieten alles aus einer Hand.
            </p>
          </div>
        </AnimatedSection>

        <div className="space-y-8">
          {allServices.map((s, i) => (
            <AnimatedSection key={s.title} delay={i * 0.1}>
              <div className={`glass-card overflow-hidden grid grid-cols-1 md:grid-cols-2 ${i % 2 === 1 ? "md:direction-rtl" : ""}`}>
                <div className="aspect-[4/3] md:aspect-auto overflow-hidden">
                  <img src={s.img} alt={s.title} loading="lazy" width={800} height={600} className="w-full h-full object-cover" />
                </div>
                <div className="p-8 md:p-10 flex flex-col justify-center" style={{ direction: "ltr" }}>
                  <h2 className="font-heading text-2xl font-bold mb-3">{s.title}</h2>
                  <p className="text-muted-foreground mb-6">{s.desc}</p>
                  <ul className="space-y-2 mb-6">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/kontakt"
                    className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all inline-flex items-center gap-2 group self-start"
                  >
                    Anfragen <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
