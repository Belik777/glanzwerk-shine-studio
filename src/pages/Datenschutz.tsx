import { AnimatedSection } from "@/components/AnimatedSection";
import { SEOHead } from "@/components/SEOHead";

export default function Datenschutz() {
  return (
    <>
      <SEOHead title="Datenschutz – MS Glanzwerk Merzig" description="Datenschutzerklärung von MS Glanzwerk Merzig. Informationen zum Umgang mit personenbezogenen Daten." />
      <section className="section-padding">
      <div className="container mx-auto px-4 max-w-3xl">
        <AnimatedSection>
          <h1 className="font-heading text-4xl font-bold mb-10">Datenschutzerklärung</h1>
          <div className="glass-card p-8 md:p-12 space-y-8 text-muted-foreground leading-relaxed">
            <div>
              <h2 className="font-heading text-lg font-semibold text-foreground mb-2">1. Datenschutz auf einen Blick</h2>
              <p>
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, 
                wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
              </p>
            </div>
            <div>
              <h2 className="font-heading text-lg font-semibold text-foreground mb-2">2. Verantwortliche Stelle</h2>
              <p>MS Glanzwerk<br />Trierer Str. 74<br />66663 Merzig<br />Telefon: 0177 2725455</p>
            </div>
            <div>
              <h2 className="font-heading text-lg font-semibold text-foreground mb-2">3. Datenerfassung auf dieser Website</h2>
              <h3 className="font-semibold text-foreground mt-4 mb-1">Kontaktformular</h3>
              <p>
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen 
                Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. 
                Diese Daten geben wir nicht ohne Ihre Einwilligung weiter. Grundlage: Art. 6 Abs. 1 lit. b DSGVO.
              </p>
            </div>
            <div>
              <h2 className="font-heading text-lg font-semibold text-foreground mb-2">4. Ihre Rechte</h2>
              <p>
                Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger 
                und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung oder Löschung dieser Daten. 
                Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an uns wenden.
              </p>
            </div>
            <div>
              <h2 className="font-heading text-lg font-semibold text-foreground mb-2">5. Hosting</h2>
              <p>
                Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst werden, 
                werden auf den Servern des Hosters gespeichert. Grundlage: Art. 6 Abs. 1 lit. f DSGVO.
              </p>
            </div>
            <div>
              <h2 className="font-heading text-lg font-semibold text-foreground mb-2">6. SSL-Verschlüsselung</h2>
              <p>
                Diese Seite nutzt aus Sicherheitsgründen eine SSL-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, 
                dass die Adresszeile des Browsers von „http://" auf „https://" wechselt.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
    </>
  );
}
