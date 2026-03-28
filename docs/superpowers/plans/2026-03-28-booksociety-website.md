# Booksociety Saarbrücken - Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Next.js Website für den Bücherclub "Booksociety Saarbrücken" mit Payload CMS, Supabase DB, WOW-Animationen und SEO.

**Architecture:** Next.js App Router mit Payload CMS integriert. Statische Seiten (Landing, Über uns) + CMS-gesteuerte Seiten (Events, Formate). Supabase PostgreSQL als Datenbank. Framer Motion für Animationen. Tailwind CSS für Styling.

**Tech Stack:** Next.js 15, Payload CMS 3, Supabase PostgreSQL, Tailwind CSS 4, Framer Motion, Lucide Icons, Playfair Display + Inter Fonts

**Spec:** `docs/superpowers/specs/2026-03-28-booksociety-website-design.md`

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `tailwind.config.ts`, `src/app/layout.tsx`, `src/app/(frontend)/layout.tsx`, `src/app/(frontend)/page.tsx`, `.env.local`, `.gitignore`, `src/styles/globals.css`

- [ ] **Step 1: Create Next.js project with Payload CMS**

```bash
cd /Users/felixzink/Booksociety.sb
npx create-payload-app@latest . --template blank --db postgres
```

When prompted: select PostgreSQL adapter, use blank template.

If interactive prompts fail, use manual setup:
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

- [ ] **Step 2: Install all dependencies**

```bash
npm install @payloadcms/db-postgres @payloadcms/richtext-lexical payload
npm install framer-motion lucide-react next-sitemap
npm install @supabase/supabase-js
npm install -D @types/node
```

- [ ] **Step 3: Configure environment variables**

Create `.env.local`:
```
DATABASE_URI=postgresql://postgres.[ref]:password@aws-0-eu-central-1.pooler.supabase.com:6543/postgres
PAYLOAD_SECRET=booksociety-sb-secret-change-me-in-production
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_INSTAGRAM_URL=https://www.instagram.com/booksociety.sb
```

Note: Get the actual Supabase connection string from the Supabase dashboard (project ref: bafyoezwwzjyasuichbg).

- [ ] **Step 4: Configure .gitignore**

```
node_modules/
.next/
.env.local
.env*.local
.superpowers/
*.tsbuildinfo
next-env.d.ts
```

- [ ] **Step 5: Set up Tailwind with Design System colors & fonts**

`tailwind.config.ts`:
```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        rose: { DEFAULT: "#F4C2C2", light: "#FFF5F5" },
        "dusty-rose": "#DBA7A7",
        wine: "#8B4557",
        charcoal: "#2D2D2D",
        cream: "#FDF6F0",
        "warm-sand": "#F7E6D8",
        botanical: "#4A6741",
        gold: "#B8860B",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        "pulse-soft": "pulse-soft 2s ease-in-out infinite",
      },
      keyframes: {
        "pulse-soft": {
          "0%, 100%": { transform: "scale(1)", boxShadow: "0 4px 15px rgba(225,48,108,0.3)" },
          "50%": { transform: "scale(1.05)", boxShadow: "0 6px 20px rgba(225,48,108,0.5)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 6: Set up global CSS**

`src/styles/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-cream text-charcoal font-body;
  }
  h1, h2, h3, h4 {
    @apply font-display;
  }
}

@layer utilities {
  .text-gradient-rose {
    @apply bg-gradient-to-r from-rose to-dusty-rose bg-clip-text text-transparent;
  }
}
```

- [ ] **Step 7: Set up root layout with fonts**

`src/app/layout.tsx`:
```tsx
import { Playfair_Display, Inter } from "next/font/google";
import "@/styles/globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${playfair.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 8: Create frontend layout shell**

`src/app/(frontend)/layout.tsx`:
```tsx
export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar comes later */}
      <main className="flex-1">{children}</main>
      {/* Footer comes later */}
    </div>
  );
}
```

- [ ] **Step 9: Create placeholder homepage**

`src/app/(frontend)/page.tsx`:
```tsx
export default function HomePage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1 className="text-5xl font-display text-wine">booksociety</h1>
    </div>
  );
}
```

- [ ] **Step 10: Copy logos to public directory**

```bash
mkdir -p public/logos
cp "Logos/Rot Schwarz Elegant Kaligrafie Illustrativ Rose Blumen Laden Logo .PNG" public/logos/logo-light.png
cp "Logos/Rot Schwarz Elegant Kaligrafie Illustrativ Rose Blumen Laden Logo  3.PNG" public/logos/logo-dark-white.png
cp "Logos/Rot Schwarz Elegant Kaligrafie Illustrativ Rose Blumen Laden Logo  4.PNG" public/logos/logo-dark-gold.png
```

- [ ] **Step 11: Verify dev server starts**

```bash
npm run dev
```

Expected: Server starts on localhost:3000, shows "booksociety" in Wine color on Cream background.

- [ ] **Step 12: Initialize git and commit**

```bash
git init
git add -A
git commit -m "feat: project scaffolding - Next.js, Tailwind, fonts, design tokens"
```

---

### Task 2: UI Components (Button, Badge, Accordion, Card)

**Files:**
- Create: `src/components/ui/button.tsx`, `src/components/ui/badge.tsx`, `src/components/ui/accordion.tsx`, `src/components/ui/section-reveal.tsx`

- [ ] **Step 1: Create Button component**

`src/components/ui/button.tsx`:
```tsx
import { forwardRef, type ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "outline" | "soft";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  href?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-wine text-white hover:bg-wine/90",
  outline: "border-2 border-wine text-wine hover:bg-wine hover:text-white",
  soft: "bg-rose text-wine hover:bg-dusty-rose",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className = "", href, children, ...props }, ref) => {
    const base = "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-body font-semibold text-sm transition-all duration-200";
    const styles = `${base} ${variantStyles[variant]} ${className}`;

    if (href) {
      return (
        <a href={href} className={styles}>
          {children}
        </a>
      );
    }

    return (
      <button ref={ref} className={styles} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
export { Button };
```

- [ ] **Step 2: Create Badge component**

`src/components/ui/badge.tsx`:
```tsx
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
```

- [ ] **Step 3: Create Accordion component**

`src/components/ui/accordion.tsx`:
```tsx
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
```

- [ ] **Step 4: Create SectionReveal animation wrapper**

`src/components/ui/section-reveal.tsx`:
```tsx
"use client";

import { motion } from "framer-motion";

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function SectionReveal({ children, className = "", delay = 0 }: SectionRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.15 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/
git commit -m "feat: UI components - Button, Badge, Accordion, SectionReveal"
```

---

### Task 3: Decorative Components

**Files:**
- Create: `src/components/decorative/watercolor-blob.tsx`, `src/components/decorative/botanical-line.tsx`, `src/components/decorative/parallax-leaves.tsx`

- [ ] **Step 1: Create WatercolorBlob component**

