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
    <main className="flex min-h-screen flex-col bg-[#F8F9FA] text-slate-900 font-manrope">
      <Navbar />

      <section className="pt-32 sm:pt-36 pb-20">
        <div className="container mx-auto px-4 sm:px-8 md:px-12 max-w-7xl space-y-10">
          
          {/* Header Card Container */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-left">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-[#0A2647] text-xs font-bold rounded border border-blue-200 uppercase tracking-wider font-manrope">
                <Users className="w-3.5 h-3.5 text-[#C92A2A]" /> Marketplace Author Directory
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#0A2647] leading-tight">
                Featured <span className="text-[#C92A2A]">Authors & Creators</span>
              </h1>
              <p className="text-xs sm:text-sm font-manrope text-slate-600 leading-relaxed font-medium">
                Meet the influential authors, philosophers, and essayists available across our independent marketplace catalog.
              </p>
            </div>
          </div>

          {/* Author Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {authorData.map((author) => (
              <div
                key={author.name}
                className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:shadow-md hover:border-[#0A2647] transition-all flex flex-col justify-between group space-y-5 text-left"
              >
                <div className="space-y-4">
                  {/* Author Portrait Frame */}
                  <div className="aspect-[4/3] rounded-lg overflow-hidden relative border border-slate-200 shadow-xs bg-slate-100">
                    <img
                      src={author.avatar}
                      alt={author.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex justify-between items-end">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-black/60 px-2.5 py-0.5 rounded">
                        {author.category}
                      </span>
                      <span className="text-xs font-bold text-[#0A2647] bg-white px-2 py-0.5 rounded shadow-xs">
                        {author.count} {author.count === 1 ? 'Book' : 'Books'}
                      </span>
                    </div>
                  </div>

                  {/* Author Bio Section */}
                  <div>
                    <h2 className="font-serif text-xl font-bold text-[#0A2647] group-hover:text-[#C92A2A] transition-colors">
                      {author.name}
                    </h2>
                  </div>

                  {/* Published Titles List */}
                  <div className="pt-2.5 border-t border-slate-100 space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
                      Marketplace Titles ({author.count})
                    </span>
                    
                    <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                      {author.books.map((book) => (
                        <Link
                          key={book.id}
                          href={`/products/${book.id}`}
                          className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-amber-50 transition-colors group/book border border-transparent hover:border-amber-200"
                        >
                          <div className="w-6 aspect-[3/4] bg-slate-100 rounded overflow-hidden flex-shrink-0 border border-slate-200">
                            {book.cover_url ? (
                              <img src={book.cover_url} alt={book.title} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <BookOpen className="w-2.5 h-2.5 text-slate-400" />
                              </div>
                            )}
                          </div>
                          <div className="flex-grow min-w-0">
                            <div className="text-xs font-serif font-bold text-slate-900 truncate group-hover/book:text-[#C92A2A] transition-colors">
                              {book.title}
                            </div>
                            <div className="text-[10px] text-slate-500 font-semibold font-mono">
                              {book.price || "$1.99"}
                            </div>
                          </div>
                          <ArrowRight className="w-3 h-3 text-slate-400 group-hover/book:text-[#C92A2A] group-hover/book:translate-x-0.5 transition-all flex-shrink-0" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Explore Author Link */}
                <Link
                  href={`/collections?search=${encodeURIComponent(author.name)}`}
                  className="w-full py-2.5 bg-[#0A2647] text-white hover:bg-[#C92A2A] transition-colors rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <span>Explore Author Catalog</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>

          {/* Featured Works Section with 5-Column Grid */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-6 text-left">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C92A2A]">
                  Author Spotlight
                </span>
                <h2 className="text-xl font-serif font-bold text-[#0A2647]">
                  Recent Catalogue Additions
                </h2>
              </div>
              <Link
                href="/collections"
                className="text-xs font-bold text-[#C92A2A] hover:text-[#A61E1E] transition-colors flex items-center gap-1 uppercase tracking-wider"
              >
                <span>Browse All ({books.length})</span>
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
