import BookCard from "./BookCard";
import { getBooks } from "@/lib/api";
import Link from "next/link";
import { Crown, ArrowRight } from "lucide-react";

export default async function FeaturedBooks() {
  const books = await getBooks();

  return (
    <section className="py-16 bg-[#1E2229] text-[#F5F5F7] font-serif">
      <div className="container mx-auto px-4 sm:px-8 md:px-12 max-w-7xl space-y-12">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-[#E5E7EB]/20 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#E5E7EB]/10 text-[#E5E7EB] text-xs font-bold rounded-full border border-[#E5E7EB]/20 uppercase tracking-widest mb-3 font-manrope">
              <Crown className="w-4 h-4 text-[#E5E7EB]" /> London Art Magazine Portfolio
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-[#F5F5F7]">
              Monolith <span className="text-[#E5E7EB] italic font-normal">Folio Tiles</span>
            </h2>
          </div>
          <Link
            href="/collections"
            className="text-xs font-bold font-manrope text-[#E5E7EB] hover:text-white flex items-center gap-2 uppercase tracking-wider transition-colors"
          >
            <span>View All Editions ({books.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 2-Column Oversized Monolith Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {books.map((book) => (
            <BookCard key={book.id} {...book} image={book.cover_url} description={book.description} />
          ))}
        </div>

      </div>
    </section>
  );
}
