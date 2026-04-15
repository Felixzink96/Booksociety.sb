"use client";

import { SectionReveal } from "@/components/ui/section-reveal";
import { Button } from "@/components/ui/button";
import { InstagramIcon } from "@/components/ui/instagram-icon";

export function InstagramFeed() {
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://www.instagram.com/booksociety.sb";

  return (
    <section className="py-20 px-4 bg-warm-sand/30">
      <div className="max-w-4xl mx-auto">
        <SectionReveal className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl text-charcoal mb-2">
            Folge uns auf Instagram
          </h2>
          <p className="font-body text-charcoal/60 text-lg">@booksociety.sb</p>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div className="rounded-2xl overflow-hidden bg-white shadow-sm">
            <iframe
              src="https://www.instagram.com/booksociety.sb/embed"
              width="100%"
              height="800"
              frameBorder="0"
              scrolling="yes"
              allowTransparency
              className="w-full"
              title="Instagram @booksociety.sb"
            />
          </div>
        </SectionReveal>

        <SectionReveal delay={0.2} className="flex justify-center mt-8">
          <Button href={instagramUrl} variant="outline">
            <InstagramIcon className="w-4 h-4" />
            Auf Instagram folgen
          </Button>
        </SectionReveal>
      </div>
    </section>
  );
}
