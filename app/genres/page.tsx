import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookCard from "@/components/BookCard";
import { getBooks } from "@/lib/api";
import Link from "next/link";
import { BookOpen, Sparkles, Compass, ArrowRight, Layers, Bookmark } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse by Literary Genre",
  description: "Explore curated e-books categorized by philosophy, non-fiction, fiction, poetry, and classic literature.",
};

export default async function GenresPage() {
  const books = await getBooks();

  // Distinct genres with count and sample books
  const genreNames = Array.from(new Set(books.map((b) => b.category).filter(Boolean)));
  
  const genreData = genreNames.map((genre) => {
    const genreBooks = books.filter((b) => b.category === genre);
    return {
      name: genre,
      count: genreBooks.length,
      sampleBooks: genreBooks.slice(0, 3),
    };
  });

  return (
    <main className="flex min-h-screen flex-col bg-paper-beige">
      <Navbar />

      <section className="pt-28 pb-20">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl space-y-12">
          
          {/* Header Card Container */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-charcoal/10 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-coral/10 text-coral text-xs font-bold rounded-full border border-coral/20 uppercase tracking-widest font-manrope">
                <Compass className="w-3.5 h-3.5" /> Literary Landscape
              </div>
              <h1 className="text-4xl md:text-5xl font-newsreader font-bold text-charcoal leading-tight">
                Explore by <span className="text-coral italic font-normal">Genre</span>
              </h1>
              <p className="text-xs md:text-sm font-manrope text-charcoal/60 leading-relaxed">
                From philosophical inquiry to speculative fiction, discover curated literature organized by literary genre and subject matter.
              </p>
            </div>

            {/* Total Genres Badge */}
            <div className="bg-gradient-to-br from-charcoal to-slate-900 text-paper-beige px-6 py-5 rounded-2xl border border-charcoal/20 shadow-md flex items-center gap-4 flex-shrink-0">
              <div className="w-10 h-10 rounded-xl bg-coral/20 text-coral flex items-center justify-center font-bold">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-newsreader font-bold">{genreData.length} Categories</div>
                <div className="text-[10px] font-manrope font-semibold text-paper-beige/40 uppercase tracking-widest">
                  {books.length} Total Volumes
                </div>
              </div>
            </div>
          </div>

          {/* Genre Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {genreData.map((genre) => (
              <Link
                key={genre.name}
                href={`/collections?category=${encodeURIComponent(genre.name)}`}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-charcoal/10 shadow-xs hover:shadow-xl hover:border-coral/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group space-y-6"
              >
                <div className="space-y-4">
                  {/* Genre Header */}
                  <div className="flex justify-between items-center">
                    <div className="w-10 h-10 rounded-2xl bg-coral/10 text-coral flex items-center justify-center border border-coral/20 group-hover:bg-coral group-hover:text-white transition-colors duration-300">
                      <Bookmark className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-manrope font-bold text-charcoal/50 bg-charcoal/5 px-3 py-1 rounded-full border border-charcoal/5">
                      {genre.count} {genre.count === 1 ? 'Volume' : 'Volumes'}
                    </span>
                  </div>

                  <div>
                    <h2 className="font-newsreader text-2xl font-bold text-charcoal group-hover:text-coral transition-colors">
                      {genre.name}
                    </h2>
                    <p className="text-xs font-manrope text-charcoal/50 mt-1">
                      Curated {genre.name.toLowerCase()} works & foundational archives.
                    </p>
                  </div>
                </div>

                {/* Overlapping 9:16 Sample Book Covers */}
                <div className="flex items-center gap-3 pt-2">
                  <div className="flex -space-x-4 overflow-hidden py-1">
                    {genre.sampleBooks.map((book, idx) => (
                      <div
                        key={book.id}
                        className="w-10 aspect-[9/16] bg-charcoal/10 rounded-lg overflow-hidden border-2 border-white shadow-sm flex-shrink-0 transition-transform group-hover:translate-x-1"
                        style={{ zIndex: 10 - idx }}
                      >
                        {book.cover_url ? (
                          <img src={book.cover_url} alt={book.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-charcoal/10">
                            <BookOpen className="w-3 h-3 text-charcoal/30" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <span className="text-xs font-manrope font-bold text-coral group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 ml-auto">
                    <span>Explore Category</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Featured Releases Section with 9:16 BookCards */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-charcoal/10 shadow-sm space-y-6 pt-8">
            <div className="flex items-center justify-between border-b border-charcoal/10 pb-4">
              <div>
                <span className="text-[10px] font-manrope font-bold uppercase tracking-[0.2em] text-coral">
                  Curated Highlights
                </span>
                <h2 className="text-2xl font-newsreader font-bold text-charcoal">
                  Featured Library Releases
                </h2>
              </div>
              <Link
                href="/collections"
                className="text-xs font-manrope font-bold text-charcoal/60 hover:text-coral transition-colors flex items-center gap-1 uppercase tracking-wider"
              >
                <span>View All ({books.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
              {books.slice(0, 6).map((book) => (
                <BookCard
                  key={book.id}
                  id={book.id}
                  title={book.title}
                  author={book.author}
                  price={book.price}
                  image={book.cover_url}
                  category={book.category}
                  description={book.description}
                />
              ))}
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
