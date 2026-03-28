"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, MessageCircle } from "lucide-react";
import { InstagramIcon } from "@/components/ui/instagram-icon";

const navLinks = [
  { label: "Events", href: "/events" },
  { label: "Formate", href: "/formate" },
  { label: "Über uns", href: "/ueber-uns" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://www.instagram.com/booksociety.sb";

  return (
    <>
      {/* Floating Navbar */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-6xl">
        <nav
          className={`flex items-center justify-between px-4 sm:px-6 h-14 rounded-2xl border transition-all duration-500 ${
            scrolled
              ? "bg-white/80 backdrop-blur-xl border-rose/20 shadow-lg shadow-rose/5"
              : "bg-white/60 backdrop-blur-md border-white/30 shadow-md shadow-black/5"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logos/logo-transparent.webp"
              alt="Booksociety Saarbrücken"
              width={36}
              height={36}
              className="h-9 w-9 rounded-full object-cover"
              priority
            />
            <span className="font-display text-lg text-charcoal hidden sm:block">booksociety</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-charcoal/70 hover:text-wine transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-charcoal/60 hover:text-wine transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-5 h-5" />
            </a>
            <a
              href="https://ig.me/m/booksociety.sb"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-wine text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-wine/90 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Kontakt
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-charcoal/80 hover:text-wine transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="Menü öffnen"
          >
            <Menu size={22} />
          </button>
        </nav>
      </header>

      {/* Mobile fullscreen overlay */}
      <div
        className={`fixed inset-0 z-50 bg-cream flex flex-col transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 h-16">
          <Link href="/" onClick={() => setMobileOpen(false)}>
            <Image
              src="/logos/logo-transparent.webp"
              alt="Booksociety Saarbrücken"
              width={120}
              height={120}
              className="h-10 w-auto"
            />
          </Link>
          <button
            className="p-2 text-charcoal/80 hover:text-wine transition-colors"
            onClick={() => setMobileOpen(false)}
            aria-label="Menü schließen"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex flex-col items-center justify-center flex-1 gap-8">
          <Link href="/" onClick={() => setMobileOpen(false)} className="text-2xl font-display text-charcoal hover:text-wine transition-colors">
            Startseite
          </Link>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-2xl font-display text-charcoal hover:text-wine transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://ig.me/m/booksociety.sb"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 bg-wine text-white font-semibold px-6 py-3 rounded-xl"
          >
            <MessageCircle className="w-4 h-4" />
            Kontakt via Instagram
          </a>
        </nav>
      </div>
    </>
  );
}
