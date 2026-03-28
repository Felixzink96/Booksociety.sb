# Booksociety Saarbrücken - Website Design Spec

## Überblick

Webseite für den Bücherclub "Booksociety Saarbrücken" - ein neuer Buchclub im Raum Saarbrücken, der gerade aufgebaut wird. Die Seite dient sowohl als Anlaufstelle für potenzielle neue Mitglieder als auch als Community-Hub für bestehende Mitglieder.

**Instagram:** @booksociety.sb (Hauptkommunikationskanal via DMs)

## Tech Stack

| Komponente | Technologie |
|---|---|
| Framework | Next.js (App Router) |
| CMS | Payload CMS (in Next.js integriert) |
| Datenbank | Supabase (PostgreSQL) |
| Hosting | Vercel |
| Icons | Lucide Icons (React) |
| Styling | Tailwind CSS |
| Animationen | Framer Motion |
| Fonts | Playfair Display (Headlines), Inter (Body/UI) via next/font |

## Design System

### Farbpalette

**Primärfarben** (aus dem Logo abgeleitet):

| Name | Hex | Verwendung |
|---|---|---|
| Rose | #F4C2C2 | Primary Akzente, Highlights, Badges |
| Dusty Rose | #DBA7A7 | Hover-States, Gradienten, Secondary |
| Wine | #8B4557 | Text-Akzente, Links, Primary Buttons |
| Charcoal | #2D2D2D | Überschriften, Body-Text |
| Cream | #FDF6F0 | Hintergrundfarbe |

**Erweiterte Palette:**

| Name | Hex | Verwendung |
|---|---|---|
| Rose Light | #FFF5F5 | Hover-Backgrounds, Soft-Fills |
| Warm Sand | #F7E6D8 | Section-Hintergründe, Divider |
| Botanical Green | #4A6741 | Botanische Akzente, Natur-Elemente |
| Gold | #B8860B | Spezielle Akzente (wie Logo-Variante 4) |
| White | #FFFFFF | Cards, Overlays |

### Typografie

- **Headlines / Display:** Playfair Display (Serif) - passt zur kalligrafischen Logo-Schrift
  - Hero: 48-64px
  - Section Headline: 28-36px
  - Card Title: 20-24px
- **Body / UI:** Inter (Sans-Serif) - klar, modern, lesbar
  - Body: 16px, line-height 1.6
  - Small/Meta: 12-14px
  - Label: 11-12px, uppercase, letter-spacing 2px
- **Gewichte:** Regular 400, Medium 500, Semibold 600

### Icons

Lucide Icons als React-Komponenten (`lucide-react`). Keine Emojis. Konsistente Strichstärke (2px), abgerundete Ecken.

Kern-Icons: Calendar, Book, Users, MapPin, Clock, Heart, Gift, Bell, ArrowRight, Instagram, Menu, X, Search, ChevronDown.

### Texturen & Dekorative Elemente

- **Aquarell-Blobs:** Radiale Gradienten in Rosa-Tönen als Hintergrund-Deko (wie im Logo)
- **Botanische Lineart:** Dezente SVG-Illustrationen von Blättern, Zweigen, Blüten (inspiriert von der Logo-Illustration)
- **Papier-Textur:** Subtile Linien-Muster die an Buchseiten erinnern

### Komponenten

- **Buttons:** Primary (Wine, filled), Outline (Wine, bordered), Soft (Rose, filled)
- **Event Card:** Datum-Header (Rose-Gradient) + Inhaltsbereich mit Ort/Zeit/Typ
- **Section Divider:** Botanische Lineart-SVGs oder Aquarell-Blobs
- **Tags/Badges:** Rounded pills in Rosa-Tönen (Event-Typen, Kategorien)
- **Floating Instagram Button:** Unten rechts fixiert, Instagram-Gradient, sanfte Puls-Animation, Link zu @booksociety.sb

## Seitenstruktur

### 1. Startseite (Landing Page) — STATISCH

Die Hauptseite mit WOW-Effekt. Ziel: Besucher beeindrucken und zum Mitmachen animieren.

**Sections (in Reihenfolge):**

1. **Hero Section**
   - Großes Logo (Logo 1, weißer Hintergrund) zentriert
   - Tagline: z.B. "Gemeinsam lesen. Gemeinsam erleben."
   - Aquarell-Splash-Animation im Hintergrund
   - Parallax-Effekt: Botanische Elemente schweben beim Scrollen
   - CTA-Button: "Entdecke unsere Events" (scrollt zur nächsten Section)

