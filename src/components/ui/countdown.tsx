"use client";

import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface FlipUnitProps {
  value: number;
  label: string;
}

function FlipUnit({ value, label }: FlipUnitProps) {
  const padded = String(value).padStart(2, "0");

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative flex h-20 w-16 flex-col items-center justify-center rounded-xl bg-white shadow-sm md:h-24 md:w-20">
        <span className="text-2xl font-display font-bold text-wine md:text-3xl">
          {padded}
        </span>
        {/* Horizontal divider */}
        <div className="absolute inset-x-0 top-1/2 h-px bg-rose/40" />
      </div>
      <span className="text-xs font-body font-medium uppercase tracking-wider text-charcoal/50">
        {label}
      </span>
    </div>
  );
}

function getTimeLeft(targetDate: string): TimeLeft {
  const diff = new Date(targetDate).getTime() - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

interface CountdownProps {
  targetDate: string;
}

export function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    getTimeLeft(targetDate)
  );

  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const units: { key: keyof TimeLeft; label: string }[] = [
    { key: "days", label: "Tage" },
    { key: "hours", label: "Stunden" },
    { key: "minutes", label: "Minuten" },
    { key: "seconds", label: "Sekunden" },
  ];

  return (
    <div className="flex gap-3">
      {units.map(({ key, label }) => (
        <FlipUnit key={key} value={timeLeft[key]} label={label} />
      ))}
    </div>
  );
}
