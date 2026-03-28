import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, MapPin } from "lucide-react";
import { getEventBySlug } from "@/lib/payload";
import { SectionReveal } from "@/components/ui/section-reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EventJsonLd } from "@/components/seo/json-ld";

type EventType = "lesekreis" | "buechertausch" | "leseabend" | "sonstiges";

const typeLabels: Record<EventType, string> = {
  lesekreis: "Lesekreis",
  buechertausch: "Buechertausch",
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
  try {
    const event = await getEventBySlug(slug);
    if (!event) return { title: "Event nicht gefunden" };
    return {
      title: `${event.title} – Booksociety Saarbruecken`,
      description: `${typeLabels[(event.event_type as EventType) ?? "sonstiges"]} am ${formatDate(event.date as string)} in Saarbruecken.`,
    };
  } catch {
    return { title: "Event – Booksociety Saarbruecken" };
  }
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params;

  let event: any = null;
  try {
    event = await getEventBySlug(slug);
  } catch {
    /* DB not connected yet */
  }

  if (!event) notFound();

  const eventType = (event.event_type ?? "sonstiges") as EventType;
  const hasCoords =
    typeof event.location?.lat === "number" &&
    typeof event.location?.lng === "number";

  return (
    <>
      <EventJsonLd event={event} />
      <section className="py-20">
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

        {/* CTA */}
        <SectionReveal delay={0.25}>
          <div className="flex flex-wrap gap-3">
            <Button href="/events" variant="primary">
              Alle Events ansehen
            </Button>
            <Button
              href={
                process.env.NEXT_PUBLIC_INSTAGRAM_URL ??
                "https://www.instagram.com/booksociety.sb"
              }
              variant="outline"
            >
              Folge uns auf Instagram
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
