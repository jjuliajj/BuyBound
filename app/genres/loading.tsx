import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function GenresLoading() {
  return (
    <main className="flex min-h-screen flex-col bg-paper-beige">
      <Navbar />
      <section className="pt-28 pb-20">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="mb-16 text-center max-w-xl mx-auto space-y-3 animate-pulse">
            <div className="h-3 bg-coral/20 rounded-full w-28 mx-auto" />
            <div className="h-10 bg-charcoal/10 rounded-2xl w-3/4 mx-auto" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white/60 backdrop-blur-sm border border-charcoal/10 rounded-3xl p-6 animate-pulse space-y-4">
                <div className="h-6 bg-charcoal/10 rounded-xl w-1/2" />
                <div className="h-3 bg-charcoal/10 rounded w-full" />
                <div className="h-3 bg-charcoal/10 rounded w-2/3" />
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
