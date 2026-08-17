import BookCard from "./BookCard";
import { getBooks } from "@/lib/api";
import Link from "next/link";
import { Crown, ArrowRight } from "lucide-react";

export default async function FeaturedBooks() {
  const books = await getBooks();

  return (
    <section className="py-16 bg-[#FAF9F6] text-slate-900 font-serif">
      <div className="container mx-auto px-4 sm:px-8 md:px-12 max-w-7xl space-y-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-stone-200 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-amber-50 text-amber-800 text-xs font-bold rounded-full border border-amber-200 uppercase tracking-widest mb-3 font-manrope">
              <Crown className="w-4 h-4 text-amber-600" /> London Art Magazine Portfolio
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900">
              Monolith <span className="text-amber-600 italic font-normal">Folio Editions</span>
            </h2>
          </div>
          <Link
            href="/collections"
            className="text-xs font-bold font-manrope text-slate-700 hover:text-amber-600 flex items-center gap-2 uppercase tracking-wider transition-colors"
          >
            <span>View All Editions ({books.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4-Column Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard key={book.id} {...book} image={book.cover_url} description={book.description} />
          ))}
        </div>

      </div>
    </section>
  );
}
