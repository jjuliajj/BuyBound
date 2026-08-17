import BookCardSkeleton from "@/components/BookCardSkeleton";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CollectionsLoading() {
  return (
    <main className="flex min-h-screen flex-col bg-paper-beige">
      <Navbar />
      <section className="pt-28 pb-20">
        <div className="container mx-auto px-6 md:px-12">
          {/* Header Skeleton */}
          <div className="mb-16 text-center max-w-2xl mx-auto space-y-3 animate-pulse">
            <div className="h-3 bg-coral/20 rounded-full w-32 mx-auto" />
            <div className="h-10 bg-charcoal/10 rounded-2xl w-3/4 mx-auto" />
            <div className="h-4 bg-charcoal/10 rounded-xl w-full mx-auto" />
          </div>

          <BookCardSkeleton count={12} />
        </div>
      </section>
      <Footer />
    </main>
  );
}
