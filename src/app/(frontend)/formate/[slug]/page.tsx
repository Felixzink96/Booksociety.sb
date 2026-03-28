import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getFormatBySlug, getEvents } from "@/lib/payload";
import { SectionReveal } from "@/components/ui/section-reveal";
import { FormatIcon } from "@/components/events/format-icon";
import { EventCard } from "@/components/events/event-card";

const colorStyles: Record<string, { bg: string; text: string; icon: string }> = {
  rose: { bg: "bg-rose/20", text: "text-wine", icon: "text-wine" },
  wine: { bg: "bg-wine/10", text: "text-wine", icon: "text-wine" },
  botanical: { bg: "bg-botanical/10", text: "text-botanical", icon: "text-botanical" },
  gold: { bg: "bg-gold/10", text: "text-gold", icon: "text-gold" },
};

/** Map format slug to event_type value */
const slugToEventType: Record<string, string> = {
  lesekreis: "lesekreis",
  buechertausch: "buechertausch",
  leseabend: "leseabend",
  sonstiges: "sonstiges",
};

function extractPlainText(richText: any): string {
  if (typeof richText === "string") return richText;
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

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const format = await getFormatBySlug(slug);
    if (!format) return { title: "Format nicht gefunden" };
    return {
      title: `${format.title} – Booksociety Saarbruecken`,
      description: extractPlainText(format.description).slice(0, 160),
    };
  } catch {
    return { title: "Format – Booksociety Saarbruecken" };
  }
}

export default async function FormatDetailPage({ params }: PageProps) {
  const { slug } = await params;

  let format: any = null;
  try {
    format = await getFormatBySlug(slug);
  } catch {
    /* DB not connected */
  }

  if (!format) notFound();

  const color = colorStyles[format.color] ?? colorStyles.rose;

  // Fetch related events by matching event_type to format slug
  let relatedEvents: any[] = [];
  const eventType = slugToEventType[slug];
  if (eventType) {
    try {
      const upcoming = await getEvents({ upcoming: true });
      relatedEvents = upcoming.filter((e: any) => e.event_type === eventType);
    } catch {
      relatedEvents = [];
    }
  }

  return (
    <section className="py-20">
      <div className="mx-auto max-w-3xl px-6">
        {/* Back link */}
        <SectionReveal>
          <Link
            href="/formate"
            className="inline-flex items-center gap-1.5 text-sm text-charcoal/60 hover:text-wine transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Alle Formate
          </Link>
        </SectionReveal>

        {/* Icon + Title */}
        <SectionReveal delay={0.05}>
          <div className="flex items-center gap-4 mb-6">
            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center ${color.bg}`}
            >
              <FormatIcon icon={format.icon} className={`w-7 h-7 ${color.icon}`} />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-charcoal">
              {format.title}
            </h1>
          </div>
        </SectionReveal>

        {/* Description */}
        {format.description && (
          <SectionReveal delay={0.1}>
            <div className="mb-12">
              <p className="text-charcoal/80 leading-relaxed whitespace-pre-line">
                {extractPlainText(format.description)}
              </p>
            </div>
          </SectionReveal>
        )}

        {/* Related events */}
        {relatedEvents.length > 0 && (
          <>
            <SectionReveal delay={0.15}>
              <h2 className="text-2xl font-display font-bold text-charcoal mb-6">
                Kommende Events
              </h2>
            </SectionReveal>
            <div className="grid gap-6 sm:grid-cols-2">
              {relatedEvents.map((event: any) => (
                <SectionReveal key={event.id ?? event.slug} delay={0.2}>
                  <EventCard event={event} />
                </SectionReveal>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