2. **Über uns - Kurzvorstellung**
   - Scroll-Reveal Animation (Fade-in von unten)
   - Kurzer Text über den Club, Mission, Werte
   - 3 Feature-Cards in einer Reihe:
     - "Gemeinsam Lesen" (Book-Icon)
     - "Neue Leute treffen" (Users-Icon)
     - "Saarbrücken entdecken" (MapPin-Icon)

3. **Nächstes Event - Live Countdown**
   - Holt automatisch das nächste Event aus Payload CMS
   - Animierter Flip-Card-Countdown (Tage / Stunden / Minuten / Sekunden)
   - Event-Details: Titel, Datum, Ort, kurze Beschreibung
   - CTA: "Alle Events ansehen"

4. **Aktuelle Buchempfehlung**
   - 3D-Buch-Cover mit Hover-Tilt-Effekt (CSS perspective transform)
   - Buchtitel, Autor, kurze Beschreibung
   - Optional: "Wir lesen gerade..." Label

5. **Instagram Feed Section**
   - Überschrift: "Folge uns auf Instagram"
   - Grid/Masonry-Layout mit den letzten 6-9 Instagram-Posts
   - Hover-Overlay mit Heart-Icon
   - Link zu @booksociety.sb

6. **Call-to-Action Footer-Section**
   - "Werde Teil der Booksociety"
   - Kurzer einladender Text
   - Button: "Schreib uns auf Instagram" (DM-Link)

### 2. Events & Termine — CMS (Payload)

Zentrale Event-Übersicht mit allen kommenden und vergangenen Treffen.

**Features:**
- **Kalenderansicht:** Monatsübersicht mit markierten Event-Tagen
- **Listenansicht:** Event-Cards chronologisch sortiert
- **Filter:** Nach Event-Typ (Lesekreis, Büchertausch, Leseabend, Sonstiges)
- **Event-Detailseite:** Jedes Event hat eine eigene URL
  - Titel, Datum, Uhrzeit
  - Beschreibung (Rich Text)
  - Ort mit eingebetteter Karte (Google Maps oder OpenStreetMap Embed)
  - Event-Typ Badge
  - CTA: "Komm vorbei!" mit Instagram-DM-Link
- **Archiv:** Vergangene Events bleiben sichtbar (ausgegraut oder eigener Tab)

**Payload Collection: `events`**
- `title` (text)
- `slug` (auto-generated)
- `date` (date)
- `time` (text)
- `location_name` (text)
- `location_address` (text)
- `location_lat` (number, optional)
- `location_lng` (number, optional)
- `description` (richText)
- `event_type` (select: lesekreis, buechertausch, leseabend, sonstiges)
- `featured_image` (upload, optional)
- `is_past` (virtual field, automatisch berechnet: `date < now()`)

### 3. Unsere Formate — CMS (Payload)

Erklärt die verschiedenen Event-Formate, die der Club anbietet.

**Features:**
- Übersichtsseite mit Format-Cards
- Jedes Format als eigene Detailseite
- Verlinkung zu zugehörigen Events
- Flexibel erweiterbar über CMS

**Payload Collection: `formats`**
- `title` (text)
- `slug` (auto-generated)
- `description` (richText)
- `icon` (select aus vordefinierten Lucide-Icon-Namen: Book, BookOpen, Coffee, Users, Repeat, Sparkles, MessageCircle, Music)
- `color` (select aus Farbpalette)
- `featured_image` (upload, optional)

### 4. Über uns — STATISCH

Statische Seite über den Club.

**Sections:**
- **Geschichte:** Wie der Club entstanden ist
- **Mission:** Was den Club ausmacht
- **Mitmachen:** Wie man beitreten kann (Instagram-DM)
- **FAQ:** Häufige Fragen als Accordion
  - "Muss ich jedes Mal kommen?"
  - "Kostet die Teilnahme etwas?"
  - "Wo trefft ihr euch?"
  - "Muss ich das Buch gelesen haben?"

## Globale Elemente

### Navigation

- **Desktop:** Horizontal, links Logo, rechts Links + Instagram-Icon
- **Mobile:** Hamburger-Menü mit Fullscreen-Overlay (sanfte Slide-Animation)
- **Scroll-Effekt:** Transparent auf Hero, wird beim Scrollen solid (Cream + leichter Shadow)
- **Links:** Startseite, Events, Formate, Über uns

### Footer

- Logo (klein)
- Navigation-Links
- Social Links (Instagram)
- Impressum & Datenschutz Links
- Copyright

### Floating Instagram Button

