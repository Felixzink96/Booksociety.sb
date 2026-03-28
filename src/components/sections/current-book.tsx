"use client";

import { useRef } from "react";
import Image from "next/image";
import { BookOpen } from "lucide-react";
import { SectionReveal } from "@/components/ui/section-reveal";

interface BookProps {
  title: string;
  author: string;
  description?: string;
  cover_image?: string;
}

interface CurrentBookProps {
  book?: BookProps | null;
}

export function CurrentBook({ book }: CurrentBookProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  if (!book) return null;

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateY = (x / (rect.width / 2)) * 10;
    const rotateX = -(y / (rect.height / 2)) * 10;
    card.style.transform = `perspective(800px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
  }

  function handleMouseLeave() {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg)";
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <SectionReveal>
          <div className="flex flex-col md:flex-row gap-10 items-center">
            {/* Book cover with 3D tilt */}
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="flex-shrink-0 w-48 h-72 rounded-xl overflow-hidden shadow-2xl cursor-pointer transition-transform duration-200"
              style={{ transformStyle: "preserve-3d" }}
            >
              {book.cover_image ? (
                <Image
                  src={book.cover_image}
                  alt={`Cover: ${book.title}`}
                  width={192}
                  height={288}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-wine/30 to-dusty-rose/50 flex items-center justify-center">
                  <BookOpen className="w-16 h-16 text-wine/60" />
                </div>
              )}
            </div>

            {/* Book info */}
            <div className="flex flex-col gap-4">
              <span className="text-xs font-body font-semibold uppercase tracking-widest text-wine/70">
                Aktuelle Empfehlung
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-charcoal leading-tight">
                {book.title}
              </h2>
              <p className="font-body text-lg text-charcoal/70">{book.author}</p>
              {book.description && (
                <p className="font-body text-charcoal/60 leading-relaxed max-w-prose">
                  {book.description}
                </p>
              )}
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
