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
    <main className="flex min-h-screen flex-col bg-[#F8F9FA] text-slate-900 font-manrope">
      <Navbar />

      <section className="pt-32 sm:pt-36 pb-20">
        <div className="container mx-auto px-4 sm:px-8 md:px-12 max-w-7xl space-y-10">
          
          {/* Header Card Container */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-left">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-[#0A2647] text-xs font-bold rounded border border-blue-200 uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5 text-[#C92A2A]" /> Marketplace Directory
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#0A2647] leading-tight">
                Shop Books by <span className="text-[#C92A2A]">Subject & Genre</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Browse our comprehensive catalog matrix of curated genres, academic subjects, and rare classic categories.
              </p>
            </div>
          </div>

          {/* Genre Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {genreData.map((genre) => (
              <Link
                key={genre.name}
                href={`/collections?genre=${encodeURIComponent(genre.name)}`}
                className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:shadow-md hover:border-[#0A2647] transition-all flex flex-col justify-between group space-y-5 text-left"
              >
                <div className="space-y-3">
                  {/* Genre Header */}
                  <div className="flex justify-between items-center">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#0A2647] flex items-center justify-center border border-blue-100 group-hover:bg-[#0A2647] group-hover:text-white transition-colors">
                      <Bookmark className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-[#0A2647] bg-slate-100 px-2.5 py-1 rounded">
                      {genre.count} {genre.count === 1 ? 'Volume' : 'Volumes'}
                    </span>
                  </div>

                  <div>
                    <h2 className="font-serif text-xl font-bold text-[#0A2647] group-hover:text-[#C92A2A] transition-colors">
                      {genre.name}
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Curated {genre.name.toLowerCase()} works & verified digital copies.
                    </p>
                  </div>
                </div>

                {/* Overlapping Sample Book Covers */}
                <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                  <div className="flex -space-x-3 overflow-hidden py-1">
                    {genre.sampleBooks.map((book, idx) => (
                      <div
                        key={book.id}
                        className="w-9 aspect-[3/4] bg-slate-100 rounded overflow-hidden border-2 border-white shadow-xs flex-shrink-0"
                        style={{ zIndex: 10 - idx }}
                      >
                        {book.cover_url ? (
                          <img src={book.cover_url} alt={book.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-slate-100">
                            <BookOpen className="w-3 h-3 text-slate-400" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <span className="text-xs font-bold text-[#C92A2A] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 ml-auto">
                    <span>Shop Subject</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Featured Releases Section with 5-Column BookCards */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-6 text-left">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C92A2A]">
                  Marketplace Picks
                </span>
                <h2 className="text-xl font-serif font-bold text-[#0A2647]">
                  Featured Editions in Catalogue
                </h2>
              </div>
              <Link
                href="/collections"
                className="text-xs font-bold text-[#C92A2A] hover:text-[#A61E1E] transition-colors flex items-center gap-1 uppercase tracking-wider"
              >
                <span>View All ({books.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {books.slice(0, 10).map((book) => (
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
