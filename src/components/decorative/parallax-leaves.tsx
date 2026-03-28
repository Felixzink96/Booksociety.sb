"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function ParallaxLeaves() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, -150]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -80]);
  const y3 = useTransform(scrollY, [0, 1000], [0, -200]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <motion.svg
        style={{ y: y1 }}
        className="absolute -left-4 top-[20vh] opacity-20"
        width="80" height="120" viewBox="0 0 80 120" fill="none"
      >
        <path d="M40 120 C20 80, 5 50, 15 20 C20 5, 35 0, 40 10 C45 0, 60 5, 65 20 C75 50, 60 80, 40 120Z" fill="#4A6741" />
      </motion.svg>

      <motion.svg
        style={{ y: y2 }}
        className="absolute -right-2 top-[40vh] opacity-15"
        width="60" height="100" viewBox="0 0 60 100" fill="none"
      >
        <path d="M30 100 C10 70, 0 40, 10 15 C15 5, 25 0, 30 8 C35 0, 45 5, 50 15 C60 40, 50 70, 30 100Z" fill="#DBA7A7" />
      </motion.svg>

      <motion.svg
        style={{ y: y3 }}
        className="absolute left-[10vw] top-[60vh] opacity-10"
        width="40" height="60" viewBox="0 0 40 60" fill="none"
      >
        <ellipse cx="20" cy="25" rx="15" ry="22" fill="#F4C2C2" />
        <line x1="20" y1="25" x2="20" y2="60" stroke="#DBA7A7" strokeWidth="1" />
      </motion.svg>
    </div>
  );
}
