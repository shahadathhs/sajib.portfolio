// * Shared public layout (header, footer, etc.)
import Footer from "@/lib/shared/Footer";
import Navbar from "@/lib/shared/Navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="container mx-auto">
      {/* navbar */}
      <div className="absolute top-0 left-0 right-0">
        <Navbar />
      </div>

      {/* main content */}
      <div className="min-h-calc pt-20">{children}</div>

      {/* footer */}
      <Footer />
    </main>
  );
}