`src/components/decorative/watercolor-blob.tsx`:
```tsx
interface WatercolorBlobProps {
  className?: string;
  size?: number;
  opacity?: number;
  color?: string;
}

export function WatercolorBlob({
  className = "",
  size = 200,
  opacity = 0.3,
  color = "#F4C2C2",
}: WatercolorBlobProps) {
  return (
    <div
      className={`absolute pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity,
        filter: "blur(20px)",
      }}
    />
  );
}
```

- [ ] **Step 2: Create BotanicalLine SVG component**

`src/components/decorative/botanical-line.tsx`:
```tsx
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
```

- [ ] **Step 3: Create ParallaxLeaves component**

`src/components/decorative/parallax-leaves.tsx`:
```tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function ParallaxLeaves() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, -150]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -80]);
  const y3 = useTransform(scrollY, [0, 1000], [0, -200]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <motion.svg
        style={{ y: y1 }}
        className="absolute -left-4 top-[20vh] opacity-20"
        width="80" height="120" viewBox="0 0 80 120" fill="none"
      >
        <path d="M40 120 C20 80, 5 50, 15 20 C20 5, 35 0, 40 10 C45 0, 60 5, 65 20 C75 50, 60 80, 40 120Z" fill="#4A6741" />
      </motion.svg>

      <motion.svg
        style={{ y: y2 }}
        className="absolute -right-2 top-[40vh] opacity-15"
        width="60" height="100" viewBox="0 0 60 100" fill="none"
      >
        <path d="M30 100 C10 70, 0 40, 10 15 C15 5, 25 0, 30 8 C35 0, 45 5, 50 15 C60 40, 50 70, 30 100Z" fill="#DBA7A7" />
      </motion.svg>

      <motion.svg
        style={{ y: y3 }}
        className="absolute left-[10vw] top-[60vh] opacity-10"
        width="40" height="60" viewBox="0 0 40 60" fill="none"
      >
        <ellipse cx="20" cy="25" rx="15" ry="22" fill="#F4C2C2" />
        <line x1="20" y1="25" x2="20" y2="60" stroke="#DBA7A7" strokeWidth="1" />
      </motion.svg>
    </div>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/decorative/
git commit -m "feat: decorative components - watercolor blobs, botanical lines, parallax leaves"
```

---

### Task 4: Layout Components (Navbar, Footer, Floating Instagram)

**Files:**
- Create: `src/components/layout/navbar.tsx`, `src/components/layout/footer.tsx`, `src/components/layout/floating-instagram.tsx`
- Modify: `src/app/(frontend)/layout.tsx`

- [ ] **Step 1: Create Navbar with scroll transition**

`src/components/layout/navbar.tsx`:
```tsx
"use client";

import { useState, useEffect } from "react";
import { Menu, X, Instagram } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Startseite" },
  { href: "/events", label: "Events" },
  { href: "/formate", label: "Formate" },
  { href: "/ueber-uns", label: "Über uns" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-cream/95 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logos/logo-light.png" alt="Booksociety Saarbrücken" width={40} height={40} className="rounded-full" />
            <span className="font-display text-xl text-charcoal hidden sm:block">booksociety</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-charcoal/70 hover:text-wine transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={process.env.NEXT_PUBLIC_INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-charcoal/70 hover:text-wine transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden text-charcoal"
            aria-label="Menü öffnen"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-cream transition-transform duration-300 md:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-6">
          <button onClick={() => setMobileOpen(false)} aria-label="Menü schließen">
            <X className="w-6 h-6 text-charcoal" />
          </button>
        </div>
        <div className="flex flex-col items-center gap-8 mt-16">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="font-display text-2xl text-charcoal hover:text-wine transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={process.env.NEXT_PUBLIC_INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-wine"
          >
            <Instagram className="w-5 h-5" />
            <span className="text-sm">@booksociety.sb</span>
          </a>
        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 2: Create Footer**

`src/components/layout/footer.tsx`:
```tsx
import Link from "next/link";
import Image from "next/image";
import { Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-charcoal text-white/70 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Image src="/logos/logo-dark-white.png" alt="Booksociety" width={48} height={48} className="rounded-full mb-4" />
            <p className="text-sm leading-relaxed">
              Dein Buchclub in Saarbrücken. Gemeinsam lesen, gemeinsam erleben.
            </p>
          </div>

          <div>
            <h4 className="font-display text-white text-lg mb-4">Navigation</h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/" className="hover:text-rose transition-colors">Startseite</Link>
              <Link href="/events" className="hover:text-rose transition-colors">Events & Termine</Link>
              <Link href="/formate" className="hover:text-rose transition-colors">Unsere Formate</Link>
              <Link href="/ueber-uns" className="hover:text-rose transition-colors">Über uns</Link>
            </div>
          </div>

          <div>
            <h4 className="font-display text-white text-lg mb-4">Folge uns</h4>
            <a
              href={process.env.NEXT_PUBLIC_INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm hover:text-rose transition-colors"
            >
              <Instagram className="w-4 h-4" />
              @booksociety.sb
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <span>&copy; {new Date().getFullYear()} Booksociety Saarbrücken</span>
          <div className="flex gap-4">
            <Link href="/impressum" className="hover:text-rose transition-colors">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-rose transition-colors">Datenschutz</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Create Floating Instagram Button**

`src/components/layout/floating-instagram.tsx`:
```tsx
"use client";

import { Instagram } from "lucide-react";

export function FloatingInstagram() {
  return (
    <a
      href={process.env.NEXT_PUBLIC_INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg animate-pulse-soft"
      style={{
        background: "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
      }}
      aria-label="Folge uns auf Instagram"
    >
      <Instagram className="w-6 h-6 text-white" />
      <span className="absolute right-full mr-3 bg-charcoal text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        @booksociety.sb
      </span>
    </a>
  );
}
```

- [ ] **Step 4: Wire layout components into frontend layout**

Update `src/app/(frontend)/layout.tsx`:
```tsx
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FloatingInstagram } from "@/components/layout/floating-instagram";

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
      <FloatingInstagram />
    </div>
  );
}
```

- [ ] **Step 5: Verify and commit**

```bash
npm run dev
# Check: Navbar, Footer, Floating Instagram button visible
git add src/components/layout/ src/app/\(frontend\)/layout.tsx
git commit -m "feat: layout components - Navbar with scroll, Footer, Floating Instagram"
```

---

### Task 5: Splash Screen (Buch-Ladeanimation)

**Files:**
- Create: `src/components/layout/splash-screen.tsx`
- Modify: `src/app/(frontend)/layout.tsx`

- [ ] **Step 1: Create SplashScreen component**

`src/components/layout/splash-screen.tsx`:
```tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function SplashScreen() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = sessionStorage.getItem("splash-seen");
    if (!seen) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        sessionStorage.setItem("splash-seen", "1");
      }, 2800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSkip = () => {
    setShow(false);
    sessionStorage.setItem("splash-seen", "1");
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] bg-cream flex items-center justify-center cursor-pointer"
          onClick={handleSkip}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Book animation */}
          <div className="relative">
            {/* Watercolor splash expanding */}
            <motion.div
              className="absolute inset-0 -m-32"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
            >
              <div className="w-full h-full rounded-full" style={{
                background: "radial-gradient(circle, rgba(244,194,194,0.4) 0%, rgba(219,167,167,0.2) 40%, transparent 70%)",
              }} />
            </motion.div>

            {/* Book SVG */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <svg width="120" height="140" viewBox="0 0 120 140" className="drop-shadow-lg">
                {/* Book spine */}
                <rect x="10" y="10" width="100" height="120" rx="4" fill="#FDF6F0" stroke="#DBA7A7" strokeWidth="2" />
                {/* Pages */}
                <motion.rect
                  x="18" y="15" width="88" height="110" rx="2" fill="white" stroke="#F4C2C2" strokeWidth="0.5"
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: [0, -30, 0, -20, 0] }}
                  transition={{ delay: 0.3, duration: 1.5, ease: "easeInOut" }}
                  style={{ transformOrigin: "left center" }}
                />
                <motion.rect
                  x="22" y="18" width="82" height="104" rx="2" fill="white" stroke="#F4C2C2" strokeWidth="0.3"
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: [0, -25, 0, -15, 0] }}
                  transition={{ delay: 0.5, duration: 1.3, ease: "easeInOut" }}
                  style={{ transformOrigin: "left center" }}
                />
                {/* Text lines on page */}
                <line x1="30" y1="40" x2="90" y2="40" stroke="#DBA7A7" strokeWidth="1" opacity="0.3" />
                <line x1="30" y1="52" x2="80" y2="52" stroke="#DBA7A7" strokeWidth="1" opacity="0.3" />
                <line x1="30" y1="64" x2="85" y2="64" stroke="#DBA7A7" strokeWidth="1" opacity="0.3" />
              </svg>
            </motion.div>

            {/* Logo fade in */}
            <motion.div
              className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-48"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              <Image src="/logos/logo-light.png" alt="Booksociety" width={192} height={192} priority />
            </motion.div>
          </div>

          {/* Skip hint */}
          <motion.p
            className="absolute bottom-8 text-xs text-dusty-rose"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
          >
            Klick zum Überspringen
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Add SplashScreen to frontend layout**

