import type { Metadata } from "next";
import { getEvents } from "@/lib/payload";
import { ALL_EVENTS } from "@/lib/static-events";
import { SectionReveal } from "@/components/ui/section-reveal";
import { EventCard } from "@/components/events/event-card";
import { EventFilter } from "@/components/events/event-filter";

export const metadata: Metadata = {
  title: "Events – Booksociety Saarbrücken",
  description:
    "Alle kommenden und vergangenen Events der Booksociety Saarbrücken: Lesekreis, Büchertausch, Leseabende und mehr.",
};

interface PageProps {
  searchParams: Promise<{ typ?: string }>;
}

export default async function EventsPage({ searchParams }: PageProps) {
  const { typ } = await searchParams;

  let upcomingEvents: any[] = ALL_EVENTS;
  let pastEvents: any[] = [];

  try {
    const cmsUpcoming = await getEvents({ upcoming: true });
    const cmsPast = await getEvents({ upcoming: false });
    if (cmsUpcoming.length > 0) upcomingEvents = cmsUpcoming;
    if (cmsPast.length > 0) pastEvents = cmsPast;
  } catch {
    // CMS not connected - static data already set
  }

  const filteredUpcoming = typ
    ? upcomingEvents.filter((e: any) => e.event_type === typ)
    : upcomingEvents;

  const filteredPast = typ
    ? pastEvents.filter((e: any) => e.event_type === typ)
    : pastEvents;

  return (
    <>
      {/* Hero section */}
      <section className="bg-warm-sand/30 pt-32 pb-20">
        <div className="mx-auto max-w-5xl px-6">
          <SectionReveal className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-wine mb-4">
              Unsere Events
            </h1>
            <p className="text-charcoal/70 max-w-2xl mx-auto leading-relaxed">
              Entdecke kommende Treffen, Lesekreise und Büchertausch-Events der
              Booksociety Saarbrücken. Wir freuen uns auf dich!
            </p>
          </SectionReveal>

          <SectionReveal delay={0.1} className="flex justify-center">
            <EventFilter />
          </SectionReveal>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <SectionReveal>
            <h2 className="text-2xl font-display font-bold text-charcoal mb-8">
              Kommende Events
            </h2>
          </SectionReveal>

          {filteredUpcoming.length === 0 ? (
            <SectionReveal delay={0.1}>
              <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
                <p className="text-charcoal/60">
                  Aktuell sind keine kommenden Events geplant. Schau bald wieder vorbei!
                </p>
              </div>
            </SectionReveal>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredUpcoming.map((event: any) => (
                <SectionReveal key={event.id ?? event.slug}>
                  <EventCard event={event} />
                </SectionReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Past Events */}
      {filteredPast.length > 0 && (
        <section className="py-16 bg-warm-sand/20">
          <div className="mx-auto max-w-6xl px-6">
            <SectionReveal>
              <h2 className="text-2xl font-display font-bold text-charcoal/60 mb-8">
                Vergangene Events
              </h2>
            </SectionReveal>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPast.map((event: any) => (
                <SectionReveal key={event.id ?? event.slug}>
                  <EventCard event={event} isPast />
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
