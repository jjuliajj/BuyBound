import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getBooks } from "@/lib/api";
import BookCard from "@/components/BookCard";
import Link from "next/link";
import { Filter, ChevronRight, CheckCircle2, SlidersHorizontal, Tag, Sparkles } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse All Marketplace Editions | BuyBound Alibris Vault",
  description: "Browse our complete catalog of curated digital books, rare folios, and DRM-free EPUB editions from independent bookstore curators.",
};

export default async function CollectionsPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ genre?: string; category?: string; search?: string }> 
}) {
  const resolvedParams = await searchParams;
  const targetCategory = resolvedParams.category || resolvedParams.genre;
  const targetSearch = resolvedParams.search;
  const books = await getBooks();
  
  let filteredBooks = books;

  if (targetCategory) {
    filteredBooks = filteredBooks.filter(b => 
      b.category && b.category.toLowerCase() === targetCategory.toLowerCase()
    );
  }

  if (targetSearch) {
    const s = targetSearch.toLowerCase();
    filteredBooks = filteredBooks.filter(b => 
      b.title.toLowerCase().includes(s) || 
      b.author.toLowerCase().includes(s)
    );
  }

  const categories = Array.from(new Set(books.map((b) => b.category).filter(Boolean)));
  const genre = targetCategory;


  return (
    <main className="flex min-h-screen flex-col bg-[#F8F9FA] text-slate-900 font-manrope">
      <Navbar />
      
      <section className="pt-32 sm:pt-36 pb-20">
        <div className="container mx-auto px-4 sm:px-8 md:px-12 max-w-7xl space-y-6">
          
          {/* Alibris-Style Breadcrumbs */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <Link href="/" className="hover:text-[#C92A2A]">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/collections" className="hover:text-[#C92A2A]">Marketplace Vault</Link>
            {genre && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-[#0A2647] font-bold">{genre}</span>
              </>
            )}
          </nav>

          {/* Marketplace Layout Grid: Left Sidebar + Right Grid */}
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Filter Sidebar (3 Cols) */}
            <aside className="lg:col-span-3 space-y-5">
              
              {/* Category Filter Box */}
              <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4 text-left">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-xs font-bold text-[#0A2647] uppercase tracking-wider flex items-center gap-2">
                    <Filter className="w-4 h-4 text-[#C92A2A]" /> Categories
                  </h3>
                  {genre && (
                    <Link href="/collections" className="text-[10px] font-bold text-[#C92A2A] hover:underline">
                      Reset
                    </Link>
                  )}
                </div>

                <div className="space-y-1.5 text-xs">
                  <Link
                    href="/collections"
                    className={`flex items-center justify-between p-2 rounded-lg transition-colors ${
                      !genre ? "bg-amber-50 text-[#0A2647] font-bold border border-amber-200" : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span>All Marketplace Categories</span>
                    <span className="text-[10px] text-slate-400">({books.length})</span>
                  </Link>

                  {categories.map((cat) => {
                    const count = books.filter(b => b.category === cat).length;
                    const isSelected = genre?.toLowerCase() === cat.toLowerCase();
                    return (
                      <Link
                        key={cat}
                        href={`/collections?genre=${encodeURIComponent(cat)}`}
                        className={`flex items-center justify-between p-2 rounded-lg transition-colors ${
                          isSelected ? "bg-amber-50 text-[#0A2647] font-bold border border-amber-200" : "text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <span className="truncate">{cat}</span>
                        <span className="text-[10px] text-slate-400 font-mono">({count})</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Format & Trust Sidebar Box */}
              <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4 text-left">
                <h3 className="text-xs font-bold text-[#0A2647] uppercase tracking-wider border-b border-slate-100 pb-3">
                  Format & Delivery
                </h3>
                <div className="space-y-2 text-xs text-slate-600">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-[#C92A2A] focus:ring-[#C92A2A]" />
                    <span>DRM-Free EPUB (All Devices)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-[#C92A2A] focus:ring-[#C92A2A]" />
                    <span>Instant Digital Delivery</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-[#C92A2A] focus:ring-[#C92A2A]" />
                    <span>Verified Archival Text</span>
                  </label>
                </div>
              </div>

              {/* Independent Curator Badge */}
              <div className="bg-blue-50/70 rounded-xl p-4 border border-blue-200 text-left space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#0A2647]">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Alibris Independent Network</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Every title is verified by independent specialists for complete chapters, high-resolution formatting, and clean metadata.
                </p>
              </div>

            </aside>

            {/* Right Product Grid (9 Cols) */}
            <main className="lg:col-span-9 space-y-6">
              
              {/* Results Top Bar */}
              <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <h1 className="text-lg font-serif font-bold text-[#0A2647]">
                    {genre ? `${genre} Editions` : "Complete Marketplace Vault Catalog"}
                  </h1>
                  <p className="text-xs text-slate-500 font-medium">
                    Showing <strong>{filteredBooks.length}</strong> matching titles
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                  <span>Sort by:</span>
                  <select 
                    aria-label="Sort books catalog"
                    className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-[#C92A2A]"
                  >
                    <option>Curator's Top Recommendations</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Title: A to Z</option>
                  </select>
                </div>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                {filteredBooks.map((book) => (
                  <BookCard key={book.id} {...book} image={book.cover_url} description={book.description} />
                ))}
              </div>

            </main>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

