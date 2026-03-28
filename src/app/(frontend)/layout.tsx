import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FloatingInstagram } from "@/components/layout/floating-instagram";
import { SplashScreen } from "@/components/layout/splash-screen";

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingInstagram />
      <SplashScreen />
    </div>
  );
}
