import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFormats } from "@/lib/payload";
import { SectionReveal } from "@/components/ui/section-reveal";
import { FormatIcon } from "@/components/events/format-icon";

export const metadata: Metadata = {
  title: "Formate – Booksociety Saarbruecken",
  description:
    "Unsere Formate: Lesekreis, Buechertausch, Leseabende und mehr. Entdecke, wie du bei der Booksociety Saarbruecken mitmachen kannst.",
};

const colorStyles: Record<string, { bg: string; text: string; icon: string }> = {
  rose: { bg: "bg-rose/20", text: "text-wine", icon: "text-wine" },
  wine: { bg: "bg-wine/10", text: "text-wine", icon: "text-wine" },
  botanical: { bg: "bg-botanical/10", text: "text-botanical", icon: "text-botanical" },
  gold: { bg: "bg-gold/10", text: "text-gold", icon: "text-gold" },
};

function extractPlainText(richText: any): string {
  if (typeof richText === "string") return richText;
  if (!richText?.root?.children) return "";
  function walk(nodes: any[]): string {
    return nodes
      .map((node: any) => {
        if (node.text) return node.text;
        if (node.children) return walk(node.children);
        return "";
      })
      .join(" ");
  }
  return walk(richText.root.children);
}

export default async function FormatePage() {
  let formats: any[] = [];
  try {
    formats = await getFormats();
  } catch {
    formats = [];
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-warm-sand/30 pt-24 pb-20">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <SectionReveal>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-wine mb-4">
              Unsere Formate
            </h1>
            <p className="text-charcoal/70 max-w-2xl mx-auto leading-relaxed">
              Bei der Booksociety Saarbruecken gibt es verschiedene Wege, Buecher
              gemeinsam zu erleben. Finde das Format, das zu dir passt.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          {formats.length === 0 ? (
            <SectionReveal>
              <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
                <p className="text-charcoal/60">
                  Formate werden bald hinzugefuegt. Schau bald wieder vorbei!
                </p>
              </div>
            </SectionReveal>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {formats.map((format: any) => {
                const color = colorStyles[format.color] ?? colorStyles.rose;
                return (
                  <SectionReveal key={format.id ?? format.slug}>
                    <Link
                      href={`/formate/${format.slug}`}
                      className="group block rounded-2xl bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color.bg}`}
                      >
                        <FormatIcon icon={format.icon} className={`w-6 h-6 ${color.icon}`} />
                      </div>
                      <h3 className="text-lg font-display font-semibold text-charcoal group-hover:text-wine transition-colors mb-2">
                        {format.title}
                      </h3>
                      <p className="text-sm text-charcoal/60 leading-relaxed line-clamp-3 mb-4">
                        {extractPlainText(format.description)}
                      </p>
                      <span className={`inline-flex items-center gap-1 text-sm font-semibold ${color.text}`}>
                        Mehr erfahren
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </Link>
                  </SectionReveal>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
