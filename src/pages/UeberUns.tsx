import { Link } from "react-router-dom";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ArrowRight, Heart, Target, Users } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";

export default function UeberUns() {
  return (
    <>
      <SEOHead
        title="Über uns"
        description="Erfahren Sie mehr über MS Glanzwerk – Ihre professionelle Autopflege in Merzig. Leidenschaft, Präzision und ein Auge für Details."
        path="/ueber-uns"
      />
      <section className="section-padding">
        <div className="container mx-auto px-4 max-w-4xl">
          <AnimatedSection>
            <div className="text-center mb-14">
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
                Über <span className="text-gold-gradient">MS Glanzwerk</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Professionelle Autopflege & Fahrzeugaufbereitung in Merzig – mit Leidenschaft, Präzision und einem Auge für Details.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="glass-card p-8 md:p-12 mb-8">
              <h2 className="font-heading text-2xl font-bold mb-4">Unsere Geschichte</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                MS Glanzwerk wurde mit einer klaren Vision gegründet: Fahrzeugpflege auf höchstem Niveau, direkt vor Ihrer Haustür in Merzig. 
                Was als Leidenschaft für Autos begann, ist heute ein professioneller Betrieb, dem Kunden aus der gesamten Region vertrauen.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Unser Team kombiniert langjährige Erfahrung mit modernsten Techniken und premium Pflegeprodukten. 
                Jedes Fahrzeug wird bei uns individuell behandelt – denn wir wissen: Ihr Auto ist mehr als nur ein Transportmittel.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            {[
              { icon: Heart, title: "Leidenschaft", desc: "Wir lieben, was wir tun. Jedes Fahrzeug wird mit Hingabe behandelt." },
              { icon: Target, title: "Präzision", desc: "Detailarbeit ist unser Standard. Wir geben uns nur mit Perfektion zufrieden." },
              { icon: Users, title: "Vertrauen", desc: "Über 13 zufriedene Google-Bewertungen sprechen für sich." },
            ].map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.1}>
                <div className="glass-card p-6 text-center hover-lift h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection>
            <div className="glass-card p-8 md:p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
              <div className="relative z-10">
                <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">Überzeugen Sie sich selbst</h2>
                <p className="text-muted-foreground mb-6">Lernen Sie uns und unsere Arbeit persönlich kennen.</p>
                <Link
                  to="/kontakt"
                  className="bg-primary text-primary-foreground px-8 py-3.5 rounded-lg font-semibold hover:bg-primary/90 transition-all inline-flex items-center gap-2 group"
                >
                  Kontakt aufnehmen <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
