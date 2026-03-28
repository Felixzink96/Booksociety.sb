import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum – Booksociety Saarbrücken",
  robots: "noindex",
};

export default function ImpressumPage() {
  return (
    <section className="pt-24 pb-20">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-charcoal mb-10">
          Impressum
        </h1>

        <div className="space-y-8 text-charcoal/80 leading-relaxed">
          <div>
            <h2 className="text-xl font-display font-bold text-charcoal mb-3">
              Angaben gemäß § 5 TMG
            </h2>
            <p>
              [Name]<br />
              [Straße Hausnummer]<br />
              [PLZ] Saarbrücken<br />
              Deutschland
            </p>
          </div>

          <div>
            <h2 className="text-xl font-display font-bold text-charcoal mb-3">
              Kontakt
            </h2>
            <p>
              Instagram:{" "}
              <a
                href={process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://www.instagram.com/booksociety.sb"}
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
              Haftung für Inhalte
            </h2>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf
              diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10
              TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
              gespeicherte fremde Informationen zu überwachen oder nach Umständen zu
              forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>
            <p className="mt-4">
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen
              nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche
              Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten
              Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden
              Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
