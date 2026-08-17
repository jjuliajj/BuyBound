import BookCard from "./BookCard";
import { getBooks } from "@/lib/api";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";


export default async function FeaturedBooks() {
  const books = await getBooks();

  return (
    <section className="py-12 bg-[#F8F9FA] font-manrope border-t border-slate-200">
      <div className="container mx-auto px-4 sm:px-8 md:px-12 max-w-7xl space-y-8">
        
        {/* Alibris-Style Shelf Header */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-5 bg-[#C92A2A] rounded-xs block" />
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0A2647]">
                Featured Marketplace Releases
              </h2>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Hand-curated rare and popular digital editions from our verified bookstore network ({books.length} Available)
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/collections"
              className="text-xs font-bold text-[#C92A2A] hover:text-[#A61E1E] flex items-center gap-1.5 uppercase tracking-wider transition-colors bg-red-50 hover:bg-red-100 px-3.5 py-2 rounded-lg border border-red-200"
            >
              <span>Explore All {books.length} Books</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 4-5 Column Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {books.map((book) => (
            <BookCard key={book.id} {...book} image={book.cover_url} description={book.description} />
          ))}
        </div>

        {/* Bottom Discover Banner */}
        <div className="bg-gradient-to-r from-[#0A2647] to-[#144272] text-white rounded-2xl p-8 sm:p-10 shadow-md flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-400 text-[#0A2647] text-[10px] font-black uppercase rounded tracking-wider">
              <Sparkles className="w-3 h-3" /> Special Collection
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Looking for a Specific Rare or Out-of-Print Edition?
            </h3>
            <p className="text-xs text-slate-200 max-w-xl font-medium">
              Browse our complete category directory or search by author to find verified digital masterworks.
            </p>
          </div>

          <Link
            href="/genres"
            className="bg-white hover:bg-slate-100 text-[#0A2647] font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-lg transition-all shadow-md flex items-center gap-2 flex-shrink-0"
          >
            <span>Open Category Matrix</span>
            <ArrowRight className="w-4 h-4 text-[#C92A2A]" />
          </Link>
        </div>

      </div>
    </section>
  );
}

