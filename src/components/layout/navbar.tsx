"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Instagram } from "lucide-react";

const navLinks = [
  { label: "Startseite", href: "/" },
  { label: "Events", href: "/events" },
  { label: "Formate", href: "/formate" },
  { label: "Über uns", href: "/ueber-uns" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://www.instagram.com/booksociety.sb";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-cream/95 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/logos/logo-light.png"
                alt="Booksociety Saarbrücken"
                width={140}
                height={40}
                className="h-10 w-auto"
                priority
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-charcoal/80 hover:text-wine transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-charcoal/80 hover:text-wine transition-colors duration-200"
              >
                <Instagram size={20} />
              </a>
            </nav>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 text-charcoal/80 hover:text-wine transition-colors duration-200"
              onClick={() => setMobileOpen(true)}
              aria-label="Menü öffnen"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile fullscreen overlay */}
      <div
        className={`fixed inset-0 z-50 bg-cream flex flex-col transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button */}
        <div className="flex items-center justify-between px-4 h-16">
          <Link href="/" onClick={() => setMobileOpen(false)}>
            <Image
              src="/logos/logo-light.png"
              alt="Booksociety Saarbrücken"
              width={140}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
          <button
            className="p-2 text-charcoal/80 hover:text-wine transition-colors duration-200"
            onClick={() => setMobileOpen(false)}
            aria-label="Menü schließen"
          >
            <X size={24} />
          </button>
        </div>

        {/* Mobile nav links */}
        <nav className="flex flex-col items-center justify-center flex-1 gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-2xl font-display font-medium text-charcoal hover:text-wine transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 text-charcoal/80 hover:text-wine transition-colors duration-200 mt-4"
          >
            <Instagram size={22} />
            <span className="text-base font-medium">Instagram</span>
          </a>
        </nav>
      </div>
    </>
  );
}
