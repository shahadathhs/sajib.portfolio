// * Shared public layout (header, footer, etc.)
import Footer from "@/lib/shared/Footer";
import Navbar from "@/lib/shared/Navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen container mx-auto px-4">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
