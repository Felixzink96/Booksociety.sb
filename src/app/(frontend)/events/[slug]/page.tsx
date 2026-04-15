import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, MapPin, BookOpen, User, Bookmark } from "lucide-react";
import { getEventBySlug } from "@/lib/payload";
import { ALL_EVENTS } from "@/lib/static-events";
import { SectionReveal } from "@/components/ui/section-reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EventJsonLd } from "@/components/seo/json-ld";

type EventType = "lesekreis" | "buechertausch" | "leseabend" | "sonstiges";

const typeLabels: Record<EventType, string> = {
  lesekreis: "Lesekreis",
  buechertausch: "Büchertausch",
  leseabend: "Leseabend",
  sonstiges: "Sonstiges",
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("de-DE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  let event: any = null;
  try {
    event = await getEventBySlug(slug);
  } catch {
    // DB not connected
  }
  if (!event) {
    event = ALL_EVENTS.find((e) => e.slug === slug) ?? null;
  }
  if (!event) return { title: "Event nicht gefunden" };
  return {
    title: `${event.title} – Booksociety Saarbrücken`,
    description: `${typeLabels[(event.event_type as EventType) ?? "sonstiges"]} am ${formatDate(event.date as string)} in Saarbrücken.`,
  };
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params;

  let event: any = null;
  try {
    event = await getEventBySlug(slug);
  } catch {
    /* DB not connected - try static events */
  }

  // Fallback to static events
  if (!event) {
    event = ALL_EVENTS.find((e) => e.slug === slug) ?? null;
  }

  if (!event) notFound();

  const eventType = (event.event_type ?? "sonstiges") as EventType;
  const hasCoords =
    typeof event.location?.lat === "number" &&
    typeof event.location?.lng === "number";

  return (
    <>
      <EventJsonLd event={event} />
      <section className="pt-32 pb-20">
      <div className="mx-auto max-w-3xl px-6">
        {/* Back link */}
        <SectionReveal>
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 text-sm text-charcoal/60 hover:text-wine transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Alle Events
          </Link>
        </SectionReveal>

        {/* Badge + Title */}
        <SectionReveal delay={0.05}>
          <div className="mb-4">
            <Badge variant="rose">{typeLabels[eventType] ?? eventType}</Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-charcoal mb-6">
            {event.title}
          </h1>
        </SectionReveal>

        {/* Meta */}
        <SectionReveal delay={0.1}>
          <div className="flex flex-col gap-3 mb-10 text-charcoal/70">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-wine shrink-0" />
              <span className="text-sm">{formatDate(event.date)}</span>
            </div>
            {event.time && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-wine shrink-0" />
                <span className="text-sm">{event.time} Uhr</span>
              </div>
            )}
            {event.location?.name && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-wine shrink-0" />
                <span className="text-sm">
                  {event.location.name}
                  {event.location.address ? `, ${event.location.address}` : ""}
                </span>
              </div>
            )}
          </div>
        </SectionReveal>

        {/* OpenStreetMap embed */}
        {hasCoords && (
          <SectionReveal delay={0.15}>
            <div className="rounded-2xl overflow-hidden mb-10 shadow-sm">
              <iframe
                title="Karte"
                width="100%"
                height="300"
                style={{ border: 0 }}
                loading="lazy"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${event.location.lng - 0.005}%2C${event.location.lat - 0.003}%2C${event.location.lng + 0.005}%2C${event.location.lat + 0.003}&layer=mapnik&marker=${event.location.lat}%2C${event.location.lng}`}
              />
            </div>
          </SectionReveal>
        )}

        {/* Description */}
        {event.description && (
          <SectionReveal delay={0.2}>
            <div className="prose prose-charcoal max-w-none mb-10">
              {/* RichText from Payload comes as serialized object; render as plain text fallback */}
              {typeof event.description === "string" ? (
                <p className="text-charcoal/80 leading-relaxed whitespace-pre-line">
                  {event.description}
                </p>
              ) : (
                <p className="text-charcoal/80 leading-relaxed">
                  {extractPlainText(event.description)}
                </p>
              )}
            </div>
          </SectionReveal>
        )}

        {/* Book info section */}
        {event.book && (
          <SectionReveal delay={0.25}>
            <div className="bg-warm-sand/30 rounded-2xl p-6 md:p-8 mb-10">
              <h2 className="font-display text-xl font-bold text-charcoal mb-6 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-wine" />
                Unser Buch
              </h2>
              <div className="flex flex-col sm:flex-row gap-6">
                {event.book.cover && (
                  <div className="flex-shrink-0">
                    <Image
                      src={event.book.cover}
                      alt={`Cover: ${event.book.title}`}
                      width={140}
                      height={210}
                      className="rounded-lg shadow-md w-[140px] h-auto"
                    />
                  </div>
                )}
                <div className="space-y-3">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-charcoal">{event.book.title}</h3>
                    <p className="text-wine font-medium">{event.book.author}</p>
                  </div>
                  {event.book.description && (
                    <p className="text-charcoal/70 text-sm leading-relaxed">{event.book.description}</p>
                  )}
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-charcoal/60 pt-2">
                    {event.book.publisher && (
                      <span className="flex items-center gap-1.5">
                        <Bookmark className="w-3.5 h-3.5 text-dusty-rose" />
                        {event.book.publisher}
                      </span>
                    )}
                    {event.book.pages && (
                      <span className="flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-dusty-rose" />
                        {event.book.pages} Seiten
                      </span>
                    )}
                    {event.book.genre && (
                      <span className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-dusty-rose" />
                        {event.book.genre}
                      </span>
                    )}
                  </div>
                  {event.book.readUntil && (
                    <div className="bg-white rounded-xl px-4 py-3 mt-2 border border-rose/20">
                      <p className="text-sm text-wine font-semibold">
                        Bitte lesen: {event.book.readUntil}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </SectionReveal>
        )}

        {/* CTA */}
        <SectionReveal delay={0.3}>
          <div className="flex flex-wrap gap-3">
            <Button href="/events" variant="primary">
              Alle Events ansehen
            </Button>
            <Button
              href="https://ig.me/m/booksociety.sb"
              variant="outline"
            >
              Fragen? Schreib uns
            </Button>
          </div>
        </SectionReveal>
      </div>
      </section>
    </>
  );
}

/** Simple helper to extract plain text from Payload Lexical rich text */
function extractPlainText(richText: any): string {
  if (!richText?.root?.children) return "";
  function walk(nodes: any[]): string {
    return nodes
      .map((node: any) => {
        if (node.text) return node.text;
        if (node.children) return walk(node.children);
        return "";
      })
      .join(" ");
  }
  return walk(richText.root.children);
}