Update `src/app/(frontend)/layout.tsx` - add `<SplashScreen />` after `<FloatingInstagram />`:
```tsx
import { SplashScreen } from "@/components/layout/splash-screen";

// Inside the return, after <FloatingInstagram />:
<SplashScreen />
```

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/splash-screen.tsx src/app/\(frontend\)/layout.tsx
git commit -m "feat: book splash screen animation with page-flip and watercolor"
```

---

### Task 6: Payload CMS Collections & Globals

**Files:**
- Create: `src/payload/collections/events.ts`, `src/payload/collections/formats.ts`, `src/payload/collections/media.ts`, `src/payload/collections/users.ts`, `src/payload/globals/site-settings.ts`, `src/payload/globals/current-book.ts`
- Modify: `payload.config.ts`

- [ ] **Step 1: Create Users collection**

`src/payload/collections/users.ts`:
```ts
import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: { useAsTitle: "email" },
  fields: [],
};
```

- [ ] **Step 2: Create Media collection**

`src/payload/collections/media.ts`:
```ts
import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  upload: {
    mimeTypes: ["image/*"],
  },
  admin: { useAsTitle: "alt" },
  fields: [
    { name: "alt", type: "text", required: true },
  ],
};
```

- [ ] **Step 3: Create Events collection**

`src/payload/collections/events.ts`:
```ts
import type { CollectionConfig } from "payload";

export const Events: CollectionConfig = {
  slug: "events",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "date", "event_type", "location_name"],
  },
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: { position: "sidebar" },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.title) {
              return data.title
                .toLowerCase()
                .replace(/[äÄ]/g, "ae").replace(/[öÖ]/g, "oe").replace(/[üÜ]/g, "ue").replace(/ß/g, "ss")
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");
            }
            return value;
          },
        ],
      },
    },
    { name: "date", type: "date", required: true, admin: { date: { pickerAppearance: "dayOnly" } } },
    { name: "time", type: "text", required: true, admin: { placeholder: "19:00" } },
    {
      name: "event_type",
      type: "select",
      required: true,
      options: [
        { label: "Lesekreis", value: "lesekreis" },
        { label: "Büchertausch", value: "buechertausch" },
        { label: "Leseabend", value: "leseabend" },
        { label: "Sonstiges", value: "sonstiges" },
      ],
    },
    { name: "description", type: "richText", required: true },
    {
      name: "location",
      type: "group",
      fields: [
        { name: "name", type: "text", required: true, admin: { placeholder: "Café Lesesaal" } },
        { name: "address", type: "text", admin: { placeholder: "Musterstr. 1, 66111 Saarbrücken" } },
        { name: "lat", type: "number", admin: { step: 0.000001 } },
        { name: "lng", type: "number", admin: { step: 0.000001 } },
      ],
    },
    { name: "featured_image", type: "upload", relationTo: "media" },
  ],
};
```

- [ ] **Step 4: Create Formats collection**

`src/payload/collections/formats.ts`:
```ts
import type { CollectionConfig } from "payload";

export const Formats: CollectionConfig = {
  slug: "formats",
  admin: { useAsTitle: "title" },
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.title) {
              return data.title
                .toLowerCase()
                .replace(/[äÄ]/g, "ae").replace(/[öÖ]/g, "oe").replace(/[üÜ]/g, "ue").replace(/ß/g, "ss")
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");
            }
            return value;
          },
        ],
      },
    },
    { name: "description", type: "richText", required: true },
    {
      name: "icon",
      type: "select",
      required: true,
      options: [
        { label: "Book", value: "Book" },
        { label: "BookOpen", value: "BookOpen" },
        { label: "Coffee", value: "Coffee" },
        { label: "Users", value: "Users" },
        { label: "Repeat", value: "Repeat" },
        { label: "Sparkles", value: "Sparkles" },
        { label: "MessageCircle", value: "MessageCircle" },
        { label: "Music", value: "Music" },
      ],
    },
    {
      name: "color",
      type: "select",
      required: true,
      defaultValue: "rose",
      options: [
        { label: "Rose", value: "rose" },
        { label: "Wine", value: "wine" },
        { label: "Botanical", value: "botanical" },
        { label: "Gold", value: "gold" },
      ],
    },
    { name: "featured_image", type: "upload", relationTo: "media" },
  ],
};
```

- [ ] **Step 5: Create Site Settings global**

`src/payload/globals/site-settings.ts`:
```ts
import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site Einstellungen",
  fields: [
    { name: "site_title", type: "text", defaultValue: "Booksociety Saarbrücken" },
    { name: "site_description", type: "textarea", defaultValue: "Dein Buchclub in Saarbrücken - Gemeinsam lesen, gemeinsam erleben." },
    { name: "instagram_url", type: "text", defaultValue: "https://www.instagram.com/booksociety.sb" },
    { name: "tagline", type: "text", defaultValue: "Gemeinsam lesen. Gemeinsam erleben." },
  ],
};
```

- [ ] **Step 6: Create Current Book global**

`src/payload/globals/current-book.ts`:
```ts
import type { GlobalConfig } from "payload";

export const CurrentBook: GlobalConfig = {
  slug: "current-book",
  label: "Aktuelle Buchempfehlung",
  fields: [
    { name: "title", type: "text", required: true, admin: { placeholder: "Der große Gatsby" } },
    { name: "author", type: "text", required: true, admin: { placeholder: "F. Scott Fitzgerald" } },
    { name: "description", type: "textarea" },
    { name: "cover_image", type: "upload", relationTo: "media" },
  ],
};
```

- [ ] **Step 7: Wire everything into payload.config.ts**

Update `payload.config.ts`:
```ts
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { fileURLToPath } from "url";

import { Users } from "@/payload/collections/users";
import { Media } from "@/payload/collections/media";
import { Events } from "@/payload/collections/events";
import { Formats } from "@/payload/collections/formats";
import { SiteSettings } from "@/payload/globals/site-settings";
import { CurrentBook } from "@/payload/globals/current-book";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: { user: Users.slug },
  collections: [Users, Media, Events, Formats],
  globals: [SiteSettings, CurrentBook],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  db: postgresAdapter({ pool: { connectionString: process.env.DATABASE_URI || "" } }),
});
```

- [ ] **Step 8: Commit**

```bash
git add src/payload/ payload.config.ts
git commit -m "feat: Payload CMS collections (Events, Formats, Media, Users) and globals"
```

---

### Task 7: Landing Page Sections (Hero, About, Next Event)

**Files:**
- Create: `src/components/sections/hero.tsx`, `src/components/sections/about-preview.tsx`, `src/components/sections/next-event.tsx`, `src/components/ui/countdown.tsx`
- Modify: `src/app/(frontend)/page.tsx`

- [ ] **Step 1: Create Hero section**

`src/components/sections/hero.tsx`:
```tsx
"use client";

