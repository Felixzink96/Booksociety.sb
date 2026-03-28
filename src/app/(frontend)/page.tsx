import { Hero } from "@/components/sections/hero";
import { AboutPreview } from "@/components/sections/about-preview";
import { NextEvent } from "@/components/sections/next-event";
import { CurrentBook } from "@/components/sections/current-book";
import { InstagramFeed } from "@/components/sections/instagram-feed";
import { CTA } from "@/components/sections/cta";
import { ParallaxLeaves } from "@/components/decorative/parallax-leaves";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booksociety Saarbrücken – Dein Buchclub im Saarland",
  description: "Buchclub in Saarbrücken: Gemeinsam lesen, Lesekreis, Büchertausch und mehr. Finde deinen Lesekreis in Saarbrücken und werde Teil unserer Community.",
};

export default async function HomePage() {
  let nextEvent = null;
  let currentBook = null;

  try {
    const { getNextEvent, getCurrentBook } = await import("@/lib/payload");
    nextEvent = await getNextEvent();
    currentBook = await getCurrentBook();
  } catch {
    // CMS not yet connected - use null fallbacks
  }

  return (
    <>
      <ParallaxLeaves />
      <Hero />
      <AboutPreview />
      <NextEvent event={nextEvent as any} />
      <CurrentBook book={currentBook as any} />
      <InstagramFeed />
      <CTA />
    </>
  );
}
