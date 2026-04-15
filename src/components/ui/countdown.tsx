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
      <div className="flip-card">
        {/* Top half */}
        <div className="flip-half flip-top">
          <span>{current}</span>
        </div>
        {/* Bottom half */}
        <div className="flip-half flip-bottom">
          <span>{flip ? previousRef.current : current}</span>
        </div>

        {/* Animated: top flips down with old value */}
        {flip && (
          <div className="flip-half flip-top flip-top-anim" key={current}>
            <span>{previousRef.current}</span>
          </div>
        )}
        {/* Animated: bottom flips up with new value */}
        {flip && (
          <div className="flip-half flip-bottom flip-bottom-anim" key={`b-${current}`}>
            <span>{current}</span>
          </div>
        )}

        {/* Divider line - sits ON TOP of everything */}
        <div className="flip-divider" />
      </div>
      <span className="text-[10px] md:text-xs font-body font-semibold uppercase tracking-[3px] text-charcoal/35">
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
        .flip-card {
          position: relative;
          width: 4.5rem;
          height: 5.5rem;
          perspective: 400px;
        }
        @media (min-width: 768px) {
          .flip-card { width: 5.5rem; height: 6.5rem; }
        }

        /* Shared half styles */
        .flip-half {
          position: absolute;
          left: 0; right: 0;
          height: 50%;
          overflow: hidden;
          display: flex;
          justify-content: center;
        }
        .flip-half span {
          font-family: var(--font-playfair), Georgia, serif;
          font-weight: 700;
          font-size: 2rem;
          color: #8B4557;
          line-height: 1;
          position: absolute;
        }
        @media (min-width: 768px) {
          .flip-half span { font-size: 2.5rem; }
        }

        /* Top half */
        .flip-top {
          top: 0;
          background: white;
          border-radius: 0.75rem 0.75rem 0 0;
          align-items: flex-end;
          z-index: 1;
          border-bottom: none;
        }
        .flip-top span {
          bottom: 0;
          transform: translateY(50%);
        }

        /* Bottom half - very slightly darker */
        .flip-bottom {
          bottom: 0;
          background: #fafafa;
          border-radius: 0 0 0.75rem 0.75rem;
          align-items: flex-start;
          z-index: 1;
          box-shadow: 0 2px 6px rgba(0,0,0,0.04);
        }
        .flip-bottom span {
          top: 0;
          transform: translateY(-50%);
          opacity: 0.85;
        }

        /* The divider line - highest z-index, always visible */
        .flip-divider {
          position: absolute;
          left: 0; right: 0;
          top: 50%;
          transform: translateY(-0.5px);
          height: 1px;
          background: rgba(0, 0, 0, 0.08);
          z-index: 10;
          pointer-events: none;
        }

        /* Flip animation: top falls down */
        .flip-top-anim {
          z-index: 3;
          transform-origin: bottom center;
          backface-visibility: hidden;
          animation: flipDown 0.3s ease-in forwards;
        }

        /* Flip animation: bottom rises up */
        .flip-bottom-anim {
          z-index: 2;
          transform-origin: top center;
          transform: rotateX(90deg);
          backface-visibility: hidden;
          animation: flipUp 0.3s 0.3s ease-out forwards;
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
