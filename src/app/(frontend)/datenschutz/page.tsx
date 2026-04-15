import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung – Booksociety Saarbrücken",
  robots: "noindex",
};

export default function DatenschutzPage() {
  return (
    <section className="pt-32 pb-20">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-charcoal mb-10">
          Datenschutzerklärung
        </h1>

        <div className="space-y-8 text-charcoal/80 leading-relaxed">
          <div>
            <h2 className="text-xl font-display font-bold text-charcoal mb-3">
              Verantwortliche Stelle
            </h2>
            <p>
              Gina Tazarkesh<br />
              Saargemünderstr. 175<br />
              66130 Güdingen<br />
              Deutschland
            </p>
            <p className="mt-4">
              Kontakt: Instagram{" "}
              <a
                href="https://www.instagram.com/booksociety.sb"
                className="text-wine hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                @booksociety.sb
              </a>
            </p>
          </div>

          <div>
            <h2 className="text-xl font-display font-bold text-charcoal mb-3">
              Datenschutz auf einen Blick
            </h2>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit
              Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.
              Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert
              werden können.
            </p>
            <p className="mt-4">
              Wir erheben keine personenbezogenen Daten über Kontaktformulare oder
              Newsletter. Diese Website dient ausschließlich der Information über den
              Buchclub Booksociety Saarbrücken.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-display font-bold text-charcoal mb-3">
              Hosting
            </h2>
            <p>
              Diese Website wird bei Vercel Inc., 340 Pine Street, Suite 701, San Francisco,
              CA 94104, USA gehostet. Weitere Informationen finden Sie in der
              Datenschutzerklärung von Vercel:{" "}
              <a
                href="https://vercel.com/legal/privacy-policy"
                className="text-wine hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                vercel.com/legal/privacy-policy
              </a>
              .
            </p>
            <p className="mt-4">
              Beim Besuch dieser Website werden automatisch Informationen in sogenannten
              Server-Log-Dateien gespeichert, die Ihr Browser automatisch übermittelt.
              Dies sind: Browsertyp und Browserversion, verwendetes Betriebssystem,
              Referrer URL, Hostname des zugreifenden Rechners sowie Uhrzeit der
              Serveranfrage. Diese Daten werden nicht mit anderen Datenquellen
              zusammengeführt.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-display font-bold text-charcoal mb-3">
              Externe Links (Instagram / Meta)
            </h2>
            <p>
              Diese Website enthält Links zu Instagram (Meta Platforms Ireland Limited,
              4 Grand Canal Square, Dublin 2, Irland). Wenn Sie auf einen solchen Link
              klicken, werden Sie auf die Seite von Instagram weitergeleitet. Meta kann
              dann Daten über Sie erheben. Wir haben keinen Einfluss auf diese
              Datenerhebung. Weitere Informationen finden Sie in der Datenschutzerklärung
              von Meta:{" "}
              <a
                href="https://de-de.facebook.com/privacy/policy/"
                className="text-wine hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                de-de.facebook.com/privacy/policy
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="text-xl font-display font-bold text-charcoal mb-3">
              Ihre Rechte
            </h2>
            <p>
              Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger
              und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben
              außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen.
              Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie
              diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie
              das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung
              Ihrer personenbezogenen Daten zu verlangen.
            </p>
            <p className="mt-4">
              Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich
              jederzeit an uns wenden. Ihnen steht zudem ein Beschwerderecht bei der
              zuständigen Aufsichtsbehörde zu.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