- Position: fixed, unten rechts (bottom: 24px, right: 24px)
- Instagram-Gradient Hintergrund (orange → pink → purple)
- Instagram-Icon (Lucide) in Weiß
- Sanfte Puls-Animation (scale + box-shadow)
- Link: https://www.instagram.com/booksociety.sb
- Tooltip on hover: "@booksociety.sb"

## WOW-Effekte & Animationen

### 1. Buch-Ladeanimation (Intro/Splash Screen)

Wird beim ersten Besuch angezeigt (Session-basiert, nicht bei jedem Seitenaufruf).

**Ablauf:**
1. Cream-farbener Hintergrund
2. Ein stilisiertes Buch (SVG/CSS) erscheint in der Mitte
3. Buchseiten blättern sich animiert auf (3-4 Seiten, CSS 3D Transform)
4. Aus dem Buch "wächst" ein Aquarell-Splash der sich über den ganzen Bildschirm ausbreitet
5. Logo faded elegant ein
6. Splash Screen gleitet nach oben weg, enthüllt die Startseite darunter

**Technisch:** Framer Motion + CSS 3D Transforms. Dauer: ca. 2.5-3 Sekunden. Skipbar durch Klick.

### 2. Parallax Botanische Elemente

- Dezente SVG-Blätter und Blütenblätter an den Seitenrändern
- Bewegen sich beim Scrollen in unterschiedlichen Geschwindigkeiten
- Framer Motion `useScroll` + `useTransform`

### 3. Scroll-Reveal Sections

- Jede Section hat eine Eingangsanimation (Fade-in + leichtes Slide von unten)
- Framer Motion `whileInView` mit `once: true`
- Staggered Animation für Elemente innerhalb einer Section

### 4. Live Event-Countdown

- Flip-Card-Animation für Countdown-Ziffern
- CSS 3D Transform mit perspective
- Tick-Animation jede Sekunde

### 5. 3D Buch-Cover Tilt

- Buchcover reagiert auf Mausposition (perspective tilt)
- Sanfter Schatten der sich mitbewegt
- CSS `transform: rotateY() rotateX()` basierend auf Mausposition

### 6. Navbar Scroll-Transition

- Transparent → Solid mit backdrop-blur
- Sanfte CSS Transition (300ms)

## SEO-Strategie

### Keyword-Analyse (Ahrefs, Stand 2026-03-28)

**Primäre Keywords (lokal):**

| Keyword | Vol/Monat | Difficulty | Strategie |
|---|---|---|---|
| buchclub saarbrücken | 40 | n/a | Homepage Title & H1 - KEINE Konkurrenz in SERPs! |
| lesekreis saarbrücken | 0 | n/a | Secondary, in Meta & Content |

**Sekundäre Keywords (national, low competition):**

| Keyword | Vol/Monat | Difficulty | Strategie |
|---|---|---|---|
| buchclub | 700 | 4 | In Title Tags, Content |
| lesezirkel | 600 | 31 | In Alt-Texts, Content |
| lesekreis | 200 | 1 | Events-Seite, Formate |
| buchclub in der nähe | 100 | 2 | Lokale SEO, Schema.org |
| literaturkreis | 70 | 1 | Content, Meta Descriptions |
| lesekreis in der nähe | 60 | n/a | Lokale SEO |
| buchclub online | 50 | 0 | Falls online-Formate kommen |
| gemeinsam lesen | 50 | 0 | Tagline, Hero-Text |
| lesekreis finden | 30 | 3 | Events-Seite Content |
| leserkreis daheim | 250 | 1 | Blog-Potenzial |

**Konkurrenz-Analyse:**

Die Top-Konkurrenten für "buchclub" sind:
- maedelsdielesen.de (DR 35) - Position 2
- literat.org (DR 16) - Position 4
- leemos.de (DR 8) - Position 5

Alle haben niedrige Domain Ratings. Für "buchclub saarbrücken" gibt es KEINE Konkurrenz in den SERPs - eine riesige Chance!

### Technische SEO

- **Meta Tags:** Einzigartige Title & Description pro Seite
- **Homepage Title:** "Booksociety Saarbrücken - Dein Buchclub im Saarland"
- **Open Graph & Twitter Cards:** Für Social Sharing mit Logo als og:image
- **Schema.org Markup:**
  - `Organization` (auf jeder Seite)
  - `Event` (auf Event-Detailseiten)
  - `BreadcrumbList` (Navigation)
  - `FAQPage` (Über uns Seite)
- **Sitemap:** Auto-generiert via next-sitemap
- **robots.txt:** Standard, erlaubt Crawling
- **Canonical URLs:** Automatisch gesetzt
- **Performance:** Next.js Image Optimization, Font Optimization, Code Splitting

