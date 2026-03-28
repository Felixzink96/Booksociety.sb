export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar comes later */}
      <main className="flex-1">{children}</main>
      {/* Footer comes later */}
    </div>
  );
}
