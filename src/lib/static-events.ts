/**
 * Static event data - used until CMS is fully connected.
 * Replace with Payload CMS queries once DB is live.
 */

export const FIRST_EVENT = {
  id: "1",
  title: "First Read: Verity von Colleen Hoover",
  slug: "first-read-verity",
  date: "2026-05-16T15:00:00.000Z",
  time: "15:00",
  event_type: "lesekreis" as const,
  description: `Unser allererstes Buchklub-Treffen! Wir starten mit "Verity" von Colleen Hoover.

Bitte habt das Buch bis zum Treffen besorgt und mindestens die ersten 50 Seiten gelesen. Wir freuen uns auf eine spannende Diskussion!

Verity ist ein packender Thriller über eine angehende Schriftstellerin, die dunkle Geheimnisse in den unveröffentlichten Manuskripten einer berühmten Autorin entdeckt. Perfekt für unseren ersten gemeinsamen Leseabend.`,
  location: {
    name: "Staatstheater Saarbrücken",
    address: "Schillerplatz 1, 66111 Saarbrücken",
    lat: 49.2344,
    lng: 6.9965,
  },
};

export const CURRENT_BOOK = {
  title: "Verity",
  author: "Colleen Hoover",
  description: "Ein packender Thriller über Wahrheit, Lügen und die dunklen Seiten des Schreibens. Unser erstes gemeinsames Buch — lest mindestens die ersten 50 Seiten bis zum 16. Mai!",
  cover_image: { url: "/books/verity-cover.jpg" },
};

export const ALL_EVENTS = [FIRST_EVENT];
