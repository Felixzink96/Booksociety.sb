"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WatercolorBlob } from "@/components/decorative/watercolor-blob";

export function Hero() {
  const handleScrollToEvent = () => {
    const el = document.getElementById("next-event");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden">
      {/* Decorative blobs */}
      <WatercolorBlob
        className="-top-20 -left-20"
        size={400}
        opacity={0.35}
        color="#F4C2C2"
      />
      <WatercolorBlob
        className="top-1/3 -right-24"
        size={300}
        opacity={0.25}
        color="#DBA7A7"
      />
      <WatercolorBlob
        className="-bottom-16 left-1/3"
        size={350}
        opacity={0.2}
        color="#F7E6D8"
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center px-6 text-center"
      >
        {/* Logo */}
        <Image
          src="/logos/logo-light.png"
          alt="Booksociety Saarbrücken Logo"
          width={280}
          height={280}
          priority
          className="mb-8"
        />

        {/* Headline */}
        <h1 className="mb-5 text-5xl font-display font-bold leading-tight text-wine md:text-6xl lg:text-7xl">
          Gemeinsam lesen.
          <br />
          Gemeinsam erleben.
        </h1>

        {/* Subtitle */}
        <p className="mb-10 max-w-xl text-lg text-charcoal/70 leading-relaxed">
          Der Buchclub für Saarbrücken — wir lesen, diskutieren und entdecken
          gemeinsam Geschichten, Orte und neue Freundschaften.
        </p>

        {/* CTA */}
        <Button
          variant="primary"
          onClick={handleScrollToEvent}
          className="gap-2"
        >
          Nächstes Event entdecken
          <ArrowDown className="h-4 w-4" />
        </Button>
      </motion.div>
    </section>
  );
}
