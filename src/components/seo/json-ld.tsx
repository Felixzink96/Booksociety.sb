interface JsonLdProps {
  data: Record<string, any>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  return (
    <JsonLd data={{
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Booksociety Saarbrücken",
      description: "Buchclub in Saarbrücken - Gemeinsam lesen, gemeinsam erleben.",
      url: process.env.NEXT_PUBLIC_SITE_URL,
      sameAs: [process.env.NEXT_PUBLIC_INSTAGRAM_URL],
      areaServed: {
        "@type": "City",
        name: "Saarbrücken",
        addressCountry: "DE",
      },
    }} />
  );
}

export function EventJsonLd({ event }: { event: { title: string; date: string; time: string; location: { name: string; address?: string }; event_type: string } }) {
  return (
    <JsonLd data={{
      "@context": "https://schema.org",
      "@type": "Event",
      name: event.title,
      startDate: event.date,
      location: {
        "@type": "Place",
        name: event.location.name,
        address: event.location.address ?? "Saarbrücken, Deutschland",
      },
      organizer: {
        "@type": "Organization",
        name: "Booksociety Saarbrücken",
      },
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      isAccessibleForFree: true,
    }} />
  );
}

export function FaqJsonLd({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <JsonLd data={{
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    }} />
  );
}
