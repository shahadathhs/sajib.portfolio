import Navbar from "@/lib/shared/Navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="container mx-auto px-4">
      {/* navbar */}
      <div className="absolute top-0 left-0 right-0">
        <Navbar />
      </div>

      {/* main content */}
      <div className="min-h-calc pt-20">{children}</div>
    </main>
  );
}
