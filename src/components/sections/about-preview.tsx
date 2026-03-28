import { Book, Users, MapPin } from "lucide-react";
import { SectionReveal, StaggerContainer, StaggerItem } from "@/components/ui/section-reveal";
import { BotanicalLine } from "@/components/decorative/botanical-line";

const features = [
  {
    icon: Book,
    title: "Gemeinsam Lesen",
    description:
      "Jeden Monat ein neues Buch — von zeitgenössischer Literatur bis zum Klassiker. Tauche ein und bringe deine Perspektive mit.",
  },
  {
    icon: Users,
    title: "Neue Leute treffen",
    description:
      "Knüpfe echte Verbindungen zu Menschen, die Bücher genauso lieben wie du. Unsere Treffen sind offen, herzlich und ungezwungen.",
  },
  {
    icon: MapPin,
    title: "Saarbrücken entdecken",
    description:
      "Wir treffen uns an wechselnden Orten in der Stadt — Cafés, Buchhandlungen, Parks. Lerne deine Stadt von einer neuen Seite kennen.",
  },
];

export function AboutPreview() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Botanical divider */}
        <SectionReveal className="flex justify-center mb-10">
          <BotanicalLine variant="divider" />
        </SectionReveal>

        {/* Heading */}
        <SectionReveal className="mb-4 text-center">
          <h2 className="text-4xl font-display font-bold text-wine md:text-5xl">
            Mehr als ein Buchclub
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.1} className="mb-14 text-center">
          <p className="mx-auto max-w-xl text-lg text-charcoal/70 leading-relaxed">
            Bei Booksociety Saarbrücken geht es nicht nur ums Lesen — es geht
            ums Erleben, Begegnen und Entdecken.
          </p>
        </SectionReveal>

        {/* Feature cards */}
        <StaggerContainer className="grid gap-6 md:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <StaggerItem key={title}>
              <div className="rounded-2xl bg-white px-8 py-8 shadow-sm transition-shadow duration-200 hover:shadow-md h-full">
                <div className="mb-5 inline-flex rounded-xl bg-rose-light p-3">
                  <Icon className="h-6 w-6 text-wine" />
                </div>
                <h3 className="mb-3 text-xl font-display font-semibold text-charcoal">
                  {title}
                </h3>
                <p className="text-charcoal/65 leading-relaxed text-sm">
                  {description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
