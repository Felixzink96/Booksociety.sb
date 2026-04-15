import Link from "next/link";
import { Calendar, MapPin, Clock, ArrowRight, BookOpen } from "lucide-react";
import { SectionReveal } from "@/components/ui/section-reveal";
import { Countdown } from "@/components/ui/countdown";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type EventType = "lesekreis" | "buechertausch" | "leseabend" | "sonstiges";

interface EventData {
  title: string;
  slug: string;
  date: string;
  time: string;
  event_type: EventType;
  location?: {
    name?: string;
    address?: string;
  };
}

interface NextEventProps {
  event?: EventData | null;
}

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

export function NextEvent({ event }: NextEventProps) {
  return (
    <section id="next-event" className="bg-warm-sand/30 py-24">
      <div className="mx-auto max-w-4xl px-6">
        <SectionReveal className="mb-10 text-center">
          <h2 className="text-3xl font-display font-bold text-wine md:text-4xl">
            Nächstes Treffen
          </h2>
          <p className="text-charcoal/50 mt-2">Sei dabei!</p>
        </SectionReveal>

        {!event ? (
          <SectionReveal delay={0.1}>
            <div className="flex flex-col items-center gap-4 rounded-3xl bg-white px-10 py-16 text-center shadow-sm">
              <BookOpen className="w-12 h-12 text-wine/30" />
              <h3 className="text-2xl font-display font-semibold text-charcoal">
                Bald geht&apos;s los!
              </h3>
              <p className="max-w-sm text-charcoal/60 leading-relaxed">
                Wir planen gerade unser nächstes Treffen. Folge uns auf Instagram
                für Updates!
              </p>
              <Button href="/events" variant="outline" className="mt-2">
                Alle Events ansehen
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </SectionReveal>
        ) : (
          <SectionReveal delay={0.1}>
            <div className="rounded-3xl bg-white p-8 md:p-12 shadow-sm text-center">
              {/* Badge */}
              <Badge variant="rose" className="mb-4">
                {typeLabels[event.event_type] ?? event.event_type}
              </Badge>

              {/* Title - responsive, breaks on small screens */}
              <h3 className="mb-8 text-2xl sm:text-3xl md:text-4xl font-display font-bold text-charcoal leading-tight">
                {event.title}
              </h3>

              {/* Countdown - centered */}
              <div className="mb-8">
                <Countdown targetDate={event.date} />
              </div>

              {/* Meta details - centered, wrapping */}
              <div className="mb-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:flex-wrap sm:gap-6 text-charcoal/60">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-dusty-rose shrink-0" />
                  <span className="text-sm">{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-dusty-rose shrink-0" />
                  <span className="text-sm">{event.time} Uhr</span>
                </div>
                {event.location?.name && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-dusty-rose shrink-0" />
                    <span className="text-sm">{event.location.name}</span>
                  </div>
                )}
              </div>

              {/* CTAs - centered */}
              <div className="flex flex-wrap gap-3 justify-center">
                <Button href={`/events/${event.slug}`} variant="primary">
                  Details ansehen
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button href="/events" variant="outline">
                  Alle Events
                </Button>
              </div>
            </div>
          </SectionReveal>
        )}
      </div>
    </section>
  );
}
