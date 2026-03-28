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

/* Floating 3D book stack visualization - large and animated */
function BookStackVisualization() {
  return (
    <div className="relative w-full h-[500px] flex items-center justify-center">
      {/* Large glow behind */}
      <div className="absolute w-[420px] h-[420px] rounded-full" style={{
        background: "radial-gradient(circle, rgba(244,194,194,0.5) 0%, rgba(219,167,167,0.2) 50%, transparent 75%)",
        filter: "blur(50px)",
      }} />

      <div className="relative" style={{ perspective: "1000px" }}>
        {/* Back book - gentle float */}
        <motion.div
          className="absolute -top-8 -left-8 w-56 h-76 rounded-xl shadow-xl"
          style={{ width: 224, height: 310, background: "linear-gradient(135deg, #DBA7A7 0%, #C4908F 100%)", transformStyle: "preserve-3d" }}
          initial={{ opacity: 0, rotateY: -15, rotateZ: -8 }}
          animate={{ opacity: 1, rotateY: [-15, -12, -15], rotateZ: [-8, -6, -8], y: [0, -8, 0] }}
          transition={{ opacity: { duration: 0.8, delay: 0.3 }, rotateY: { duration: 6, repeat: Infinity, ease: "easeInOut" }, rotateZ: { duration: 6, repeat: Infinity, ease: "easeInOut" }, y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
        >
          <div className="absolute inset-3 border border-white/20 rounded-lg" />
          <div className="absolute top-8 left-5 right-5 space-y-2.5">
            <div className="h-2 bg-white/25 rounded w-3/4" />
            <div className="h-2 bg-white/15 rounded w-1/2" />
          </div>
          <div className="absolute left-0 top-0 bottom-0 w-4 rounded-l-xl" style={{ background: "linear-gradient(180deg, #C4908F, #A87B7A)" }} />
        </motion.div>

        {/* Middle book - different float rhythm */}
        <motion.div
          className="absolute -top-2 left-3"
          style={{ width: 224, height: 310, background: "linear-gradient(135deg, #8B4557 0%, #6D3545 100%)", transformStyle: "preserve-3d", borderRadius: 12 }}
          initial={{ opacity: 0, rotateY: -8, rotateZ: -3 }}
          animate={{ opacity: 1, rotateY: [-8, -5, -8], rotateZ: [-3, -1, -3], y: [0, -12, 0] }}
          transition={{ opacity: { duration: 0.8, delay: 0.5 }, rotateY: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }, rotateZ: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }, y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.3 } }}
        >
          <div className="absolute inset-3 border border-white/15 rounded-lg" />
          <div className="absolute top-10 left-6 right-6 space-y-2.5">
            <div className="h-2 bg-white/20 rounded w-full" />
            <div className="h-2 bg-white/15 rounded w-2/3" />
            <div className="h-2 bg-white/10 rounded w-3/4" />
          </div>
          <div className="absolute left-0 top-0 bottom-0 w-4 rounded-l-xl" style={{ background: "linear-gradient(180deg, #6D3545, #5A2C39)" }} />
        </motion.div>

        {/* Front book - the star, biggest, most animated */}
        <motion.div
          className="relative z-10 shadow-2xl"
          style={{ width: 224, height: 310, background: "linear-gradient(135deg, #F4C2C2 0%, #E8ACAC 100%)", transformStyle: "preserve-3d", borderRadius: 12 }}
          initial={{ opacity: 0, y: 30, rotateY: -5 }}
          animate={{ opacity: 1, y: [0, -6, 0], rotateY: [-5, -2, -5] }}
          transition={{ opacity: { duration: 0.8, delay: 0.7 }, y: { duration: 4, repeat: Infinity, ease: "easeInOut" }, rotateY: { duration: 8, repeat: Infinity, ease: "easeInOut" } }}
          whileHover={{ rotateY: 5, scale: 1.04, transition: { duration: 0.4 } }}
        >
          <div className="absolute inset-4 border border-wine/20 rounded-lg" />
          <div className="absolute top-12 left-6 right-6">
            <div className="font-display text-wine text-xl font-bold leading-tight">book</div>
            <div className="font-display text-wine text-xl font-bold leading-tight">society</div>
            <div className="mt-4 h-px bg-wine/20 w-full" />
            <div className="mt-3 text-wine/40 text-[10px] uppercase tracking-[4px]">Saarbrücken</div>
          </div>
          <svg className="absolute bottom-5 right-5 w-20 h-24 opacity-15" viewBox="0 0 60 80" fill="none">
            <path d="M30 80 C15 55, 5 35, 10 15 C15 5, 25 0, 30 8 C35 0, 45 5, 50 15 C55 35, 45 55, 30 80Z" stroke="#8B4557" strokeWidth="1" />
            <path d="M30 60 C25 45, 20 30, 25 15" stroke="#8B4557" strokeWidth="0.5" />
            <path d="M30 60 C35 45, 40 30, 35 15" stroke="#8B4557" strokeWidth="0.5" />
          </svg>
          <div className="absolute left-0 top-0 bottom-0 w-5 rounded-l-xl" style={{ background: "linear-gradient(180deg, #E8ACAC, #DBA7A7)" }} />
        </motion.div>

        {/* Floating leaf top-right */}
        <motion.svg
          className="absolute -top-16 -right-12 w-20 h-20 opacity-30"
          viewBox="0 0 60 60" fill="none"
          animate={{ rotate: [0, 8, -5, 0], y: [0, -8, 4, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M30 55 C18 38, 8 22, 18 8 C23 2, 37 2, 42 8 C52 22, 42 38, 30 55Z" stroke="#4A6741" strokeWidth="1.2" />
          <path d="M30 50 L30 10" stroke="#4A6741" strokeWidth="0.6" opacity="0.5" />
        </motion.svg>

        {/* Floating flowers bottom-left */}
        <motion.svg
          className="absolute -bottom-14 -left-16 w-16 h-16 opacity-25"
          viewBox="0 0 50 50" fill="none"
          animate={{ rotate: [0, -8, 5, 0], y: [0, 5, -3, 0], x: [0, -3, 2, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          <circle cx="25" cy="18" r="10" stroke="#F4C2C2" strokeWidth="1.2" />
          <circle cx="17" cy="28" r="7" stroke="#DBA7A7" strokeWidth="1" />
          <circle cx="33" cy="28" r="7" stroke="#DBA7A7" strokeWidth="1" />
          <line x1="25" y1="32" x2="25" y2="50" stroke="#4A6741" strokeWidth="1" />
        </motion.svg>

        {/* Heart floating top */}
        <motion.svg
          className="absolute top-2 -right-20 w-10 h-10 opacity-35"
          viewBox="0 0 24 24" fill="#F4C2C2"
          animate={{ y: [0, -10, 0], scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </motion.svg>

        {/* Second heart, smaller, bottom-right */}
        <motion.svg
          className="absolute -bottom-6 right-2 w-6 h-6 opacity-25"
          viewBox="0 0 24 24" fill="#DBA7A7"
          animate={{ y: [0, -6, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </motion.svg>

        {/* Sparkle dots */}
        <motion.div
          className="absolute -top-10 left-6 w-2 h-2 rounded-full bg-gold/30"
          animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.div
          className="absolute top-20 -right-16 w-1.5 h-1.5 rounded-full bg-rose/40"
          animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
        <motion.div
          className="absolute -bottom-4 left-16 w-2 h-2 rounded-full bg-botanical/20"
          animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
        />
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
