"use client";

import { useEffect, useRef, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(targetDate: string): TimeLeft {
  const diff = new Date(targetDate).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function FlipCard({ value, label }: { value: number; label: string }) {
  const current = String(value).padStart(2, "0");
  const previousRef = useRef(current);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    if (previousRef.current !== current) {
      setFlip(true);
      const t = setTimeout(() => {
        previousRef.current = current;
        setFlip(false);
      }, 600);
      return () => clearTimeout(t);
    }
  }, [current]);

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="flip-card-outer">
        {/* Top half: always shows CURRENT number */}
        <div className="flip-card-top">
          <span>{current}</span>
        </div>

        {/* Bottom half: shows PREVIOUS number, then switches */}
        <div className="flip-card-bottom">
          <span>{flip ? previousRef.current : current}</span>
        </div>

        {/* FLIP: top half with OLD number flips down */}
        <div className={`flip-card-top-flip ${flip ? "flip-animate" : ""}`} key={current}>
          <span>{previousRef.current}</span>
        </div>

        {/* FLIP: bottom half with NEW number flips up into place */}
        <div className={`flip-card-bottom-flip ${flip ? "flip-animate" : ""}`} key={`b-${current}`}>
          <span>{current}</span>
        </div>

        {/* Divider line */}
        <div className="flip-card-divider" />
      </div>
      <span className="text-[10px] md:text-xs font-body font-semibold uppercase tracking-[2px] text-charcoal/40">
        {label}
      </span>
    </div>
  );
}

export function Countdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft(targetDate));

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return (
    <>
      <style>{`
        .flip-card-outer {
          position: relative;
          width: 4rem;
          height: 5rem;
          perspective: 300px;
        }
        @media (min-width: 768px) {
          .flip-card-outer {
            width: 5rem;
            height: 6rem;
          }
        }

        .flip-card-outer span {
          font-family: var(--font-playfair), Georgia, serif;
          font-weight: 700;
          font-size: 1.75rem;
          color: #8B4557;
          line-height: 1;
        }
        @media (min-width: 768px) {
          .flip-card-outer span { font-size: 2.25rem; }
        }

        /* Top half - static */
        .flip-card-top {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 50%;
          background: #f5f5f5;
          border-radius: 0.75rem 0.75rem 0 0;
          overflow: hidden;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          z-index: 1;
        }
        .flip-card-top span {
          transform: translateY(50%);
        }

        /* Bottom half - static */
        .flip-card-bottom {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 50%;
          background: #f0f0f0;
          border-radius: 0 0 0.75rem 0.75rem;
          overflow: hidden;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          z-index: 1;
        }
        .flip-card-bottom span {
          transform: translateY(-50%);
          opacity: 0.8;
        }

        /* Flip: top card falls down */
        .flip-card-top-flip {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 50%;
          background: #f5f5f5;
          border-radius: 0.75rem 0.75rem 0 0;
          overflow: hidden;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          transform-origin: bottom center;
          backface-visibility: hidden;
          z-index: 3;
          transform: rotateX(0deg);
        }
        .flip-card-top-flip span {
          transform: translateY(50%);
        }
        .flip-card-top-flip.flip-animate {
          animation: flipDown 0.3s ease-in forwards;
        }

        /* Flip: bottom card rises up */
        .flip-card-bottom-flip {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 50%;
          background: #f0f0f0;
          border-radius: 0 0 0.75rem 0.75rem;
          overflow: hidden;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          transform-origin: top center;
          backface-visibility: hidden;
          z-index: 2;
          transform: rotateX(90deg);
        }
        .flip-card-bottom-flip span {
          transform: translateY(-50%);
          opacity: 0.8;
        }
        .flip-card-bottom-flip.flip-animate {
          animation: flipUp 0.3s 0.3s ease-out forwards;
        }

        /* Divider - exactly centered */
        .flip-card-divider {
          position: absolute;
          left: 0; right: 0;
          top: calc(50% - 1px);
          height: 2px;
          background: rgba(219, 167, 167, 0.4);
          z-index: 5;
        }

        @keyframes flipDown {
          from { transform: rotateX(0deg); }
          to   { transform: rotateX(-90deg); }
        }
        @keyframes flipUp {
          from { transform: rotateX(90deg); }
          to   { transform: rotateX(0deg); }
        }
      `}</style>
      <div className="flex gap-3 md:gap-4 justify-center">
        <FlipCard value={timeLeft.days} label="Tage" />
        <FlipCard value={timeLeft.hours} label="Std" />
        <FlipCard value={timeLeft.minutes} label="Min" />
        <FlipCard value={timeLeft.seconds} label="Sek" />
      </div>
    </>
  );
}
