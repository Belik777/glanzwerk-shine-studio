import { AnimatedSection } from "@/components/AnimatedSection";
import { SEOHead } from "@/components/SEOHead";

export default function Impressum() {
  return (
    <>
      <SEOHead title="Impressum – MS Glanzwerk Merzig" description="Impressum von MS Glanzwerk, Trierer Str. 74, 66663 Merzig. Angaben gemäß § 5 TMG." />
      <section className="section-padding">
      <div className="container mx-auto px-4 max-w-3xl">
        <AnimatedSection>
          <h1 className="font-heading text-4xl font-bold mb-10">Impressum</h1>
          <div className="glass-card p-8 md:p-12 space-y-6 text-muted-foreground leading-relaxed">
            <div>
              <h2 className="font-heading text-lg font-semibold text-foreground mb-2">Angaben gemäß § 5 TMG</h2>
              <p>MS Glanzwerk<br />Trierer Str. 74<br />66663 Merzig</p>
            </div>
            <div>
              <h2 className="font-heading text-lg font-semibold text-foreground mb-2">Kontakt</h2>
              <p>Telefon: <a href="tel:01772725455" className="text-primary hover:underline">0177 2725455</a></p>
            </div>
            <div>
              <h2 className="font-heading text-lg font-semibold text-foreground mb-2">Umsatzsteuer-ID</h2>
              <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz: wird nachgereicht.</p>
            </div>
            <div>
              <h2 className="font-heading text-lg font-semibold text-foreground mb-2">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
              <p>MS Glanzwerk<br />Trierer Str. 74<br />66663 Merzig</p>
            </div>
            <div>
              <h2 className="font-heading text-lg font-semibold text-foreground mb-2">Streitschlichtung</h2>
              <p>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
                <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  https://ec.europa.eu/consumers/odr/
                </a>.
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </div>
            <div>
              <h2 className="font-heading text-lg font-semibold text-foreground mb-2">Haftung für Inhalte</h2>
              <p>
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. 
                Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
    </>
  );
}
