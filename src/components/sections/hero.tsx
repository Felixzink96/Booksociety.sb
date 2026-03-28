"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

/* ------------------------------------------------------------------ */
/*  Floating watercolor blobs (animated, drifting)                     */
/* ------------------------------------------------------------------ */
function AnimatedBlob({
  color,
  size,
  className,
  duration = 18,
  delay = 0,
}: {
  color: string;
  size: number;
  className?: string;
  duration?: number;
  delay?: number;
}) {
  return (
    <motion.div
      className={`absolute pointer-events-none rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: "blur(30px)",
      }}
      animate={{
        x: [0, 30, -20, 10, 0],
        y: [0, -25, 15, -10, 0],
        scale: [1, 1.08, 0.95, 1.04, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Floating background book silhouettes (very subtle)                 */
/* ------------------------------------------------------------------ */
function FloatingBook({
  className,
  size = 40,
  color = "#8B4557",
  duration = 22,
  delay = 0,
}: {
  className?: string;
  size?: number;
  color?: string;
  duration?: number;
  delay?: number;
}) {
  return (
    <motion.svg
      className={`absolute pointer-events-none ${className}`}
      width={size}
      height={size * 1.3}
      viewBox="0 0 40 52"
      fill="none"
      animate={{
        y: [0, -12, 6, -8, 0],
        x: [0, 5, -3, 4, 0],
        rotate: [0, 3, -2, 1, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      }}
    >
      <rect
        x="4"
        y="2"
        width="30"
        height="42"
        rx="1.5"
        stroke={color}
        strokeWidth="1"
        fill="none"
      />
      <rect x="2" y="4" width="3" height="38" rx="1" fill={color} opacity="0.3" />
      <path d={`M12 14 L28 14`} stroke={color} strokeWidth="0.75" opacity="0.4" />
      <path d={`M12 19 L24 19`} stroke={color} strokeWidth="0.75" opacity="0.4" />
    </motion.svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Floating rose petals                                               */
/* ------------------------------------------------------------------ */
function FloatingPetal({
  className,
  size = 20,
  color = "#F4C2C2",
  duration = 20,
  delay = 0,
}: {
  className?: string;
  size?: number;
  color?: string;
  duration?: number;
  delay?: number;
}) {
  return (
    <motion.svg
      className={`absolute pointer-events-none ${className}`}
      width={size}
      height={size * 1.4}
      viewBox="0 0 20 28"
      fill="none"
      animate={{
        y: [0, -8, 4, -6, 0],
        x: [0, 6, -4, 3, 0],
        rotate: [0, 15, -10, 5, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      }}
    >
      <path
        d="M10 2 C5 6, 1 14, 4 22 C6 26, 10 28, 10 28 C10 28, 14 26, 16 22 C19 14, 15 6, 10 2Z"
        fill={color}
        opacity="0.6"
      />
    </motion.svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Decorative botanical side lines                                    */
/* ------------------------------------------------------------------ */
function BotanicalLine({ side }: { side: "left" | "right" }) {
  const isLeft = side === "left";
  return (
    <motion.svg
      className={`absolute top-1/2 -translate-y-1/2 pointer-events-none hidden lg:block ${
        isLeft ? "left-6 xl:left-12" : "right-6 xl:right-12"
      }`}
      width="32"
      height="260"
      viewBox="0 0 32 260"
      fill="none"
      initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
      animate={{ opacity: 0.2, x: 0 }}
      transition={{ duration: 1.4, delay: 1.2, ease: "easeOut" }}
    >
      <path
        d={
          isLeft
            ? "M16 260 C16 260, 16 140, 16 20 M16 60 C8 50, 2 40, 4 30 M16 120 C8 110, 2 100, 4 90 M16 180 C8 170, 2 160, 4 150"
            : "M16 260 C16 260, 16 140, 16 20 M16 60 C24 50, 30 40, 28 30 M16 120 C24 110, 30 100, 28 90 M16 180 C24 170, 30 160, 28 150"
        }
        stroke="#4A6741"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
      />
      {/* Small leaf shapes */}
      <ellipse
        cx={isLeft ? 8 : 24}
        cy="45"
        rx="6"
        ry="10"
        transform={`rotate(${isLeft ? -30 : 30} ${isLeft ? 8 : 24} 45)`}
        stroke="#4A6741"
        strokeWidth="0.75"
        fill="none"
      />
      <ellipse
        cx={isLeft ? 8 : 24}
        cy="105"
        rx="5"
        ry="9"
        transform={`rotate(${isLeft ? -25 : 25} ${isLeft ? 8 : 24} 105)`}
        stroke="#4A6741"
        strokeWidth="0.75"
        fill="none"
      />
      <ellipse
        cx={isLeft ? 8 : 24}
        cy="165"
        rx="6"
        ry="10"
        transform={`rotate(${isLeft ? -35 : 35} ${isLeft ? 8 : 24} 165)`}
        stroke="#4A6741"
        strokeWidth="0.75"
        fill="none"
      />
    </motion.svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Staggered word animation                                           */
/* ------------------------------------------------------------------ */
const headlineVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/* ------------------------------------------------------------------ */
/*  Scroll indicator arrow                                             */
/* ------------------------------------------------------------------ */
function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 0.8 }}
    >
      <span className="text-xs font-body text-charcoal/40 tracking-widest uppercase">
        Entdecken
      </span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{
          duration: 1.6,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      >
        <ArrowDown className="h-5 w-5 text-wine/50" />
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  HERO                                                               */
/* ------------------------------------------------------------------ */
export function Hero() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.97]);

  const handleScrollToEvent = () => {
    const el = document.getElementById("next-event");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  /* Words for stagger animation */
  const line1Words = ["Gemeinsam", "lesen."];
  const line2Words = ["Gemeinsam", "erleben."];

  return (
    <motion.section
      style={{ opacity: heroOpacity, scale: heroScale }}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Paper / grain texture overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "180px 180px",
        }}
      />

      {/* Animated watercolor blobs */}
      <AnimatedBlob
        color="rgba(244,194,194,0.5)"
        size={480}
        className="-top-24 -left-24"
        duration={20}
        delay={0}
      />
      <AnimatedBlob
        color="rgba(219,167,167,0.35)"
        size={360}
        className="top-[20%] -right-20"
        duration={24}
        delay={2}
      />
      <AnimatedBlob
        color="rgba(247,230,216,0.4)"
        size={420}
        className="-bottom-16 left-[25%]"
        duration={22}
        delay={1}
      />
      <AnimatedBlob
        color="rgba(244,194,194,0.25)"
        size={280}
        className="top-[60%] right-[10%]"
        duration={26}
        delay={3}
      />
      <AnimatedBlob
        color="rgba(74,103,65,0.08)"
        size={200}
        className="top-[10%] left-[60%]"
        duration={18}
        delay={4}
      />

      {/* Floating background book silhouettes */}
      <FloatingBook
        className="top-[12%] left-[8%] opacity-[0.06]"
        size={48}
        color="#8B4557"
        duration={25}
        delay={0}
      />
      <FloatingBook
        className="top-[65%] right-[12%] opacity-[0.05]"
        size={36}
        color="#DBA7A7"
        duration={28}
        delay={3}
      />
      <FloatingBook
        className="bottom-[20%] left-[18%] opacity-[0.04]"
        size={30}
        color="#4A6741"
        duration={22}
        delay={5}
      />

      {/* Floating rose petals */}
      <FloatingPetal
        className="top-[25%] right-[20%] opacity-[0.08]"
        size={18}
        color="#F4C2C2"
        duration={20}
        delay={1}
      />
      <FloatingPetal
        className="top-[55%] left-[15%] opacity-[0.06]"
        size={14}
        color="#DBA7A7"
        duration={24}
        delay={4}
      />
      <FloatingPetal
        className="bottom-[30%] right-[8%] opacity-[0.07]"
        size={16}
        color="#F4C2C2"
        duration={18}
        delay={2}
      />

      {/* Botanical side decorations */}
      <BotanicalLine side="left" />
      <BotanicalLine side="right" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        {/* Logo with glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative mb-8"
        >
          {/* Glow behind logo */}
          <div
            className="absolute inset-0 -m-6 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(244,194,194,0.4) 0%, rgba(244,194,194,0.1) 50%, transparent 70%)",
              filter: "blur(16px)",
            }}
          />
          <Image
            src="/logos/logo-light.png"
            alt="Booksociety Saarbr\u00fccken Logo"
            width={280}
            height={280}
            priority
            className="relative drop-shadow-[0_4px_24px_rgba(139,69,87,0.15)]"
          />
        </motion.div>

        {/* Headline with per-word stagger */}
        <motion.h1
          className="mb-5 text-5xl font-display font-bold leading-tight text-wine md:text-6xl lg:text-7xl"
          variants={headlineVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Line 1 */}
          <span className="inline-flex flex-wrap justify-center gap-x-[0.3em]">
            {line1Words.map((word) => (
              <motion.span key={`l1-${word}`} variants={wordVariants} className="inline-block">
                {word === "lesen." ? (
                  <span className="relative">
                    <span className="bg-gradient-to-r from-rose to-dusty-rose bg-clip-text text-transparent">
                      {word}
                    </span>
                    <span className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-gradient-to-r from-rose to-dusty-rose" />
                  </span>
                ) : (
                  word
                )}
              </motion.span>
            ))}
          </span>
          <br />
          {/* Line 2 */}
          <span className="inline-flex flex-wrap justify-center gap-x-[0.3em]">
            {line2Words.map((word) => (
              <motion.span key={`l2-${word}`} variants={wordVariants} className="inline-block">
                {word === "erleben." ? (
                  <span className="relative">
                    <span className="bg-gradient-to-r from-dusty-rose to-wine bg-clip-text text-transparent">
                      {word}
                    </span>
                    <span className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-gradient-to-r from-dusty-rose to-wine" />
                  </span>
                ) : (
                  word
                )}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mb-10 max-w-xl text-lg text-charcoal/70 leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0, ease: "easeOut" }}
        >
          Der Buchclub f&uuml;r Saarbr&uuml;cken &mdash; wir lesen, diskutieren und entdecken
          gemeinsam Geschichten, Orte und neue Freundschaften.
        </motion.p>

        {/* CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3, ease: "easeOut" }}
        >
          <Button variant="primary" onClick={handleScrollToEvent} className="gap-2">
            N&auml;chstes Event entdecken
            <ArrowDown className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <ScrollIndicator />
    </motion.section>
  );
}
