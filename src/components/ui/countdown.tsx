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

function FlipUnit({ value, label }: { value: number; label: string }) {
  const padded = String(value).padStart(2, "0");
  const prevRef = useRef(padded);
  const [flipping, setFlipping] = useState(false);
  const [displayValue, setDisplayValue] = useState(padded);
  const [nextValue, setNextValue] = useState(padded);

  useEffect(() => {
    if (padded !== prevRef.current) {
      setNextValue(padded);
      setFlipping(true);

      const timer = setTimeout(() => {
        setDisplayValue(padded);
        setFlipping(false);
        prevRef.current = padded;
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [padded]);

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative w-16 h-20 md:w-20 md:h-24" style={{ perspective: "200px" }}>
        {/* Top half - static, shows current value */}
        <div className="absolute inset-x-0 top-0 h-1/2 bg-white rounded-t-xl overflow-hidden z-10">
          <div className="absolute inset-0 flex items-end justify-center pb-[1px]">
            <span className="text-2xl md:text-3xl font-display font-bold text-wine leading-none">
              {displayValue}
            </span>
          </div>
        </div>

        {/* Bottom half - static, shows current value */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-white rounded-b-xl overflow-hidden shadow-sm">
          <div className="absolute inset-0 flex items-start justify-center pt-[1px]">
            <span className="text-2xl md:text-3xl font-display font-bold text-wine/80 leading-none">
              {displayValue}
            </span>
          </div>
        </div>

        {/* Flip card - top half flips down to reveal new number */}
        {flipping && (
          <>
            {/* Flipping top half (old value, flips down) */}
            <div
              className="absolute inset-x-0 top-0 h-1/2 bg-white rounded-t-xl overflow-hidden z-20"
              style={{
                animation: "flipTop 0.3s ease-in forwards",
                transformOrigin: "bottom center",
                backfaceVisibility: "hidden",
              }}
            >
              <div className="absolute inset-0 flex items-end justify-center pb-[1px]">
                <span className="text-2xl md:text-3xl font-display font-bold text-wine leading-none">
                  {prevRef.current}
                </span>
              </div>
            </div>

            {/* New bottom half revealed underneath (new value) */}
            <div
              className="absolute inset-x-0 bottom-0 h-1/2 bg-white rounded-b-xl overflow-hidden z-20"
              style={{
                animation: "flipBottom 0.3s 0.15s ease-out forwards",
                transformOrigin: "top center",
                transform: "rotateX(90deg)",
                backfaceVisibility: "hidden",
              }}
            >
              <div className="absolute inset-0 flex items-start justify-center pt-[1px]">
                <span className="text-2xl md:text-3xl font-display font-bold text-wine/80 leading-none">
                  {nextValue}
                </span>
              </div>
            </div>
          </>
        )}

        {/* Center divider line */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-px h-[2px] bg-rose/30 z-30 rounded-full" />

        {/* Subtle shadow at the fold */}
        <div className="absolute inset-x-1 top-1/2 h-1 bg-gradient-to-b from-black/5 to-transparent z-20 pointer-events-none" />
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
      <style jsx global>{`
        @keyframes flipTop {
          0% { transform: rotateX(0deg); }
          100% { transform: rotateX(-90deg); }
        }
        @keyframes flipBottom {
          0% { transform: rotateX(90deg); }
          100% { transform: rotateX(0deg); }
        }
      `}</style>
      <div className="flex gap-3 md:gap-4 justify-center">
        <FlipUnit value={timeLeft.days} label="Tage" />
        <FlipUnit value={timeLeft.hours} label="Std" />
        <FlipUnit value={timeLeft.minutes} label="Min" />
        <FlipUnit value={timeLeft.seconds} label="Sek" />
      </div>
    </>
  );
}