### Content-SEO

- H1 pro Seite mit primärem Keyword
- Natürliche Keyword-Integration in Content
- Alt-Texte für alle Bilder
- Interne Verlinkung zwischen Seiten (Events ↔ Formate)
- Strukturierte Daten für Events (Google zeigt Events in Suchergebnissen)

## Payload CMS - Admin-Bereich

Deine Freundin bekommt unter `/admin` ein benutzerfreundliches Interface zum Verwalten von:

- **Events:** Neue Termine erstellen, bearbeiten, löschen
- **Formate:** Neue Formate hinzufügen, beschreiben
- **Media:** Bilder hochladen und verwalten

### Payload Collections

```
collections/
  events.ts       # Events & Termine
  formats.ts      # Formate (Lesekreis, Büchertausch, etc.)
  media.ts        # Bild-Uploads
  users.ts        # Admin-Benutzer
```

### Globals (Payload)

```
globals/
  site-settings.ts    # Seitentitel, Meta, Social Links
  current-book.ts     # Aktuelle Buchempfehlung (Titel, Autor, Cover, Beschreibung)
```

## Projektstruktur

```
booksociety-sb/
├── src/
│   ├── app/
│   │   ├── (frontend)/           # Öffentliche Seiten
│   │   │   ├── layout.tsx        # Main Layout (Nav, Footer, Floating Button)
│   │   │   ├── page.tsx          # Startseite / Landing Page
│   │   │   ├── events/
│   │   │   │   ├── page.tsx      # Event-Übersicht
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx  # Event-Detailseite
│   │   │   ├── formate/
│   │   │   │   ├── page.tsx      # Formate-Übersicht
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx  # Format-Detailseite
│   │   │   └── ueber-uns/
│   │   │       └── page.tsx      # Über uns
│   │   └── (payload)/            # Payload CMS Admin
│   │       └── admin/
│   ├── components/
│   │   ├── ui/                   # Design System Komponenten
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── countdown.tsx
│   │   │   └── accordion.tsx
│   │   ├── layout/
│   │   │   ├── navbar.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── floating-instagram.tsx
│   │   │   └── splash-screen.tsx
│   │   ├── sections/             # Landing Page Sections
│   │   │   ├── hero.tsx
│   │   │   ├── about-preview.tsx
│   │   │   ├── next-event.tsx
│   │   │   ├── current-book.tsx
│   │   │   ├── instagram-feed.tsx
│   │   │   └── cta.tsx
│   │   ├── events/
│   │   │   ├── event-card.tsx
│   │   │   ├── event-calendar.tsx
│   │   │   └── event-filter.tsx
│   │   └── decorative/
│   │       ├── watercolor-blob.tsx
│   │       ├── botanical-line.tsx
│   │       └── parallax-leaves.tsx
│   ├── lib/
│   │   ├── payload.ts            # Payload Client Config
│   │   └── utils.ts
│   ├── styles/
│   │   └── globals.css           # Tailwind + Custom CSS
│   └── payload/
│       ├── collections/
│       │   ├── events.ts
│       │   ├── formats.ts
│       │   ├── media.ts
│       │   └── users.ts
│       ├── globals/
│       │   ├── site-settings.ts
│       │   └── current-book.ts
│       └── payload.config.ts
├── public/
│   ├── logos/                    # Logo-Varianten (optimiert)
│   ├── fonts/                    # Falls self-hosted
│   └── og-image.png             # Open Graph Bild
├── tailwind.config.ts
├── next.config.ts
├── payload.config.ts
└── package.json
```

## Deployment & Infrastruktur

- **Vercel:** Next.js + Payload CMS deployen, Vercel-Domain nutzen (Custom Domain kommt später)
- **Supabase:** PostgreSQL-Datenbank (Free Tier, Projekt: bafyoezwwzjyasuichbg)
- **Bilder:** Payload Media via Supabase Storage (konsistent mit der DB)
- **Instagram Feed:** Via Behold.so (kostenloser Tier, 1 Feed) - die Instagram Basic Display API ist deprecated. Behold liefert ein einfaches Widget/JSON-Endpoint. Alternativ: statische Bilder mit Link zum Profil als Fallback.
- **.gitignore:** `.superpowers/`, `node_modules/`, `.env.local`, `.next/`

## Rechtliches

- Impressum-Seite (gesetzlich vorgeschrieben in DE)
- Datenschutzerklärung (DSGVO)
- Cookie-Banner falls Analytics eingebunden wird (zunächst nicht geplant)
