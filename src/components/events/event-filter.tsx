"use client";

import { useSearchParams, useRouter } from "next/navigation";

const filters = [
  { label: "Alle", value: "" },
  { label: "Lesekreis", value: "lesekreis" },
  { label: "Büchertausch", value: "buechertausch" },
  { label: "Leseabend", value: "leseabend" },
  { label: "Sonstiges", value: "sonstiges" },
];

export function EventFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const active = searchParams.get("typ") ?? "";

  function handleFilter(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("typ", value);
    } else {
      params.delete("typ");
    }
    router.push(`/events?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => handleFilter(f.value)}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors duration-200 ${
            active === f.value
              ? "bg-wine text-white"
              : "bg-white text-charcoal/70 hover:bg-rose-light"
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
