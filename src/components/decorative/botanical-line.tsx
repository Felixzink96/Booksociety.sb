interface BotanicalLineProps {
  className?: string;
  variant?: "branch-left" | "branch-right" | "divider";
}

export function BotanicalLine({ className = "", variant = "branch-left" }: BotanicalLineProps) {
  if (variant === "divider") {
    return (
      <svg className={className} width="200" height="30" viewBox="0 0 200 30" fill="none">
        <path d="M0 15 Q50 5, 100 15 Q150 25, 200 15" stroke="#DBA7A7" strokeWidth="1" opacity="0.5" />
        <path d="M85 15 C85 8, 95 5, 100 10" stroke="#DBA7A7" strokeWidth="0.8" opacity="0.4" />
        <path d="M115 15 C115 8, 105 5, 100 10" stroke="#DBA7A7" strokeWidth="0.8" opacity="0.4" />
      </svg>
    );
  }

  if (variant === "branch-right") {
    return (
      <svg className={className} width="120" height="200" viewBox="0 0 120 200" fill="none">
        <path d="M0 200 C20 150, 40 120, 30 80 C25 60, 35 30, 50 10" stroke="#DBA7A7" strokeWidth="1.2" opacity="0.3" />
        <path d="M30 80 C45 75, 55 65, 60 50" stroke="#DBA7A7" strokeWidth="0.8" opacity="0.25" />
        <path d="M35 110 C50 100, 65 95, 75 85" stroke="#DBA7A7" strokeWidth="0.8" opacity="0.25" />
        <circle cx="50" cy="10" r="3" fill="#F4C2C2" opacity="0.2" />
        <circle cx="75" cy="85" r="2" fill="#F4C2C2" opacity="0.15" />
      </svg>
    );
  }

  return (
    <svg className={className} width="120" height="200" viewBox="0 0 120 200" fill="none">
      <path d="M120 200 C100 150, 80 120, 90 80 C95 60, 85 30, 70 10" stroke="#DBA7A7" strokeWidth="1.2" opacity="0.3" />
      <path d="M90 80 C75 75, 65 65, 60 50" stroke="#DBA7A7" strokeWidth="0.8" opacity="0.25" />
      <path d="M85 110 C70 100, 55 95, 45 85" stroke="#DBA7A7" strokeWidth="0.8" opacity="0.25" />
      <circle cx="70" cy="10" r="3" fill="#F4C2C2" opacity="0.2" />
      <circle cx="45" cy="85" r="2" fill="#F4C2C2" opacity="0.15" />
    </svg>
  );
}
