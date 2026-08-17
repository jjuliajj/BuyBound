import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AuthorsLoading() {
  return (
    <main className="flex min-h-screen flex-col bg-paper-beige">
      <Navbar />
      <section className="pt-28 pb-20">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="mb-16 text-center max-w-xl mx-auto space-y-3 animate-pulse">
            <div className="h-3 bg-coral/20 rounded-full w-28 mx-auto" />
            <div className="h-10 bg-charcoal/10 rounded-2xl w-3/4 mx-auto" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white/60 backdrop-blur-sm border border-charcoal/10 rounded-2xl p-4 animate-pulse space-y-3">
                <div className="aspect-square bg-charcoal/10 rounded-xl w-full" />
                <div className="h-4 bg-charcoal/10 rounded w-3/4 mx-auto" />
                <div className="h-3 bg-charcoal/10 rounded w-1/2 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
