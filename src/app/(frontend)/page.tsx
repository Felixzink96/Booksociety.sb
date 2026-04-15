import { Hero } from "@/components/sections/hero";
import { AboutPreview } from "@/components/sections/about-preview";
import { NextEvent } from "@/components/sections/next-event";
import { CurrentBook } from "@/components/sections/current-book";
import { InstagramFeed } from "@/components/sections/instagram-feed";
import { CTA } from "@/components/sections/cta";
import { ParallaxLeaves } from "@/components/decorative/parallax-leaves";
import { FIRST_EVENT, CURRENT_BOOK } from "@/lib/static-events";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booksociety Saarbrücken – Dein Buchclub im Saarland",
  description: "Buchclub in Saarbrücken: Gemeinsam lesen, Lesekreis, Büchertausch und mehr. Finde deinen Lesekreis in Saarbrücken und werde Teil unserer Community.",
};

export default async function HomePage() {
  // Try CMS first, fall back to static data
  let nextEvent: any = FIRST_EVENT;
  let currentBook: any = CURRENT_BOOK;

  try {
    const { getNextEvent, getCurrentBook } = await import("@/lib/payload");
    const cmsEvent = await getNextEvent();
    const cmsBook = await getCurrentBook();
    if (cmsEvent) nextEvent = cmsEvent;
    if (cmsBook?.title) currentBook = cmsBook;
  } catch {
    // CMS not connected - static data is already set
  }

  return (
    <>
      <ParallaxLeaves />
      <Hero />
      <AboutPreview />
      <NextEvent event={nextEvent} />
      <CurrentBook book={currentBook} />
      <InstagramFeed />
      <CTA />
    </>
  );
}