import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { WatercolorBlob } from "@/components/decorative/watercolor-blob";

export function Hero() {
  const scrollToEvents = () => {
    document.getElementById("next-event")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 overflow-hidden">
      <WatercolorBlob className="-top-20 -right-20" size={400} opacity={0.25} />
      <WatercolorBlob className="-bottom-10 -left-10" size={250} opacity={0.2} />
      <WatercolorBlob className="top-1/3 left-1/4" size={150} opacity={0.15} color="#DBA7A7" />

      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Image
          src="/logos/logo-light.png"
          alt="Booksociety Saarbrücken"
          width={280}
          height={280}
          priority
          className="mx-auto mb-8"
        />
        <h1 className="font-display text-4xl md:text-6xl text-charcoal mb-4">
          Gemeinsam lesen.
          <br />
          <span className="text-wine">Gemeinsam erleben.</span>
        </h1>
        <p className="text-charcoal/60 text-lg md:text-xl max-w-lg mx-auto mb-8">
          Dein Buchclub in Saarbrücken. Triff Gleichgesinnte, entdecke neue Bücher und werde Teil unserer Community.
        </p>
        <Button variant="primary" onClick={scrollToEvents}>
          Entdecke unsere Events
          <ArrowDown className="w-4 h-4" />
        </Button>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Create About Preview section**

`src/components/sections/about-preview.tsx`:
```tsx
import { Book, Users, MapPin } from "lucide-react";
import { SectionReveal, StaggerContainer, StaggerItem } from "@/components/ui/section-reveal";
import { BotanicalLine } from "@/components/decorative/botanical-line";

const features = [
  { icon: Book, title: "Gemeinsam Lesen", text: "Jeden Monat ein neues Buch, das wir zusammen entdecken und besprechen." },
  { icon: Users, title: "Neue Leute treffen", text: "Eine offene Community für alle, die ihre Liebe zu Büchern teilen möchten." },
  { icon: MapPin, title: "Saarbrücken entdecken", text: "Wir treffen uns an verschiedenen gemütlichen Orten in der Stadt." },
];

export function AboutPreview() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionReveal className="text-center mb-16">
          <BotanicalLine variant="divider" className="mx-auto mb-6" />
          <h2 className="font-display text-3xl md:text-4xl text-charcoal mb-4">
            Mehr als ein Buchclub
          </h2>
          <p className="text-charcoal/60 max-w-2xl mx-auto text-lg">
            Die Booksociety Saarbrücken ist ein Ort für alle, die gerne lesen und sich darüber austauschen wollen. Egal welches Genre, egal welches Alter.
          </p>
        </SectionReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f) => (
            <StaggerItem key={f.title}>
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow text-center">
                <div className="w-14 h-14 bg-rose-light rounded-xl flex items-center justify-center mx-auto mb-5">
                  <f.icon className="w-6 h-6 text-wine" />
                </div>
                <h3 className="font-display text-xl text-charcoal mb-3">{f.title}</h3>
                <p className="text-charcoal/60 text-sm leading-relaxed">{f.text}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create Countdown component**

`src/components/ui/countdown.tsx`:
```tsx
"use client";

import { useState, useEffect } from "react";

interface CountdownProps {
  targetDate: string;
}

function getTimeLeft(target: string) {
  const diff = new Date(target).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function FlipUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-16 h-20 md:w-20 md:h-24 bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-3xl md:text-4xl text-wine">
            {String(value).padStart(2, "0")}
          </span>
        </div>
        <div className="absolute left-0 right-0 top-1/2 h-px bg-rose/30" />
      </div>
      <span className="text-xs text-charcoal/50 mt-2 uppercase tracking-widest">{label}</span>
    </div>
  );
}

export function Countdown({ targetDate }: CountdownProps) {
  const [time, setTime] = useState(getTimeLeft(targetDate));

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeLeft(targetDate)), 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex gap-3 md:gap-4 justify-center">
      <FlipUnit value={time.days} label="Tage" />
      <FlipUnit value={time.hours} label="Std" />
      <FlipUnit value={time.minutes} label="Min" />
      <FlipUnit value={time.seconds} label="Sek" />
    </div>
  );
}
```

- [ ] **Step 4: Create Next Event section**

`src/components/sections/next-event.tsx`:
```tsx
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import { SectionReveal } from "@/components/ui/section-reveal";
import { Countdown } from "@/components/ui/countdown";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface NextEventProps {
  event?: {
    title: string;
    slug: string;
    date: string;
    time: string;
    event_type: string;
    location: { name: string };
  } | null;
}

const typeLabels: Record<string, string> = {
  lesekreis: "Lesekreis",
  buechertausch: "Büchertausch",
  leseabend: "Leseabend",
  sonstiges: "Sonstiges",
};

