interface BadgeProps {
  children: React.ReactNode;
  variant?: "rose" | "wine" | "botanical" | "gold";
  className?: string;
}

const variantStyles = {
  rose: "bg-rose/30 text-wine",
  wine: "bg-wine text-white",
  botanical: "bg-botanical/10 text-botanical",
  gold: "bg-gold/10 text-gold",
};

export function Badge({ children, variant = "rose", className = "" }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
}
