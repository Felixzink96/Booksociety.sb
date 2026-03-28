import { Instagram, Heart } from "lucide-react";
import { SectionReveal, StaggerContainer, StaggerItem } from "@/components/ui/section-reveal";
import { Button } from "@/components/ui/button";

const PLACEHOLDER_CARDS = [0, 1, 2, 3, 4, 5];

export function InstagramFeed() {
  return (
    <section className="py-20 px-4 bg-warm-sand/30">
      <div className="max-w-5xl mx-auto">
        <SectionReveal className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl text-charcoal mb-2">
            Folge uns auf Instagram
          </h2>
          <p className="font-body text-charcoal/60 text-lg">@booksociety.sb</p>
        </SectionReveal>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
          {PLACEHOLDER_CARDS.map((i) => (
            <StaggerItem key={i}>
              <a
                href="https://instagram.com/booksociety.sb"
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-square block rounded-xl overflow-hidden bg-gradient-to-br from-rose/40 to-dusty-rose/40 group"
              >
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-colors duration-300 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow" />
                </div>
                {/* Subtle botanical-inspired placeholder pattern */}
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <Instagram className="w-10 h-10 text-wine" />
                </div>
              </a>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <SectionReveal className="flex justify-center">
          <Button
            href="https://instagram.com/booksociety.sb"
            variant="outline"
          >
            <Instagram className="w-4 h-4" />
            Auf Instagram folgen
          </Button>
        </SectionReveal>
      </div>
    </section>
  );
}
