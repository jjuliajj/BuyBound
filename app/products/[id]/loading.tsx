import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ProductLoading() {
  return (
    <main className="flex min-h-screen flex-col bg-paper-beige">
      <Navbar />
      <section className="pt-28 pb-20">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          {/* Back link skeleton */}
          <div className="h-4 bg-charcoal/10 rounded w-32 mb-8 animate-pulse" />

          {/* Glassmorphism Product Card Skeleton */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 md:p-10 border border-charcoal/10 shadow-sm grid md:grid-cols-12 gap-8 lg:gap-12 items-start animate-pulse">
            
            {/* Left 9:16 Cover Skeleton */}
            <div className="md:col-span-5 flex justify-center">
              <div className="aspect-[9/16] w-full max-w-[300px] bg-charcoal/10 rounded-2xl" />
            </div>

            {/* Right Meta Info Skeleton */}
            <div className="md:col-span-7 space-y-6">
              <div className="space-y-3">
                <div className="h-4 bg-coral/20 rounded-full w-24" />
                <div className="h-8 bg-charcoal/10 rounded-2xl w-4/5" />
                <div className="h-4 bg-charcoal/10 rounded-lg w-1/3" />
              </div>

              <div className="h-10 bg-charcoal/10 rounded-xl w-1/2" />

              <div className="h-24 bg-paper-beige/60 rounded-2xl border border-charcoal/5" />

              <div className="flex gap-3">
                <div className="h-12 bg-charcoal/10 rounded-full flex-1" />
                <div className="h-12 bg-charcoal/10 rounded-full w-28" />
              </div>
            </div>

          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
