import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookCard from "@/components/BookCard";
import { getBooks } from "@/lib/api";
import { getAuthorAvatar } from "@/lib/authorAvatar";
import Link from "next/link";
import { Users, BookOpen, ArrowRight, Sparkles, Award } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Featured Authors & Visionary Creators",
  description: "Meet the brilliant minds, essayists, and thinkers behind our digital e-book library collection.",
};

export default async function AuthorsPage() {
  const books = await getBooks();

  // Unique authors with their respective book lists
  const authorNames = Array.from(new Set(books.map((b) => b.author).filter(Boolean)));
  
  const authorData = authorNames.map((name) => {
    const authorBooks = books.filter((b) => b.author === name);
    // Find primary genre/category of author
    const categories = authorBooks.map(b => b.category).filter(Boolean);
    const mainCategory = categories[0] || "Featured Author";

    return {
      name,
      avatar: getAuthorAvatar(name),
      category: mainCategory,
      count: authorBooks.length,
      books: authorBooks,
    };
  });

  return (
    <main className="flex min-h-screen flex-col bg-[#FAF9F6] text-slate-900 font-manrope">
      <Navbar />

      <section className="pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-8 md:px-12 max-w-7xl space-y-12">
          
          {/* Header Card Container */}
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-stone-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-800 text-xs font-bold rounded-full border border-amber-200 uppercase tracking-widest font-manrope">
                <Users className="w-3.5 h-3.5 text-amber-600" /> Monolith Creators
              </div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">
                Featured <span className="text-amber-600 italic font-normal">Authors</span>
              </h1>
              <p className="text-xs md:text-sm font-manrope text-slate-600 leading-relaxed font-medium">
                Meet the visionary thinkers, researchers, and essayists shaping contemporary thought and literature in our archival digital library.
              </p>
            </div>
          </div>

          {/* Author Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {authorData.map((author) => (
              <div
                key={author.name}
                className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs hover:shadow-xl hover:border-amber-400 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group space-y-6"
              >
                <div className="space-y-5">
                  {/* Author Portrait Frame */}
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden relative border border-stone-200 shadow-sm bg-stone-100">
                    <img
                      src={author.avatar}
                      alt={author.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    
                    <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                      <span className="text-[10px] font-manrope font-bold uppercase tracking-wider text-white/95 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                        {author.category}
                      </span>
                      <span className="text-xs font-manrope font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full shadow-sm border border-amber-200">
                        {author.count} {author.count === 1 ? 'Book' : 'Books'}
                      </span>
                    </div>
                  </div>

                  {/* Author Bio Section */}
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                      {author.name}
                    </h2>
                  </div>

                  {/* Published Titles List */}
                  <div className="pt-3 border-t border-stone-100 space-y-2">
                    <span className="text-[10px] font-manrope font-bold uppercase tracking-widest text-slate-400 block">
                      Works in Vault ({author.count})
                    </span>
                    
                    <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                      {author.books.map((book) => (
                        <Link
                          key={book.id}
                          href={`/products/${book.id}`}
                          className="flex items-center gap-3 p-2 rounded-xl hover:bg-amber-50/60 transition-colors group/book border border-transparent hover:border-amber-200"
                        >
                          <div className="w-7 aspect-[3/4] bg-stone-100 rounded overflow-hidden flex-shrink-0 border border-stone-200">
                            {book.cover_url ? (
                              <img src={book.cover_url} alt={book.title} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <BookOpen className="w-2.5 h-2.5 text-slate-400" />
                              </div>
                            )}
                          </div>
                          <div className="flex-grow min-w-0">
                            <div className="text-xs font-serif font-bold text-slate-900 truncate group-hover/book:text-amber-700 transition-colors">
                              {book.title}
                            </div>
                            <div className="text-[10px] font-manrope text-slate-500 font-semibold">
                              {book.price}
                            </div>
                          </div>
                          <ArrowRight className="w-3 h-3 text-slate-400 group-hover/book:text-amber-600 group-hover/book:translate-x-0.5 transition-all flex-shrink-0" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Explore Author Link */}
                <Link
                  href={`/collections?search=${encodeURIComponent(author.name)}`}
                  className="w-full py-3 bg-slate-900 text-white hover:bg-amber-600 transition-colors rounded-full font-manrope text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 group-hover:shadow-md"
                >
                  <span>Explore Author's Collection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>

          {/* Featured Works Section */}
          <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm space-y-6 pt-8">
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <div>
                <span className="text-[10px] font-manrope font-bold uppercase tracking-[0.2em] text-amber-600">
                  Author Spotlight
                </span>
                <h2 className="text-2xl font-serif font-bold text-slate-900">
                  Recent Library Works
                </h2>
              </div>
              <Link
                href="/collections"
                className="text-xs font-manrope font-bold text-slate-600 hover:text-amber-600 transition-colors flex items-center gap-1 uppercase tracking-wider"
              >
                <span>Browse All ({books.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {books.slice(0, 8).map((book) => (
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
