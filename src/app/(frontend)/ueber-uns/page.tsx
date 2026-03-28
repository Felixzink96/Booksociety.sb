import type { Metadata } from "next";
import { Book, Heart, Users } from "lucide-react";
import { SectionReveal } from "@/components/ui/section-reveal";
import { BotanicalLine } from "@/components/decorative/botanical-line";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FaqJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Über uns – Booksociety Saarbrücken",
  description:
    "Lerne die Booksociety Saarbrücken kennen: unsere Geschichte, Mission und wie du mitmachen kannst.",
};

const faqItems = [
  {
    question: "Muss ich jedes Mal kommen?",
    answer:
      "Nein, du kannst so oft vorbeikommen wie du möchtest. Es gibt keine Verpflichtung, an jedem Treffen teilzunehmen. Komm einfach, wenn du Lust und Zeit hast!",
  },
  {
    question: "Kostet die Teilnahme etwas?",
    answer:
      "Die Teilnahme ist kostenlos. Wir sind ein ehrenamtlich organisierter Buchclub und freuen uns über jede und jeden, die oder der vorbeischaut.",
  },
  {
    question: "Wo trefft ihr euch?",
    answer:
      "An verschiedenen Orten in Saarbrücken – meistens in gemütlichen Cafés oder öffentlichen Räumen. Den genauen Ort findest du immer bei den einzelnen Events.",
  },
  {
    question: "Muss ich das Buch gelesen haben?",
    answer:
      "Beim Lesekreis ist es schön, wenn du das Buch gelesen hast, aber nicht zwingend nötig. Beim Büchertausch oder Leseabend brauchst du kein bestimmtes Buch gelesen zu haben.",
  },
];

export default function UeberUnsPage() {
  return (
    <>
      <FaqJsonLd items={faqItems} />
      {/* Geschichte */}
      <section className="bg-warm-sand/30 pt-32 pb-20 relative overflow-hidden">
        <BotanicalLine
          variant="branch-left"
          className="absolute top-0 left-0 opacity-30 hidden lg:block"
        />
        <div className="mx-auto max-w-4xl px-6">
          <SectionReveal className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-wine mb-4">
              Über uns
            </h1>
            <p className="text-charcoal/70 max-w-2xl mx-auto leading-relaxed">
              Wir sind die Booksociety Saarbrücken – ein Buchclub für alle, die
              Geschichten lieben.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <div className="rounded-2xl bg-white p-8 md:p-10 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-rose/20 flex items-center justify-center">
                  <Book className="w-5 h-5 text-wine" />
                </div>
                <h2 className="text-2xl font-display font-bold text-charcoal">
                  Unsere Geschichte
                </h2>
              </div>
              <p className="text-charcoal/70 leading-relaxed">
                Die Booksociety Saarbrücken wurde aus der Überzeugung heraus gegründet,
                dass Lesen mehr ist als eine einsame Beschäftigung. Was als kleiner
                Lesekreis unter Freunden begann, ist zu einer wachsenden Community
                geworden, die Menschen zusammenbringt – über Bücher, Gespräche und
                gemeinsame Erlebnisse. Wir treffen uns regelmäßig in Saarbrücken, um
                Bücher zu besprechen, zu tauschen und gemeinsam zu lesen.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6">
          <SectionReveal>
            <div className="rounded-2xl bg-white p-8 md:p-10 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-wine/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-wine" />
                </div>
                <h2 className="text-2xl font-display font-bold text-charcoal">
                  Unsere Mission
                </h2>
              </div>
              <p className="text-charcoal/70 leading-relaxed">
                Wir glauben, dass Bücher verbinden. Unsere Mission ist es, einen offenen
                und einladenden Raum zu schaffen, in dem sich Lesebegeisterte
                austauschen können – unabhängig von Alter, Hintergrund oder
                Lesegeschmack. Ob du viel oder wenig liest, ob du Klassiker oder
                Bestseller bevorzugst: Bei uns bist du willkommen.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Mitmachen */}
      <section className="bg-warm-sand/30 py-20 relative overflow-hidden">
        <BotanicalLine
          variant="branch-right"
          className="absolute bottom-0 right-0 opacity-30 hidden lg:block"
        />
        <div className="mx-auto max-w-4xl px-6">
          <SectionReveal>
            <div className="rounded-2xl bg-white p-8 md:p-10 shadow-sm mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-botanical/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-botanical" />
                </div>
                <h2 className="text-2xl font-display font-bold text-charcoal">
                  Mitmachen
                </h2>
              </div>
              <p className="text-charcoal/70 leading-relaxed mb-6">
                Du möchtest dabei sein? Es ist ganz einfach: Schau dir unsere Events
                an und komm vorbei! Du brauchst dich nicht anzumelden – komm einfach
                zum nächsten Treffen und lerne uns kennen. Wir freuen uns auf dich!
              </p>
              <div className="flex flex-wrap gap-3">
                <Button href="/events" variant="primary">
                  Events ansehen
                </Button>
                <Button
                  href={
                    process.env.NEXT_PUBLIC_INSTAGRAM_URL ??
                    "https://www.instagram.com/booksociety.sb"
                  }
                  variant="outline"
                >
                  Instagram folgen
                </Button>
              </div>
            </div>
          </SectionReveal>

          {/* FAQ */}
          <SectionReveal delay={0.1}>
            <h2 className="text-2xl font-display font-bold text-charcoal mb-6 text-center">
              Häufig gestellte Fragen
            </h2>
            <Accordion items={faqItems} />
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
