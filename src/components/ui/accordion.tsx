"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between p-5 text-left font-display text-lg text-charcoal hover:text-wine transition-colors"
          >
            {item.question}
            <ChevronDown
              className={`w-5 h-5 text-dusty-rose transition-transform duration-300 ${
                openIndex === i ? "rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === i ? "max-h-96 pb-5 px-5" : "max-h-0"
            }`}
          >
            <p className="text-charcoal/70 leading-relaxed">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
