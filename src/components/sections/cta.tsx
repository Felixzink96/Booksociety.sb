import { ArrowRight } from "lucide-react";
import { SectionReveal } from "@/components/ui/section-reveal";
import { Button } from "@/components/ui/button";
import { WatercolorBlob } from "@/components/decorative/watercolor-blob";

export function CTA() {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Watercolor decorations */}
      <WatercolorBlob
        className="-top-16 -left-16"
        size={320}
        color="#8B1A2F"
        opacity={0.12}
      />
      <WatercolorBlob
        className="-bottom-16 -right-16"
        size={280}
        color="#F4C2C2"
        opacity={0.25}
      />

      <div className="relative max-w-2xl mx-auto text-center">
        <SectionReveal>
          <h2 className="font-display text-4xl md:text-5xl text-charcoal mb-6 leading-tight">
            Werde Teil der Booksociety
          </h2>
          <p className="font-body text-charcoal/65 text-lg leading-relaxed mb-10">
            Liebst du Bücher und suchst nach Gleichgesinnten in Saarbrücken?
            Schreib uns einfach auf Instagram – wir freuen uns auf dich!
          </p>
          <Button href="https://ig.me/m/booksociety.sb" variant="primary">
            Jetzt Kontakt aufnehmen
            <ArrowRight className="w-4 h-4" />
          </Button>
        </SectionReveal>
      </div>
    </section>
  );
}
