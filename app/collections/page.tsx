import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getBooks } from "@/lib/api";
import BookCard from "@/components/BookCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Special Collections & Digital Archives",
  description: "Browse our complete library catalog of curated EPUB e-books, rare editions, and literature collections.",
};

export default async function CollectionsPage({ searchParams }: { searchParams: Promise<{ genre?: string }> }) {
  const { genre } = await searchParams;
  const books = await getBooks();
  
  const filteredBooks = genre 
    ? books.filter(b => b.category.toLowerCase() === genre.toLowerCase())
    : books;

  const categories = Array.from(new Set(filteredBooks.map((b) => b.category)));

  return (
    <main className="flex min-h-screen flex-col bg-[#FAF9F6] text-slate-900 font-manrope">
      <Navbar />
      
      <section className="pt-28 pb-24">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-7xl space-y-12">
          
          {/* Header Banner */}
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-stone-200 shadow-sm text-left space-y-4">
            <span className="text-amber-700 font-manrope font-bold text-xs uppercase tracking-widest inline-block">
              Curated Monolith Series
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 leading-tight">
              The Signature Vault Collections
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed font-medium">
              Explore our hand-picked series, organized by literary movement and thematic resonance. Every collection is an archival journey.
            </p>
          </div>

          <div className="space-y-16">
            {categories.map((category) => (
              <div key={category} className="space-y-6">
                <div className="flex items-baseline justify-between border-b border-stone-200 pb-4">
                  <h2 className="text-2xl font-serif font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-2.5 h-6 bg-amber-600 rounded-sm block" />
                    {category}
                  </h2>
                  <span className="font-manrope text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 uppercase">
                    {filteredBooks.filter(b => b.category === category).length} Volumes
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredBooks.filter((b) => b.category === category).map((book) => (
                    <BookCard key={book.id} {...book} image={book.cover_url} description={book.description} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
