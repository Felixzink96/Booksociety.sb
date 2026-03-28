"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

export function SplashScreen() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = sessionStorage.getItem("splash-seen");
    if (!seen) {
      setVisible(true);
      const timer = setTimeout(() => dismiss(), 2800);
      return () => clearTimeout(timer);
    }
  }, []);

  function dismiss() {
    sessionStorage.setItem("splash-seen", "1");
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FAF7F2] cursor-pointer select-none"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          onClick={dismiss}
        >
          {/* Book SVG */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.svg
              width="96"
              height="96"
              viewBox="0 0 96 96"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              animate={{ rotateY: [0, 15, -15, 0] }}
              transition={{
                rotateY: {
                  delay: 0.6,
                  duration: 0.8,
                  ease: "easeInOut",
                },
              }}
              style={{ transformOrigin: "center" }}
            >
              {/* Book cover left */}
              <rect
                x="8"
                y="16"
                width="38"
                height="64"
                rx="3"
                stroke="#3D2B1F"
                strokeWidth="2.5"
                fill="#F0E8D8"
              />
              {/* Book cover right */}
              <rect
                x="50"
                y="16"
                width="38"
                height="64"
                rx="3"
                stroke="#3D2B1F"
                strokeWidth="2.5"
                fill="#F0E8D8"
              />
              {/* Spine */}
              <line
                x1="46"
                y1="16"
                x2="46"
                y2="80"
                stroke="#3D2B1F"
                strokeWidth="2"
              />
              {/* Pages left */}
              <line
                x1="14"
                y1="28"
                x2="40"
                y2="28"
                stroke="#3D2B1F"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="14"
                y1="36"
                x2="40"
                y2="36"
                stroke="#3D2B1F"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="14"
                y1="44"
                x2="40"
                y2="44"
                stroke="#3D2B1F"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="14"
                y1="52"
                x2="34"
                y2="52"
                stroke="#3D2B1F"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              {/* Pages right */}
              <line
                x1="56"
                y1="28"
                x2="82"
                y2="28"
                stroke="#3D2B1F"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="56"
                y1="36"
                x2="82"
                y2="36"
                stroke="#3D2B1F"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="56"
                y1="44"
                x2="82"
                y2="44"
                stroke="#3D2B1F"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="56"
                y1="52"
                x2="76"
                y2="52"
                stroke="#3D2B1F"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </motion.svg>
          </motion.div>

          {/* Watercolor splash */}
          <motion.div
            className="absolute inset-0 pointer-events-none flex items-center justify-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.18 }}
            transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
          >
            <svg
              width="520"
              height="520"
              viewBox="0 0 520 520"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <ellipse
                cx="260"
                cy="260"
                rx="230"
                ry="200"
                fill="#C8A96E"
                opacity="0.6"
              />
              <ellipse
                cx="240"
                cy="270"
                rx="180"
                ry="160"
                fill="#B8936A"
                opacity="0.5"
              />
              <ellipse
                cx="275"
                cy="248"
                rx="140"
                ry="130"
                fill="#D4B896"
                opacity="0.4"
              />
            </svg>
          </motion.div>

          {/* Logo */}
          <motion.div
            className="mt-8 relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <Image
              src="/logos/logo-light.png"
              alt="Booksociety Saarbrücken"
              width={192}
              height={192}
              priority
            />
          </motion.div>

          {/* Skip hint */}
          <motion.p
            className="absolute bottom-10 text-sm text-[#3D2B1F]/50 tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.5 }}
          >
            Klick zum Überspringen
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
