"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function ParallaxLeaves() {
  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 1000], [0, -150]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -80]);
  const y3 = useTransform(scrollY, [0, 1000], [0, -200]);
  const y4 = useTransform(scrollY, [0, 1000], [0, -120]);
  const y5 = useTransform(scrollY, [0, 1000], [0, -60]);
  const y6 = useTransform(scrollY, [0, 1000], [0, -180]);
  const y7 = useTransform(scrollY, [0, 1000], [0, -100]);
  const y8 = useTransform(scrollY, [0, 1000], [0, -140]);

  const rotate1 = useTransform(scrollY, [0, 1000], [0, 15]);
  const rotate2 = useTransform(scrollY, [0, 1000], [0, -12]);
  const rotate3 = useTransform(scrollY, [0, 1000], [0, 20]);
  const rotate4 = useTransform(scrollY, [0, 1000], [0, -8]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Book - top left, upright */}
      <motion.svg
        style={{ y: y1, rotate: rotate1 }}
        className="absolute -left-2 top-[15vh] opacity-[0.14]"
        width="56"
        height="70"
        viewBox="0 0 56 70"
        fill="none"
      >
        <rect
          x="4"
          y="2"
          width="40"
          height="56"
          rx="2"
          stroke="#8B4557"
          strokeWidth="1.5"
          fill="none"
        />
        <path d="M4 8 L44 8" stroke="#8B4557" strokeWidth="1" />
        <rect
          x="2"
          y="4"
          width="4"
          height="52"
          rx="1"
          fill="#8B4557"
          opacity="0.3"
        />
        <path d="M14 20 L34 20" stroke="#DBA7A7" strokeWidth="1" />
        <path d="M14 26 L30 26" stroke="#DBA7A7" strokeWidth="1" />
        <path d="M14 32 L32 32" stroke="#DBA7A7" strokeWidth="1" />
      </motion.svg>

      {/* Heart - upper right */}
      <motion.svg
        style={{ y: y2 }}
        className="absolute right-6 top-[22vh] opacity-[0.12]"
        width="40"
        height="38"
        viewBox="0 0 40 38"
        fill="none"
      >
        <path
          d="M20 36 C14 30, 2 22, 2 13 C2 7, 7 2, 13 2 C16.5 2, 18.5 4, 20 6 C21.5 4, 23.5 2, 27 2 C33 2, 38 7, 38 13 C38 22, 26 30, 20 36Z"
          fill="#F4C2C2"
        />
      </motion.svg>

      {/* Book - tilted, right side */}
      <motion.svg
        style={{ y: y3, rotate: rotate2 }}
        className="absolute -right-3 top-[45vh] opacity-[0.11]"
        width="64"
        height="80"
        viewBox="0 0 64 80"
        fill="none"
      >
        <rect
          x="6"
          y="4"
          width="44"
          height="62"
          rx="2"
          stroke="#4A6741"
          strokeWidth="1.5"
          fill="none"
        />
        <rect
          x="4"
          y="6"
          width="4"
          height="58"
          rx="1"
          fill="#4A6741"
          opacity="0.25"
        />
        <path d="M6 12 L50 12" stroke="#4A6741" strokeWidth="1" opacity="0.5" />
        <circle cx="28" cy="35" r="8" stroke="#4A6741" strokeWidth="1" fill="none" opacity="0.4" />
      </motion.svg>

      {/* Small heart - left middle */}
      <motion.svg
        style={{ y: y4 }}
        className="absolute left-[8vw] top-[52vh] opacity-[0.10]"
        width="28"
        height="26"
        viewBox="0 0 40 38"
        fill="none"
      >
        <path
          d="M20 36 C14 30, 2 22, 2 13 C2 7, 7 2, 13 2 C16.5 2, 18.5 4, 20 6 C21.5 4, 23.5 2, 27 2 C33 2, 38 7, 38 13 C38 22, 26 30, 20 36Z"
          fill="#DBA7A7"
        />
      </motion.svg>

      {/* Botanical stem with leaves */}
      <motion.svg
        style={{ y: y5, rotate: rotate3 }}
        className="absolute left-[5vw] top-[35vh] opacity-[0.12]"
        width="36"
        height="72"
        viewBox="0 0 36 72"
        fill="none"
      >
        <path
          d="M18 72 C18 72, 18 10, 18 4"
          stroke="#4A6741"
          strokeWidth="1"
          fill="none"
        />
        <ellipse
          cx="10"
          cy="22"
          rx="8"
          ry="14"
          transform="rotate(-30 10 22)"
          stroke="#4A6741"
          strokeWidth="1"
          fill="none"
          opacity="0.6"
        />
        <ellipse
          cx="26"
          cy="38"
          rx="7"
          ry="12"
          transform="rotate(25 26 38)"
          stroke="#4A6741"
          strokeWidth="1"
          fill="none"
          opacity="0.5"
        />
      </motion.svg>

      {/* Open book - bottom center-right */}
      <motion.svg
        style={{ y: y6, rotate: rotate4 }}
        className="absolute right-[15vw] top-[68vh] opacity-[0.09]"
        width="60"
        height="44"
        viewBox="0 0 60 44"
        fill="none"
      >
        <path
          d="M30 6 C24 4, 6 2, 2 4 L2 40 C6 38, 24 38, 30 40 C36 38, 54 38, 58 40 L58 4 C54 2, 36 4, 30 6Z"
          stroke="#8B4557"
          strokeWidth="1.5"
          fill="none"
        />
        <path d="M30 6 L30 40" stroke="#8B4557" strokeWidth="1" />
        <path d="M10 14 L24 14" stroke="#DBA7A7" strokeWidth="0.75" opacity="0.5" />
        <path d="M10 18 L22 18" stroke="#DBA7A7" strokeWidth="0.75" opacity="0.5" />
        <path d="M36 14 L50 14" stroke="#DBA7A7" strokeWidth="0.75" opacity="0.5" />
        <path d="M36 18 L48 18" stroke="#DBA7A7" strokeWidth="0.75" opacity="0.5" />
      </motion.svg>

      {/* Tiny heart - far right lower */}
      <motion.svg
        style={{ y: y7 }}
        className="absolute right-[5vw] top-[75vh] opacity-[0.08]"
        width="20"
        height="19"
        viewBox="0 0 40 38"
        fill="none"
      >
        <path
          d="M20 36 C14 30, 2 22, 2 13 C2 7, 7 2, 13 2 C16.5 2, 18.5 4, 20 6 C21.5 4, 23.5 2, 27 2 C33 2, 38 7, 38 13 C38 22, 26 30, 20 36Z"
          fill="#F4C2C2"
        />
      </motion.svg>

      {/* Small book - bottom left */}
      <motion.svg
        style={{ y: y8 }}
        className="absolute left-[12vw] top-[80vh] opacity-[0.10]"
        width="32"
        height="42"
        viewBox="0 0 56 70"
        fill="none"
      >
        <rect
          x="4"
          y="2"
          width="40"
          height="56"
          rx="2"
          stroke="#DBA7A7"
          strokeWidth="1.5"
          fill="none"
        />
        <rect
          x="2"
          y="4"
          width="4"
          height="52"
          rx="1"
          fill="#DBA7A7"
          opacity="0.25"
        />
        <path d="M14 16 L34 16" stroke="#F4C2C2" strokeWidth="1" />
        <path d="M14 22 L28 22" stroke="#F4C2C2" strokeWidth="1" />
      </motion.svg>
    </div>
  );
}
