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
    <main className="flex min-h-screen flex-col bg-paper-beige">
      <Navbar />
      
      <section className="pt-32 pb-24">
        <div className="container mx-auto px-6 md:px-12">
          <header className="mb-24 text-center max-w-3xl mx-auto">
            <span className="text-coral font-manrope font-bold text-xs uppercase tracking-[0.2em] mb-4 inline-block">
              Curated Series
            </span>
            <h1 className="text-5xl md:text-6xl font-newsreader font-semibold text-charcoal mb-8">
              The Signature Collections
            </h1>
            <p className="text-lg font-manrope text-charcoal/60 leading-relaxed">
              Explore our hand-picked series, organized by literary movement and thematic resonance. Every collection is a journey.
            </p>
          </header>

          <div className="space-y-32">
            {categories.map((category) => (
              <div key={category}>
                <div className="flex items-baseline justify-between mb-12 border-b border-charcoal/10 pb-6">
                  <h2 className="text-3xl font-newsreader font-medium text-charcoal">
                    {category}
                  </h2>
                  <span className="font-manrope text-sm text-charcoal/40 uppercase tracking-widest">
                    {filteredBooks.filter(b => b.category === category).length} Volumes
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-5 gap-y-8">
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
