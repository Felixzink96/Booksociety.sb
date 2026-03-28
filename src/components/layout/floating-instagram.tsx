"use client";

import { useState } from "react";
import { InstagramIcon } from "@/components/ui/instagram-icon";

export function FloatingInstagram() {
  const [hovered, setHovered] = useState(false);
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://www.instagram.com/booksociety.sb";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Tooltip */}
      <div
        className={`bg-charcoal text-white text-sm px-3 py-1.5 rounded-xl whitespace-nowrap transition-all duration-200 ${
          hovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2 pointer-events-none"
        }`}
      >
        @booksociety.sb
      </div>

      {/* Button */}
      <a
        href={instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Booksociety Saarbrücken auf Instagram"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-white animate-pulse-soft shadow-lg"
        style={{
          background: "linear-gradient(135deg, #f97316, #ec4899, #a855f7)",
        }}
      >
        <InstagramIcon className="w-6 h-6" />
      </a>
    </div>
  );
}