export function NextEvent({ event }: NextEventProps) {
  if (!event) {
    return (
      <section id="next-event" className="py-24 px-6 bg-warm-sand/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl text-charcoal mb-4">Bald geht&apos;s los!</h2>
          <p className="text-charcoal/60">Unsere ersten Events sind in Planung. Folge uns auf Instagram für Updates!</p>
        </div>
      </section>
    );
  }

  const dateFormatted = new Date(event.date).toLocaleDateString("de-DE", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  return (
    <section id="next-event" className="py-24 px-6 bg-warm-sand/30">
      <div className="max-w-4xl mx-auto">
        <SectionReveal className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl text-charcoal mb-2">Nächstes Treffen</h2>
          <p className="text-charcoal/60">Sei dabei!</p>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm text-center">
            <Badge variant="rose" className="mb-4">{typeLabels[event.event_type] ?? event.event_type}</Badge>
            <h3 className="font-display text-2xl md:text-3xl text-charcoal mb-6">{event.title}</h3>
            <Countdown targetDate={event.date} />
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 text-sm text-charcoal/60">
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-dusty-rose" />{dateFormatted}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-dusty-rose" />{event.time} Uhr</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-dusty-rose" />{event.location.name}</span>
            </div>
            <div className="mt-8 flex gap-3 justify-center">
              <Link href={`/events/${event.slug}`}>
                <Button variant="primary">
                  Details <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/events">
                <Button variant="outline">Alle Events</Button>
              </Link>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/ src/components/ui/countdown.tsx
git commit -m "feat: landing page sections - Hero, About Preview, Next Event with countdown"
```

---

### Task 8: Landing Page Sections (Current Book, Instagram, CTA)

**Files:**
- Create: `src/components/sections/current-book.tsx`, `src/components/sections/instagram-feed.tsx`, `src/components/sections/cta.tsx`
- Modify: `src/app/(frontend)/page.tsx`

- [ ] **Step 1: Create Current Book section with 3D tilt**

`src/components/sections/current-book.tsx`:
```tsx
"use client";

import { useRef } from "react";
import Image from "next/image";
import { SectionReveal } from "@/components/ui/section-reveal";
import { BookOpen } from "lucide-react";

interface CurrentBookProps {
  book?: {
    title: string;
    author: string;
    description?: string | null;
    cover_image?: { url: string } | null;
  } | null;
}

export function CurrentBook({ book }: CurrentBookProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cardRef.current.style.transform = `perspective(600px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = "perspective(600px) rotateY(0deg) rotateX(0deg)";
    }
  };

  if (!book) return null;

  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionReveal className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl text-charcoal">Wir lesen gerade...</h2>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="w-48 h-72 rounded-lg shadow-2xl overflow-hidden transition-transform duration-200 flex-shrink-0 cursor-default"
            >
              {book.cover_image?.url ? (
                <Image src={book.cover_image.url} alt={book.title} width={192} height={288} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-rose to-dusty-rose flex items-center justify-center">
                  <BookOpen className="w-12 h-12 text-white/70" />
                </div>
              )}
            </div>
            <div>
              <span className="text-xs text-dusty-rose uppercase tracking-widest font-semibold">Aktuelle Empfehlung</span>
              <h3 className="font-display text-2xl text-charcoal mt-2 mb-1">{book.title}</h3>
              <p className="text-wine font-medium mb-4">{book.author}</p>
              {book.description && (
                <p className="text-charcoal/60 leading-relaxed">{book.description}</p>
              )}
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create Instagram Feed section**

`src/components/sections/instagram-feed.tsx`:
```tsx
import { Instagram, Heart } from "lucide-react";
import { SectionReveal, StaggerContainer, StaggerItem } from "@/components/ui/section-reveal";
import { Button } from "@/components/ui/button";

export function InstagramFeed() {
  // Placeholder grid - replace with Behold.so widget or API later
  const placeholders = Array.from({ length: 6 }, (_, i) => i);

  return (
    <section className="py-24 px-6 bg-warm-sand/30">
      <div className="max-w-6xl mx-auto">
        <SectionReveal className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl text-charcoal mb-2">Folge uns auf Instagram</h2>
          <p className="text-charcoal/60">@booksociety.sb</p>
        </SectionReveal>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {placeholders.map((i) => (
            <StaggerItem key={i}>
              <a
                href={process.env.NEXT_PUBLIC_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square bg-gradient-to-br from-rose-light to-warm-sand rounded-2xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-wine/0 group-hover:bg-wine/40 transition-all duration-300 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </a>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="text-center">
          <Button variant="outline" href={process.env.NEXT_PUBLIC_INSTAGRAM_URL}>
            <Instagram className="w-4 h-4" />
            Auf Instagram folgen
          </Button>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create CTA section**

`src/components/sections/cta.tsx`:
```tsx
import { SectionReveal } from "@/components/ui/section-reveal";
import { Button } from "@/components/ui/button";
import { WatercolorBlob } from "@/components/decorative/watercolor-blob";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <WatercolorBlob className="-top-10 -right-10" size={300} opacity={0.2} />
      <WatercolorBlob className="-bottom-10 -left-10" size={200} opacity={0.15} color="#DBA7A7" />

      <SectionReveal className="max-w-2xl mx-auto text-center relative z-10">
        <h2 className="font-display text-3xl md:text-4xl text-charcoal mb-4">
          Werde Teil der Booksociety
        </h2>
        <p className="text-charcoal/60 text-lg mb-8 leading-relaxed">
          Du liebst Bücher und suchst Gleichgesinnte in Saarbrücken? Schreib uns einfach eine Nachricht auf Instagram und komm zum nächsten Treffen vorbei!
        </p>
        <Button
          variant="primary"
          href="https://ig.me/m/booksociety.sb"
        >
          Schreib uns auf Instagram
          <ArrowRight className="w-4 h-4" />
        </Button>
      </SectionReveal>
    </section>
  );
}
```

- [ ] **Step 4: Assemble the Landing Page**

Update `src/app/(frontend)/page.tsx`:
```tsx
import { Hero } from "@/components/sections/hero";
import { AboutPreview } from "@/components/sections/about-preview";
import { NextEvent } from "@/components/sections/next-event";
import { CurrentBook } from "@/components/sections/current-book";
import { InstagramFeed } from "@/components/sections/instagram-feed";
import { CTA } from "@/components/sections/cta";
import { ParallaxLeaves } from "@/components/decorative/parallax-leaves";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booksociety Saarbrücken – Dein Buchclub im Saarland",
  description: "Buchclub in Saarbrücken: Gemeinsam lesen, Lesekreis, Büchertausch und mehr. Finde deinen Lesekreis in Saarbrücken und werde Teil unserer Community.",
};

export default async function HomePage() {
  // TODO: Fetch from Payload CMS once DB is connected
  // For now, use static placeholder data
  const nextEvent = null;
  const currentBook = null;

  return (
    <>
      <ParallaxLeaves />
      <Hero />
      <AboutPreview />
      <NextEvent event={nextEvent} />
      <CurrentBook book={currentBook} />
      <InstagramFeed />
      <CTA />
    </>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/ src/app/\(frontend\)/page.tsx
git commit -m "feat: landing page complete - Current Book, Instagram Feed, CTA, full page assembly"
```

---

### Task 9: Events Pages (List + Detail)

**Files:**
- Create: `src/components/events/event-card.tsx`, `src/components/events/event-filter.tsx`, `src/app/(frontend)/events/page.tsx`, `src/app/(frontend)/events/[slug]/page.tsx`, `src/lib/payload.ts`

- [ ] **Step 1: Create Payload data fetching helpers**

`src/lib/payload.ts`:
```tsx
import configPromise from "@payload-config";
import { getPayload } from "payload";

export async function getPayloadClient() {
  return getPayload({ config: configPromise });
}

export async function getEvents({ upcoming = true }: { upcoming?: boolean } = {}) {
  const payload = await getPayloadClient();
  const now = new Date().toISOString();

  const result = await payload.find({
    collection: "events",
    sort: upcoming ? "date" : "-date",
    where: upcoming
      ? { date: { greater_than_equal: now } }
      : { date: { less_than: now } },
    limit: 50,
  });

  return result.docs;
}

export async function getEventBySlug(slug: string) {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "events",
    where: { slug: { equals: slug } },
    limit: 1,
  });
  return result.docs[0] ?? null;
}

export async function getNextEvent() {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "events",
    sort: "date",
    where: { date: { greater_than_equal: new Date().toISOString() } },
    limit: 1,
  });
  return result.docs[0] ?? null;
}

export async function getFormats() {
  const payload = await getPayloadClient();
  const result = await payload.find({ collection: "formats", limit: 50 });
  return result.docs;
}

export async function getFormatBySlug(slug: string) {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "formats",
    where: { slug: { equals: slug } },
    limit: 1,
  });
  return result.docs[0] ?? null;
}

export async function getCurrentBook() {
  const payload = await getPayloadClient();
  return payload.findGlobal({ slug: "current-book" });
}
```

- [ ] **Step 2: Create EventCard component**

`src/components/events/event-card.tsx`:
```tsx
import Link from "next/link";
import { Calendar, MapPin, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface EventCardProps {
  event: {
    title: string;
    slug: string;
    date: string;
    time: string;
    event_type: string;
    location: { name: string };
  };
  isPast?: boolean;
}

const typeLabels: Record<string, string> = {
  lesekreis: "Lesekreis",
  buechertausch: "Büchertausch",
  leseabend: "Leseabend",
  sonstiges: "Sonstiges",
};

export function EventCard({ event, isPast }: EventCardProps) {
  const d = new Date(event.date);
  const day = d.getDate();
  const month = d.toLocaleDateString("de-DE", { month: "short" }).toUpperCase();

  return (
    <Link href={`/events/${event.slug}`} className={`group block ${isPast ? "opacity-60" : ""}`}>
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="bg-gradient-to-r from-rose to-dusty-rose p-5 text-center">
          <div className="font-display text-3xl text-white font-bold">{day}</div>
          <div className="text-xs text-white/80 uppercase tracking-widest">{month}</div>
        </div>
        <div className="p-5">
          <Badge variant="rose" className="mb-3">{typeLabels[event.event_type] ?? event.event_type}</Badge>
          <h3 className="font-display text-lg text-charcoal group-hover:text-wine transition-colors mb-3">{event.title}</h3>
          <div className="space-y-1.5 text-sm text-charcoal/60">
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-dusty-rose" />{event.location.name}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-dusty-rose" />{event.time} Uhr</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
```

- [ ] **Step 3: Create EventFilter component**

`src/components/events/event-filter.tsx`:
```tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";

const types = [
  { value: "", label: "Alle" },
  { value: "lesekreis", label: "Lesekreis" },
  { value: "buechertausch", label: "Büchertausch" },
  { value: "leseabend", label: "Leseabend" },
  { value: "sonstiges", label: "Sonstiges" },
];

export function EventFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = searchParams.get("typ") ?? "";

  const handleFilter = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set("typ", value);
    else params.delete("typ");
    router.push(`/events?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {types.map((t) => (
        <button
          key={t.value}
          onClick={() => handleFilter(t.value)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            active === t.value
              ? "bg-wine text-white"
              : "bg-white text-charcoal/70 hover:bg-rose-light"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Create Events list page**

`src/app/(frontend)/events/page.tsx`:
```tsx
import { getEvents } from "@/lib/payload";
import { EventCard } from "@/components/events/event-card";
import { EventFilter } from "@/components/events/event-filter";
import { SectionReveal } from "@/components/ui/section-reveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events & Termine – Booksociety Saarbrücken",
  description: "Finde den nächsten Lesekreis, Büchertausch oder Leseabend in Saarbrücken. Alle Termine der Booksociety auf einen Blick.",
};

export default async function EventsPage({ searchParams }: { searchParams: Promise<{ typ?: string }> }) {
  const params = await searchParams;
  const upcoming = await getEvents({ upcoming: true });
  const past = await getEvents({ upcoming: false });

  const filterType = params.typ;
  const filteredUpcoming = filterType ? upcoming.filter((e: any) => e.event_type === filterType) : upcoming;
  const filteredPast = filterType ? past.filter((e: any) => e.event_type === filterType) : past;

  return (
    <div className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionReveal className="mb-12">
          <h1 className="font-display text-4xl md:text-5xl text-charcoal mb-4">Events & Termine</h1>
          <p className="text-charcoal/60 text-lg mb-8">
            Entdecke unsere kommenden Treffen und finde das passende Format für dich.
          </p>
          <EventFilter />
        </SectionReveal>

        {filteredUpcoming.length > 0 && (
          <section className="mb-16">
            <h2 className="font-display text-2xl text-charcoal mb-6">Kommende Events</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUpcoming.map((event: any) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </section>
        )}

        {filteredUpcoming.length === 0 && (
          <p className="text-charcoal/50 text-center py-12">Keine kommenden Events gefunden.</p>
        )}

        {filteredPast.length > 0 && (
          <section>
            <h2 className="font-display text-2xl text-charcoal/50 mb-6">Vergangene Events</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPast.map((event: any) => (
                <EventCard key={event.id} event={event} isPast />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Create Event detail page**

`src/app/(frontend)/events/[slug]/page.tsx`:
```tsx
import { getEventBySlug, getEvents } from "@/lib/payload";
import { notFound } from "next/navigation";
import { Calendar, MapPin, Clock, ArrowRight, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionReveal } from "@/components/ui/section-reveal";
import Link from "next/link";
import type { Metadata } from "next";

const typeLabels: Record<string, string> = {
  lesekreis: "Lesekreis", buechertausch: "Büchertausch", leseabend: "Leseabend", sonstiges: "Sonstiges",
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return {};
  return {
    title: `${event.title} – Booksociety Saarbrücken`,
    description: `${typeLabels[event.event_type]} am ${new Date(event.date).toLocaleDateString("de-DE")} bei ${event.location.name} in Saarbrücken.`,
  };
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getEventBySlug(slug) as any;
  if (!event) notFound();

  const dateFormatted = new Date(event.date).toLocaleDateString("de-DE", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });
  const isPast = new Date(event.date) < new Date();

  return (
    <div className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/events" className="inline-flex items-center gap-1 text-sm text-charcoal/50 hover:text-wine mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Alle Events
        </Link>

        <SectionReveal>
          <Badge variant={isPast ? "wine" : "rose"} className="mb-4">
            {typeLabels[event.event_type] ?? event.event_type}
          </Badge>
          <h1 className="font-display text-3xl md:text-4xl text-charcoal mb-6">{event.title}</h1>

          <div className="flex flex-col gap-3 text-charcoal/70 mb-8">
            <span className="flex items-center gap-2"><Calendar className="w-5 h-5 text-dusty-rose" />{dateFormatted}</span>
            <span className="flex items-center gap-2"><Clock className="w-5 h-5 text-dusty-rose" />{event.time} Uhr</span>
            <span className="flex items-center gap-2"><MapPin className="w-5 h-5 text-dusty-rose" />{event.location.name}{event.location.address ? `, ${event.location.address}` : ""}</span>
          </div>

          {/* Map embed if coordinates exist */}
          {event.location.lat && event.location.lng && (
            <div className="rounded-2xl overflow-hidden mb-8 h-64">
              <iframe
                width="100%" height="100%" style={{ border: 0 }}
                loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${event.location.lng - 0.005},${event.location.lat - 0.003},${event.location.lng + 0.005},${event.location.lat + 0.003}&layer=mapnik&marker=${event.location.lat},${event.location.lng}`}
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none mb-8">
            {/* Payload richText content rendered here - needs RichText renderer */}
            <p className="text-charcoal/70">Event-Beschreibung wird hier aus dem CMS gerendert.</p>
          </div>

          {!isPast && (
            <Button variant="primary" href="https://ig.me/m/booksociety.sb">
              Komm vorbei! Schreib uns auf Instagram <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </SectionReveal>
      </div>
    </div>
  );
}
```

- [ ] **Step 6: Commit**

```bash
git add src/lib/payload.ts src/components/events/ src/app/\(frontend\)/events/
git commit -m "feat: events pages - list with filter, detail with map, data fetching helpers"
```

---

### Task 10: Formate Pages + Über uns

**Files:**
- Create: `src/app/(frontend)/formate/page.tsx`, `src/app/(frontend)/formate/[slug]/page.tsx`, `src/app/(frontend)/ueber-uns/page.tsx`, `src/components/events/format-icon.tsx`

- [ ] **Step 1: Create FormatIcon helper**

`src/components/events/format-icon.tsx`:
```tsx
import { Book, BookOpen, Coffee, Users, Repeat, Sparkles, MessageCircle, Music } from "lucide-react";

const iconMap: Record<string, React.ComponentType<any>> = {
  Book, BookOpen, Coffee, Users, Repeat, Sparkles, MessageCircle, Music,
};

export function FormatIcon({ name, className = "" }: { name: string; className?: string }) {
  const Icon = iconMap[name] ?? Book;
  return <Icon className={className} />;
}
```

- [ ] **Step 2: Create Formate list page**

`src/app/(frontend)/formate/page.tsx`:
```tsx
import { getFormats } from "@/lib/payload";
import { FormatIcon } from "@/components/events/format-icon";
import { SectionReveal, StaggerContainer, StaggerItem } from "@/components/ui/section-reveal";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unsere Formate – Booksociety Saarbrücken",
  description: "Lesekreis, Büchertausch, Leseabende und mehr. Entdecke die verschiedenen Formate der Booksociety Saarbrücken.",
};

const colorMap: Record<string, string> = {
  rose: "bg-rose-light text-wine",
  wine: "bg-wine/10 text-wine",
  botanical: "bg-botanical/10 text-botanical",
  gold: "bg-gold/10 text-gold",
};

export default async function FormatePage() {
  const formats = await getFormats();

  return (
    <div className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionReveal className="mb-12">
          <h1 className="font-display text-4xl md:text-5xl text-charcoal mb-4">Unsere Formate</h1>
          <p className="text-charcoal/60 text-lg">Für jeden Lesegeschmack das richtige Format.</p>
        </SectionReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {(formats as any[]).map((format) => (
            <StaggerItem key={format.id}>
              <Link href={`/formate/${format.slug}`} className="group block bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${colorMap[format.color] ?? colorMap.rose}`}>
                  <FormatIcon name={format.icon} className="w-6 h-6" />
                </div>
                <h2 className="font-display text-2xl text-charcoal group-hover:text-wine transition-colors mb-3">{format.title}</h2>
                <p className="text-charcoal/60 text-sm leading-relaxed mb-4">Format-Beschreibung aus dem CMS.</p>
                <span className="inline-flex items-center gap-1 text-sm text-wine font-medium">
                  Mehr erfahren <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {formats.length === 0 && (
          <p className="text-charcoal/50 text-center py-12">Formate werden bald hinzugefügt. Bleib dran!</p>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create Format detail page**

`src/app/(frontend)/formate/[slug]/page.tsx`:
```tsx
import { getFormatBySlug, getEvents } from "@/lib/payload";
import { notFound } from "next/navigation";
import { FormatIcon } from "@/components/events/format-icon";
import { EventCard } from "@/components/events/event-card";
import { SectionReveal } from "@/components/ui/section-reveal";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const format = await getFormatBySlug(slug);
  if (!format) return {};
  return {
    title: `${format.title} – Booksociety Saarbrücken`,
    description: `${format.title} - eines der Formate der Booksociety Saarbrücken. Finde passende Events und Termine.`,
  };
}

export default async function FormatDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const format = await getFormatBySlug(slug) as any;
  if (!format) notFound();

  const allEvents = await getEvents({ upcoming: true });
  // Match format title to event_type mapping (simplified - could use a relation field)
  const typeSlugMap: Record<string, string> = {
    Lesekreis: "lesekreis", Büchertausch: "buechertausch", Leseabend: "leseabend",
  };
  const matchType = typeSlugMap[format.title];
  const relatedEvents = matchType ? (allEvents as any[]).filter((e) => e.event_type === matchType) : [];

  return (
    <div className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/formate" className="inline-flex items-center gap-1 text-sm text-charcoal/50 hover:text-wine mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Alle Formate
        </Link>

        <SectionReveal>
          <FormatIcon name={format.icon} className="w-10 h-10 text-wine mb-4" />
          <h1 className="font-display text-3xl md:text-4xl text-charcoal mb-6">{format.title}</h1>
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-charcoal/70">Format-Beschreibung aus dem CMS.</p>
          </div>
        </SectionReveal>

        {relatedEvents.length > 0 && (
          <section>
            <h2 className="font-display text-2xl text-charcoal mb-6">Kommende {format.title} Events</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedEvents.map((event: any) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create Über uns page**

`src/app/(frontend)/ueber-uns/page.tsx`:
```tsx
import { SectionReveal } from "@/components/ui/section-reveal";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { BotanicalLine } from "@/components/decorative/botanical-line";
import { ArrowRight, Book, Heart, Users } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Über uns – Booksociety Saarbrücken",
  description: "Erfahre mehr über die Booksociety Saarbrücken: Unser Buchclub, unsere Mission und wie du mitmachen kannst.",
};

const faqItems = [
  { question: "Muss ich jedes Mal kommen?", answer: "Nein, du kannst so oft vorbeikommen wie du möchtest. Es gibt keine Verpflichtung zur regelmäßigen Teilnahme." },
  { question: "Kostet die Teilnahme etwas?", answer: "Die Teilnahme an unseren Treffen ist kostenlos. Du brauchst nur das jeweilige Buch, falls wir eines gemeinsam lesen." },
  { question: "Wo trefft ihr euch?", answer: "Wir treffen uns an verschiedenen Orten in Saarbrücken - Cafés, Bibliotheken oder andere gemütliche Locations. Den genauen Ort findest du immer bei den jeweiligen Events." },
  { question: "Muss ich das Buch gelesen haben?", answer: "Beim Lesekreis ist es natürlich schön, wenn du das Buch gelesen hast. Aber auch ohne ist jeder willkommen! Bei anderen Formaten wie dem Büchertausch oder Leseabend spielt das keine Rolle." },
];

export default function UeberUnsPage() {
  return (
    <div className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <SectionReveal>
          <h1 className="font-display text-4xl md:text-5xl text-charcoal mb-6">Über uns</h1>
          <BotanicalLine variant="divider" className="mb-8" />
        </SectionReveal>

        <SectionReveal delay={0.1} className="mb-16">
          <h2 className="font-display text-2xl text-charcoal mb-4 flex items-center gap-2">
            <Book className="w-6 h-6 text-wine" /> Unsere Geschichte
          </h2>
          <p className="text-charcoal/70 leading-relaxed mb-4">
            Die Booksociety Saarbrücken entstand aus der einfachen Idee, dass Lesen zusammen noch schöner ist.
            Was als kleine Runde unter Freundinnen begann, wächst nun zu einer offenen Community für alle Buchbegeisterten in Saarbrücken.
          </p>
        </SectionReveal>

        <SectionReveal delay={0.2} className="mb-16">
          <h2 className="font-display text-2xl text-charcoal mb-4 flex items-center gap-2">
            <Heart className="w-6 h-6 text-wine" /> Unsere Mission
          </h2>
          <p className="text-charcoal/70 leading-relaxed">
            Wir wollen einen Ort schaffen, an dem Menschen zusammenkommen, die die Liebe zu Büchern teilen.
            Egal welches Genre, egal welches Alter - bei uns ist jeder willkommen. Wir glauben, dass Bücher
            Menschen verbinden und Geschichten den Horizont erweitern.
          </p>
        </SectionReveal>

        <SectionReveal delay={0.3} className="mb-16">
          <h2 className="font-display text-2xl text-charcoal mb-4 flex items-center gap-2">
            <Users className="w-6 h-6 text-wine" /> Mitmachen
          </h2>
          <p className="text-charcoal/70 leading-relaxed mb-6">
            Du möchtest dabei sein? Schreib uns einfach auf Instagram eine Nachricht und komm zum nächsten Treffen vorbei.
            Es ist wirklich so einfach!
          </p>
          <Button variant="primary" href="https://ig.me/m/booksociety.sb">
            Schreib uns auf Instagram <ArrowRight className="w-4 h-4" />
          </Button>
        </SectionReveal>

        <SectionReveal delay={0.4}>
          <h2 className="font-display text-2xl text-charcoal mb-6">Häufige Fragen</h2>
          <Accordion items={faqItems} />
        </SectionReveal>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add src/app/\(frontend\)/formate/ src/app/\(frontend\)/ueber-uns/ src/components/events/format-icon.tsx
git commit -m "feat: Formate pages + Über uns with FAQ accordion"
```

---

### Task 11: SEO (Schema.org, Sitemap, Robots)

**Files:**
- Create: `next-sitemap.config.js`, `src/components/seo/json-ld.tsx`
- Modify: `src/app/layout.tsx`, `package.json`

- [ ] **Step 1: Create JSON-LD component for structured data**

`src/components/seo/json-ld.tsx`:
```tsx
interface JsonLdProps {
  data: Record<string, any>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  return (
    <JsonLd data={{
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Booksociety Saarbrücken",
      description: "Buchclub in Saarbrücken - Gemeinsam lesen, gemeinsam erleben.",
      url: process.env.NEXT_PUBLIC_SITE_URL,
      sameAs: [process.env.NEXT_PUBLIC_INSTAGRAM_URL],
      areaServed: {
        "@type": "City",
        name: "Saarbrücken",
        addressCountry: "DE",
      },
    }} />
  );
}

export function EventJsonLd({ event }: { event: { title: string; date: string; time: string; location: { name: string; address?: string }; event_type: string } }) {
  return (
    <JsonLd data={{
      "@context": "https://schema.org",
      "@type": "Event",
      name: event.title,
      startDate: event.date,
      location: {
        "@type": "Place",
        name: event.location.name,
        address: event.location.address ?? "Saarbrücken, Deutschland",
      },
      organizer: {
        "@type": "Organization",
        name: "Booksociety Saarbrücken",
      },
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      isAccessibleForFree: true,
    }} />
  );
}

export function FaqJsonLd({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <JsonLd data={{
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    }} />
  );
}
```

- [ ] **Step 2: Add Organization JSON-LD to root layout**

In `src/app/layout.tsx`, add after `<body>`:
```tsx
import { OrganizationJsonLd } from "@/components/seo/json-ld";

// Inside <body>, before {children}:
<OrganizationJsonLd />
```

- [ ] **Step 3: Create next-sitemap config**

`next-sitemap.config.js`:
```js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://booksociety-sb.vercel.app",
  generateRobotsTxt: true,
  exclude: ["/admin/*"],
  robotsTxtOptions: {
    additionalSitemaps: [],
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: "/admin" },
    ],
  },
};
```

- [ ] **Step 4: Add postbuild script to package.json**

Add to `scripts` in `package.json`:
```json
"postbuild": "next-sitemap"
```

- [ ] **Step 5: Add Event JSON-LD to event detail page and FAQ JSON-LD to Über uns**

In `src/app/(frontend)/events/[slug]/page.tsx`, add `<EventJsonLd event={event} />` inside the return.

In `src/app/(frontend)/ueber-uns/page.tsx`, add `<FaqJsonLd items={faqItems} />` inside the return.

- [ ] **Step 6: Commit**

```bash
git add src/components/seo/ next-sitemap.config.js src/app/layout.tsx src/app/\(frontend\)/events/\[slug\]/page.tsx src/app/\(frontend\)/ueber-uns/page.tsx package.json
git commit -m "feat: SEO - Schema.org JSON-LD, sitemap, robots.txt"
```

---

### Task 12: Legal Pages + Final Wiring

**Files:**
- Create: `src/app/(frontend)/impressum/page.tsx`, `src/app/(frontend)/datenschutz/page.tsx`
- Modify: `src/app/(frontend)/page.tsx` (wire CMS data)

- [ ] **Step 1: Create Impressum page**

`src/app/(frontend)/impressum/page.tsx`:
```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum – Booksociety Saarbrücken",
  robots: "noindex",
};

export default function ImpressumPage() {
  return (
    <div className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-4xl text-charcoal mb-8">Impressum</h1>
        <div className="prose prose-lg max-w-none text-charcoal/70">
          <h2>Angaben gemäß § 5 TMG</h2>
          <p>
            [Name der Verantwortlichen]<br />
            [Straße und Hausnummer]<br />
            [PLZ Ort]
          </p>
          <h2>Kontakt</h2>
          <p>
            Instagram: <a href="https://www.instagram.com/booksociety.sb" target="_blank" rel="noopener noreferrer" className="text-wine">@booksociety.sb</a>
          </p>
          <h2>Haftung für Inhalte</h2>
          <p>
            Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
            Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen.
          </p>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create Datenschutz page**

`src/app/(frontend)/datenschutz/page.tsx`:
```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung – Booksociety Saarbrücken",
  robots: "noindex",
};

export default function DatenschutzPage() {
  return (
    <div className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-4xl text-charcoal mb-8">Datenschutzerklärung</h1>
        <div className="prose prose-lg max-w-none text-charcoal/70">
          <h2>1. Datenschutz auf einen Blick</h2>
          <p>
            Diese Webseite wird von Booksociety Saarbrücken betrieben.
            Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst.
          </p>
          <h2>2. Hosting</h2>
          <p>
            Diese Webseite wird bei Vercel Inc. gehostet. Details zum Datenschutz bei Vercel finden Sie unter:
            https://vercel.com/legal/privacy-policy
          </p>
          <h2>3. Externe Links</h2>
          <p>
            Diese Seite enthält Links zu Instagram (Meta Platforms Ireland Ltd.).
            Beim Klick auf diese Links verlassen Sie unsere Webseite. Für die Datenverarbeitung
            durch Instagram/Meta gelten deren Datenschutzbestimmungen.
          </p>
          <h2>4. Ihre Rechte</h2>
          <p>
            Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung
            Ihrer personenbezogenen Daten. Kontaktieren Sie uns dafür über Instagram.
          </p>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Wire CMS data into Landing Page**

Update `src/app/(frontend)/page.tsx` - replace static placeholder data with actual CMS calls:
```tsx
import { getNextEvent, getCurrentBook } from "@/lib/payload";

export default async function HomePage() {
  let nextEvent = null;
  let currentBook = null;

  try {
    nextEvent = await getNextEvent();
    currentBook = await getCurrentBook();
  } catch {
    // CMS not yet connected - use null fallbacks
  }

  return (
    <>
      <ParallaxLeaves />
      <Hero />
      <AboutPreview />
      <NextEvent event={nextEvent as any} />
      <CurrentBook book={currentBook as any} />
      <InstagramFeed />
      <CTA />
    </>
  );
}
```

- [ ] **Step 4: Final commit**

```bash
git add src/app/\(frontend\)/impressum/ src/app/\(frontend\)/datenschutz/ src/app/\(frontend\)/page.tsx
git commit -m "feat: legal pages (Impressum, Datenschutz) + CMS data wiring"
```

---

### Task 13: Verify & Polish

- [ ] **Step 1: Run the full build**

```bash
npm run build
```

Fix any TypeScript or build errors.

- [ ] **Step 2: Test all pages manually**

```bash
npm run dev
```

Check:
- [ ] Landing Page: Hero, About, Next Event (with fallback), Book (with fallback), Instagram, CTA
- [ ] Events: List page, filter, detail page
- [ ] Formate: List page, detail page
- [ ] Über uns: Content, FAQ accordion works
- [ ] Impressum & Datenschutz
- [ ] Navbar: Scroll transition, mobile menu
- [ ] Footer: All links
- [ ] Floating Instagram button: Visible, tooltip on hover
- [ ] Splash Screen: Shows on first visit, skippable, doesn't show again
- [ ] Responsive: Works on mobile viewport

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "feat: booksociety.sb website complete - all pages, CMS, SEO, animations"
```
