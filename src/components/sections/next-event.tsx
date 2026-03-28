import Link from "next/link";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
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
          <h2 className="text-4xl font-display font-bold text-wine md:text-5xl">
            Nächstes Event
          </h2>
        </SectionReveal>

        {!event ? (
          /* Fallback: no upcoming event */
          <SectionReveal delay={0.1}>
            <div className="flex flex-col items-center gap-4 rounded-2xl bg-white px-10 py-16 text-center shadow-sm">
              <span className="text-5xl">📚</span>
              <h3 className="text-2xl font-display font-semibold text-charcoal">
                Bald geht&apos;s los!
              </h3>
              <p className="max-w-sm text-charcoal/60 leading-relaxed">
                Wir planen gerade unser nächstes Treffen. Schau bald wieder
                vorbei oder folge uns, um keine Neuigkeiten zu verpassen.
              </p>
              <Button href="/events" variant="outline" className="mt-2">
                Alle Events ansehen
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </SectionReveal>
        ) : (
          /* Event card */
          <SectionReveal delay={0.1}>
            <div className="rounded-2xl bg-white px-8 py-10 shadow-sm md:px-12 md:py-12">
              {/* Badge */}
              <div className="mb-4">
                <Badge variant="rose">
                  {typeLabels[event.event_type] ?? event.event_type}
                </Badge>
              </div>

              {/* Title */}
              <h3 className="mb-8 text-3xl font-display font-bold text-charcoal md:text-4xl">
                {event.title}
              </h3>

              {/* Countdown */}
              <div className="mb-10 flex justify-center md:justify-start">
                <Countdown targetDate={event.date} />
              </div>

              {/* Meta details */}
              <div className="mb-10 flex flex-col gap-3 text-charcoal/70 sm:flex-row sm:flex-wrap sm:gap-6">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-wine shrink-0" />
                  <span className="text-sm">{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-wine shrink-0" />
                  <span className="text-sm">{event.time} Uhr</span>
                </div>
                {event.location?.name && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-wine shrink-0" />
                    <span className="text-sm">
                      {event.location.name}
                      {event.location.address
                        ? `, ${event.location.address}`
                        : ""}
                    </span>
                  </div>
                )}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
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
