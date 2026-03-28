"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

/* Animated watercolor blob */
function Blob({ color, size, className, duration = 18, delay = 0 }: {
  color: string; size: number; className?: string; duration?: number; delay?: number;
}) {
  return (
    <motion.div
      className={`absolute pointer-events-none rounded-full ${className}`}
      style={{ width: size, height: size, background: `radial-gradient(circle, ${color} 0%, transparent 70%)`, filter: "blur(30px)" }}
      animate={{ x: [0, 30, -20, 10, 0], y: [0, -25, 15, -10, 0], scale: [1, 1.08, 0.95, 1.04, 1] }}
      transition={{ duration, delay, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
    />
  );
}

/* Floating 3D book stack visualization */
function BookStackVisualization() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Glow behind the stack */}
      <div className="absolute w-80 h-80 rounded-full opacity-40" style={{
        background: "radial-gradient(circle, rgba(244,194,194,0.6) 0%, rgba(219,167,167,0.3) 40%, transparent 70%)",
        filter: "blur(40px)",
      }} />

      {/* Book stack */}
      <div className="relative" style={{ perspective: "800px" }}>
        {/* Back book */}
        <motion.div
          className="absolute -top-6 -left-4 w-44 h-60 rounded-lg shadow-xl"
          style={{ background: "linear-gradient(135deg, #DBA7A7 0%, #C4908F 100%)", transformStyle: "preserve-3d" }}
          initial={{ opacity: 0, rotateY: -15, rotateZ: -8 }}
          animate={{ opacity: 1, rotateY: -15, rotateZ: -8 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="absolute inset-2 border border-white/20 rounded-md" />
          <div className="absolute top-6 left-4 right-4 space-y-2">
            <div className="h-1.5 bg-white/25 rounded w-3/4" />
            <div className="h-1.5 bg-white/15 rounded w-1/2" />
          </div>
          {/* Spine */}
          <div className="absolute left-0 top-0 bottom-0 w-3 rounded-l-lg" style={{ background: "linear-gradient(180deg, #C4908F, #A87B7A)" }} />
        </motion.div>

        {/* Middle book */}
        <motion.div
          className="absolute -top-2 left-2 w-44 h-60 rounded-lg shadow-2xl"
          style={{ background: "linear-gradient(135deg, #8B4557 0%, #6D3545 100%)", transformStyle: "preserve-3d" }}
          initial={{ opacity: 0, rotateY: -8, rotateZ: -3 }}
          animate={{ opacity: 1, rotateY: -8, rotateZ: -3 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="absolute inset-2 border border-white/15 rounded-md" />
          <div className="absolute top-8 left-5 right-5 space-y-2">
            <div className="h-1.5 bg-white/20 rounded w-full" />
            <div className="h-1.5 bg-white/15 rounded w-2/3" />
            <div className="h-1.5 bg-white/10 rounded w-3/4" />
          </div>
          <div className="absolute left-0 top-0 bottom-0 w-3 rounded-l-lg" style={{ background: "linear-gradient(180deg, #6D3545, #5A2C39)" }} />
        </motion.div>

        {/* Front book - the star */}
        <motion.div
          className="relative w-44 h-60 rounded-lg shadow-2xl z-10"
          style={{ background: "linear-gradient(135deg, #F4C2C2 0%, #E8ACAC 100%)", transformStyle: "preserve-3d" }}
          initial={{ opacity: 0, y: 20, rotateY: -5 }}
          animate={{ opacity: 1, y: 0, rotateY: -5 }}
          transition={{ duration: 1, delay: 0.7 }}
          whileHover={{ rotateY: 0, scale: 1.02, transition: { duration: 0.3 } }}
        >
          <div className="absolute inset-3 border border-wine/20 rounded-md" />
          {/* Book title area */}
          <div className="absolute top-10 left-5 right-5">
            <div className="font-display text-wine text-base font-bold leading-tight">book</div>
            <div className="font-display text-wine text-base font-bold leading-tight">society</div>
            <div className="mt-3 h-px bg-wine/20 w-full" />
            <div className="mt-2 text-wine/40 text-[9px] uppercase tracking-[3px]">Saarbrücken</div>
          </div>
          {/* Botanical decoration on book */}
          <svg className="absolute bottom-4 right-4 w-16 h-20 opacity-20" viewBox="0 0 60 80" fill="none">
            <path d="M30 80 C15 55, 5 35, 10 15 C15 5, 25 0, 30 8 C35 0, 45 5, 50 15 C55 35, 45 55, 30 80Z" stroke="#8B4557" strokeWidth="1" />
            <path d="M30 60 C25 45, 20 30, 25 15" stroke="#8B4557" strokeWidth="0.5" />
            <path d="M30 60 C35 45, 40 30, 35 15" stroke="#8B4557" strokeWidth="0.5" />
          </svg>
          <div className="absolute left-0 top-0 bottom-0 w-4 rounded-l-lg" style={{ background: "linear-gradient(180deg, #E8ACAC, #DBA7A7)" }} />
        </motion.div>

        {/* Floating botanical elements around books */}
        <motion.svg
          className="absolute -top-12 -right-8 w-16 h-16 opacity-30"
          viewBox="0 0 60 60" fill="none"
          animate={{ rotate: [0, 5, -3, 0], y: [0, -4, 2, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M30 50 C20 35, 10 20, 20 8 C25 2, 35 2, 40 8 C50 20, 40 35, 30 50Z" stroke="#4A6741" strokeWidth="1" />
        </motion.svg>

        <motion.svg
          className="absolute -bottom-8 -left-10 w-12 h-12 opacity-25"
          viewBox="0 0 40 40" fill="none"
          animate={{ rotate: [0, -5, 3, 0], y: [0, 3, -2, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          <circle cx="20" cy="15" r="8" stroke="#F4C2C2" strokeWidth="1" />
          <circle cx="14" cy="22" r="6" stroke="#DBA7A7" strokeWidth="0.8" />
          <line x1="18" y1="28" x2="18" y2="40" stroke="#4A6741" strokeWidth="0.8" />
        </motion.svg>

        {/* Small floating heart */}
        <motion.svg
          className="absolute top-4 -right-14 w-6 h-6 opacity-40"
          viewBox="0 0 24 24" fill="#F4C2C2"
          animate={{ y: [0, -6, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </motion.svg>
      </div>
    </div>
  );
}

/* Word stagger animation */
const headlineVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};
const wordVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: "easeOut" } },
};

/* Scroll indicator */
function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 0.8 }}
    >
      <span className="text-xs text-charcoal/40 tracking-widest uppercase">Entdecken</span>
      <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
        <ArrowDown className="h-5 w-5 text-wine/50" />
      </motion.div>
    </motion.div>
  );
}

/* HERO */
export function Hero() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.97]);

  return (
    <motion.section
      style={{ opacity: heroOpacity, scale: heroScale }}
      className="relative min-h-screen overflow-hidden"
    >
      {/* Paper grain texture */}
      <div className="absolute inset-0 z-[1] pointer-events-none opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "180px 180px",
      }} />

      {/* Blobs */}
      <Blob color="rgba(244,194,194,0.45)" size={500} className="-top-32 -left-32" duration={20} />
      <Blob color="rgba(219,167,167,0.3)" size={350} className="top-[20%] right-[5%]" duration={24} delay={2} />
      <Blob color="rgba(247,230,216,0.35)" size={400} className="-bottom-20 left-[20%]" duration={22} delay={1} />

      {/* Split layout */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full py-24">

          {/* Left: Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <Image
                src="/logos/logo-transparent.webp"
                alt="Booksociety Saarbrücken"
                width={100}
                height={100}
                priority
                className="w-20 h-20 drop-shadow-lg"
              />
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-[1.1] text-charcoal mb-6"
              variants={headlineVariants}
              initial="hidden"
              animate="visible"
            >
              <span className="flex flex-wrap gap-x-[0.3em]">
                {["Gemeinsam"].map((w) => (
                  <motion.span key={`l1-${w}`} variants={wordVariants}>{w}</motion.span>
                ))}
                <motion.span variants={wordVariants} className="relative">
                  <span className="bg-gradient-to-r from-rose to-dusty-rose bg-clip-text text-transparent">lesen.</span>
                  <span className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-gradient-to-r from-rose to-dusty-rose" />
                </motion.span>
              </span>
              <span className="flex flex-wrap gap-x-[0.3em]">
                {["Gemeinsam"].map((w) => (
                  <motion.span key={`l2-${w}`} variants={wordVariants}>{w}</motion.span>
                ))}
                <motion.span variants={wordVariants} className="relative">
                  <span className="bg-gradient-to-r from-dusty-rose to-wine bg-clip-text text-transparent">erleben.</span>
                  <span className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-gradient-to-r from-dusty-rose to-wine" />
                </motion.span>
              </span>
            </motion.h1>

            <motion.p
              className="text-lg text-charcoal/60 leading-relaxed max-w-lg mb-8"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
            >
              Der Buchclub für Saarbrücken — wir lesen, diskutieren und entdecken
              gemeinsam Geschichten, Orte und neue Freundschaften.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <Button
                variant="primary"
                onClick={() => document.getElementById("next-event")?.scrollIntoView({ behavior: "smooth" })}
              >
                Nächstes Event entdecken
                <ArrowDown className="h-4 w-4" />
              </Button>
              <Button variant="outline" href="/ueber-uns">
                Mehr erfahren
              </Button>
            </motion.div>
          </div>

          {/* Right: Book visualization */}
          <motion.div
            className="hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <BookStackVisualization />
          </motion.div>
        </div>
      </div>

      <ScrollIndicator />
    </motion.section>
  );
}
