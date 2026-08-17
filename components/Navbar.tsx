"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/CartContext";
import { getBooks, Book } from "@/lib/api";
import { 
  Search, 
  X, 
  Loader2, 
  Menu, 
  ShoppingBag, 
  Crown, 
  Sparkles, 
  ShieldCheck, 
  ChevronDown, 
  BookOpen, 
  Tag 
} from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount, cartTotal, isMounted } = useCart();
  const pathname = usePathname();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isLoadingBooks, setIsLoadingBooks] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleSearchFocus = async () => {
    setIsSearchFocused(true);
    if (allBooks.length === 0 && !isLoadingBooks) {
      setIsLoadingBooks(true);
      try {
        const books = await getBooks();
        setAllBooks(books);
      } catch (err) {
        console.error("Failed to load search index:", err);
      } finally {
        setIsLoadingBooks(false);
      }
    }
  };

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const query = searchQuery.toLowerCase().trim();
    const matches = allBooks.filter(
      (b) =>
        (selectedCategory === "All" || (b.category && b.category.toLowerCase().includes(selectedCategory.toLowerCase()))) &&
        (b.title.toLowerCase().includes(query) ||
         b.author.toLowerCase().includes(query) ||
         (b.category && b.category.toLowerCase().includes(query)))
    ).slice(0, 6);
    setSearchResults(matches);
  }, [searchQuery, selectedCategory, allBooks]);

  const categories = [
    { label: "All Vault Books", href: "/collections" },
    { label: "Rare & Collectible", href: "/collections?genre=Philosophy" },
    { label: "Bestsellers", href: "/collections?genre=Non-Fiction" },
    { label: "Genres Matrix", href: "/genres" },
    { label: "Master Authors", href: "/authors" },
    { label: "Atelier Heritage", href: "/about" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 shadow-md">
      {/* Top Announcement Ribbon */}
      <div className="bg-[#05192D] text-slate-200 text-[11px] font-medium py-1.5 px-4 text-center border-b border-white/10 hidden sm:flex items-center justify-between">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span><strong>Guaranteed Authentic Editions</strong> — Direct From Verified Independent Curators & Digital Ateliers</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-[10px] text-slate-300">
          <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-emerald-400" /> 256-Bit SSL Encrypted</span>
          <span>•</span>
          <span>Instant EPUB & DRM-Free Delivery</span>
        </div>
      </div>

      {/* Main Alibris-Style Header Bar (Deep Royal Navy) */}
      <div className="bg-[#0A2647] text-white px-4 sm:px-8 md:px-12 py-3.5 flex items-center justify-between gap-4 sm:gap-8">
        
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
          <div className="w-10 h-10 rounded-lg bg-amber-500 text-[#0A2647] flex items-center justify-center font-bold shadow-md group-hover:bg-amber-400 transition-colors">
            <Crown className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-serif font-bold tracking-tight text-white leading-none">
              Buy<span className="text-amber-400">Bound</span>
            </span>
            <span className="text-[9px] font-mono tracking-widest text-slate-300 uppercase font-semibold">
              ALIBRIS PARTNER VAULT
            </span>
          </div>
        </Link>

        {/* Alibris-Style Omnibox Search Bar */}
        <div className="relative flex-grow max-w-2xl hidden md:block" ref={searchRef}>
          <div className="flex items-center rounded-lg overflow-hidden bg-white shadow-inner border-2 border-amber-500/80 focus-within:border-amber-400">
            {/* Category Dropdown Pill */}
            <div className="relative bg-slate-100 border-r border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 flex items-center gap-1 cursor-pointer hover:bg-slate-200 transition-colors flex-shrink-0">
              <span>{selectedCategory}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              <select
                aria-label="Filter search by category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              >
                <option value="All">All Categories</option>
                <option value="Fiction">Fiction</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Philosophy">Philosophy</option>
                <option value="Classics">Classics</option>
              </select>
            </div>

            {/* Search Input */}
            <input
              type="text"
              placeholder="Search by title, author, category, or ISBN..."
              value={searchQuery}
              onFocus={handleSearchFocus}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 text-xs text-slate-900 focus:outline-none placeholder:text-slate-400 font-medium"
            />

            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="p-1.5 text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Crimson Search Submit Button */}
            <button 
              type="button"
              className="bg-[#C92A2A] hover:bg-[#A61E1E] text-white px-5 py-2.5 font-bold text-xs flex items-center gap-1.5 transition-colors flex-shrink-0"
            >
              <Search className="w-4 h-4" />
              <span className="hidden lg:inline">Find Books</span>
            </button>
          </div>

          {/* Live Search Suggestion Popup */}
          {isSearchFocused && (searchQuery.trim() !== "" || isLoadingBooks) && (
            <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-2xl overflow-hidden z-50 p-2 text-slate-900">
              {isLoadingBooks ? (
                <div className="p-4 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-[#C92A2A]" /> Querying vault catalogue...
                </div>
              ) : searchResults.length > 0 ? (
                <div className="space-y-1">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#0A2647] bg-slate-50 rounded flex justify-between">
                    <span>Vault Matches ({searchResults.length})</span>
                    <span className="text-slate-500">Press item to view</span>
                  </div>
                  {searchResults.map((book) => (
                    <Link
                      key={book.id}
                      href={`/products/${book.id}`}
                      onClick={() => {
                        setIsSearchFocused(false);
                        setSearchQuery("");
                      }}
                      className="flex items-center gap-3 p-2 hover:bg-amber-50 rounded-lg transition-colors group"
                    >
                      <div className="w-9 h-12 bg-slate-100 rounded overflow-hidden flex-shrink-0 border border-slate-200">
                        {book.cover_url && <img src={book.cover_url} alt={book.title} className="w-full h-full object-cover" />}
                      </div>
                      <div className="flex-grow min-w-0">
                        <div className="text-xs font-serif font-bold text-slate-900 truncate group-hover:text-[#C92A2A]">
                          {book.title}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate">by {book.author} • <span className="font-semibold text-amber-700">{book.category}</span></div>
                      </div>
                      <div className="text-xs font-bold text-[#C92A2A] font-mono whitespace-nowrap">
                        {book.price || "$1.99"}
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-xs text-slate-500">No matching editions found in catalogue.</div>
              )}
            </div>
          )}
        </div>

        {/* Header Right Actions & Cart */}
        <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
          <Link
            href="/cart"
            className="bg-amber-500 hover:bg-amber-400 text-[#0A2647] px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-2.5 transition-all shadow-md active:scale-95"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
              {isMounted && cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#C92A2A] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <div className="flex flex-col text-left leading-tight hidden sm:flex">
              <span className="text-[9px] uppercase tracking-wider text-[#0A2647]/80 font-bold">Shopping Cart</span>
              <span className="font-extrabold text-xs">
                {isMounted ? `$${cartTotal.toFixed(2)}` : "$0.00"}
              </span>
            </div>
          </Link>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white hover:text-amber-400 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Tier 2: Category Navigation Strip */}
      <nav className="bg-white border-b border-slate-200 px-4 sm:px-8 md:px-12 py-2 flex items-center justify-between text-xs font-bold text-slate-700">
        <div className="hidden md:flex items-center gap-6 lg:gap-8 overflow-x-auto py-0.5">
          {categories.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`hover:text-[#C92A2A] transition-colors py-1 flex items-center gap-1.5 whitespace-nowrap ${
                pathname === item.href.split('?')[0] ? "text-[#0A2647] font-black border-b-2 border-[#C92A2A]" : ""
              }`}
            >
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4 text-[11px] text-slate-500 font-semibold">
          <Link href="/collections" className="hover:text-[#C92A2A] flex items-center gap-1">
            <Tag className="w-3 h-3 text-[#C92A2A]" />
            <span>Digital Vault Bargains (Under $5)</span>
          </Link>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b-2 border-[#0A2647] p-4 shadow-xl space-y-4">
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Search books, authors, ISBN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
            {categories.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="p-2 bg-slate-50 rounded-lg text-xs font-bold text-slate-800 hover:bg-amber-50 hover:text-[#C92A2A]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

