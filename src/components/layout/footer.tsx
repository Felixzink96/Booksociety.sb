import Link from "next/link";
import Image from "next/image";
import { Instagram } from "lucide-react";

const navLinks = [
  { label: "Startseite", href: "/" },
  { label: "Events", href: "/events" },
  { label: "Formate", href: "/formate" },
  { label: "Über uns", href: "/ueber-uns" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://www.instagram.com/booksociety.sb";

  return (
    <footer className="bg-charcoal text-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Column 1: Logo + Description */}
          <div className="flex flex-col gap-4">
            <Link href="/">
              <Image
                src="/logos/logo-dark-white.png"
                alt="Booksociety Saarbrücken"
                width={140}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-sm leading-relaxed text-white/60 max-w-xs">
              Ein Buchclub für alle, die Bücher lieben, Gespräche schätzen und neue Menschen kennenlernen möchten. Herzlich willkommen in Saarbrücken.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="flex flex-col gap-3">
            <h3 className="text-white font-display text-sm uppercase tracking-widest mb-1">
              Navigation
            </h3>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/60 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Column 3: Social */}
          <div className="flex flex-col gap-3">
            <h3 className="text-white font-display text-sm uppercase tracking-widest mb-1">
              Folge uns
            </h3>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors duration-200"
            >
              <Instagram size={18} />
              <span>@booksociety.sb</span>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>&copy; {currentYear} Booksociety Saarbrücken. Alle Rechte vorbehalten.</p>
          <div className="flex items-center gap-4">
            <Link href="/impressum" className="hover:text-white/70 transition-colors duration-200">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-white/70 transition-colors duration-200">
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
