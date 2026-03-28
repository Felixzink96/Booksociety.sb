import {
  Book,
  BookOpen,
  Coffee,
  Users,
  Repeat,
  Sparkles,
  MessageCircle,
  Music,
  type LucideProps,
} from "lucide-react";
import type { ComponentType } from "react";

const iconMap: Record<string, ComponentType<LucideProps>> = {
  Book,
  BookOpen,
  Coffee,
  Users,
  Repeat,
  Sparkles,
  MessageCircle,
  Music,
};

interface FormatIconProps {
  icon: string;
  className?: string;
}

export function FormatIcon({ icon, className = "w-6 h-6" }: FormatIconProps) {
  const IconComponent = iconMap[icon] ?? Book;
  return <IconComponent className={className} />;
}
