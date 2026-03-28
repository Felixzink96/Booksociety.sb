import Link from "next/link";
import { MapPin, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type EventType = "lesekreis" | "buechertausch" | "leseabend" | "sonstiges";

const typeLabels: Record<EventType, string> = {
  lesekreis: "Lesekreis",
  buechertausch: "Büchertausch",
  leseabend: "Leseabend",
  sonstiges: "Sonstiges",
};

function formatDay(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("de-DE", { day: "numeric" });
}

function formatMonth(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("de-DE", { month: "short" }).toUpperCase();
}

interface EventCardProps {
  event: any;
  isPast?: boolean;
}

export function EventCard({ event, isPast = false }: EventCardProps) {
  const eventType = (event.event_type ?? "sonstiges") as EventType;

  return (
    <Link
      href={`/events/${event.slug}`}
      className={`group block rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300 ${
        isPast ? "opacity-60 grayscale" : ""
      }`}
    >
      {/* Date header */}
      <div className="bg-gradient-to-r from-rose to-dusty-rose px-5 py-3 flex items-center gap-3">
        <div className="text-center leading-tight">
          <span className="block text-2xl font-display font-bold text-wine">
            {formatDay(event.date)}
          </span>
          <span className="block text-[10px] font-semibold tracking-widest text-wine/70">
            {formatMonth(event.date)}
          </span>
        </div>
        <Badge variant="wine" className="ml-auto text-[10px]">
          {typeLabels[eventType] ?? eventType}
        </Badge>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col gap-2">
        <h3 className="text-lg font-display font-semibold text-charcoal group-hover:text-wine transition-colors line-clamp-2">
          {event.title}
        </h3>

        {event.location?.name && (
          <div className="flex items-center gap-1.5 text-charcoal/60 text-sm">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{event.location.name}</span>
          </div>
        )}

        {event.time && (
          <div className="flex items-center gap-1.5 text-charcoal/60 text-sm">
            <Clock className="w-3.5 h-3.5 shrink-0" />
            <span>{event.time} Uhr</span>
          </div>
        )}
      </div>
    </Link>
  );
}
