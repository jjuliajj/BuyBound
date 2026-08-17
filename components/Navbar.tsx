"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/CartContext";
import { getBooks, Book } from "@/lib/api";
import { Search, X, Loader2, Menu, ShoppingBag, Crown } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount, cartTotal, isMounted } = useCart();
  const pathname = usePathname();

  const [searchQuery, setSearchQuery] = useState("");
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isLoadingBooks, setIsLoadingBooks] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        b.title.toLowerCase().includes(query) ||
        b.author.toLowerCase().includes(query) ||
        (b.category && b.category.toLowerCase().includes(query))
    ).slice(0, 6);
    setSearchResults(matches);
  }, [searchQuery, allBooks]);

  const navItems = [
    { label: "Monolith Vault", href: "/collections" },
    { label: "Editions", href: "/genres" },
    { label: "Master Authors", href: "/authors" },
    { label: "Atelier Info", href: "/about" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-8 md:px-12 py-4 flex justify-between items-center ${
        isScrolled || isMobileMenuOpen ? "bg-[#FAF9F6]/95 backdrop-blur-md border-b border-stone-200 shadow-sm" : "bg-[#FAF9F6]/80 backdrop-blur-xs"
      }`}
    >
      {/* Brand Logo & Name - London High-End Monolith */}
      <Link href="/" className="flex items-center gap-3 group">
        <div className="w-10 h-10 rounded-full bg-slate-900 text-amber-400 p-2 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
          <Crown className="w-5 h-5" />
        </div>
        <div className="flex flex-col font-serif">
          <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 leading-none">
            Buy<span className="text-amber-600 italic font-normal">Bound</span>
          </span>
          <span className="text-[9px] font-manrope font-bold tracking-widest text-slate-500 uppercase mt-0.5">London High-End Monolith</span>
        </div>
      </Link>

      {/* Header Search Bar */}
      <div className="relative hidden lg:block w-72 xl:w-96" ref={searchRef}>
        <div className="relative flex items-center font-manrope">
          <Search className="absolute left-3.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search luxury editions, folios..."
            value={searchQuery}
            onFocus={handleSearchFocus}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-9 py-2 text-xs bg-white text-slate-900 rounded-full border border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all placeholder:text-slate-400 font-semibold shadow-xs"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-3 p-1 text-slate-400 hover:text-slate-700">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Live Search Results */}
        {isSearchFocused && (searchQuery.trim() !== "" || isLoadingBooks) && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-stone-200 rounded-2xl shadow-xl overflow-hidden z-50 p-2 font-manrope">
            {isLoadingBooks ? (
              <div className="p-4 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-amber-600" /> Searching monolith...
              </div>
            ) : searchResults.length > 0 ? (
              <div className="space-y-1">
                <div className="px-3 py-1.5 text-[10px] font-serif font-bold uppercase tracking-widest text-amber-700">
                  Monolith Folios ({searchResults.length})
                </div>
                {searchResults.map((book) => (
                  <Link
                    key={book.id}
                    href={`/products/${book.id}`}
                    onClick={() => {
                      setIsSearchFocused(false);
                      setSearchQuery("");
                    }}
                    className="flex items-center gap-3 p-2 hover:bg-amber-50/70 rounded-xl transition-colors group"
                  >
                    <div className="w-9 h-12 bg-stone-100 rounded overflow-hidden flex-shrink-0 border border-stone-200">
                      {book.cover_url && <img src={book.cover_url} alt={book.title} className="w-full h-full object-cover" />}
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="text-xs font-serif font-bold text-slate-900 truncate group-hover:text-amber-700">
                        {book.title}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">by {book.author}</div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-xs text-slate-400">No monolith editions found.</div>
            )}
          </div>
        )}
      </div>

      {/* Nav Links & Commercial Cart */}
      <div className="flex items-center gap-4 sm:gap-6 font-manrope">
        <div className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-700 uppercase tracking-wider">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`hover:text-amber-600 transition-colors py-1 ${
                pathname === item.href ? "text-amber-600 border-b-2 border-amber-600" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <Link
          href="/cart"
          className="bg-slate-900 hover:bg-amber-600 text-white p-2.5 sm:px-4 sm:py-2.5 rounded-full font-bold text-xs flex items-center gap-2 transition-all duration-300 shadow-md hover:scale-105"
        >
          <ShoppingBag className="w-4 h-4 text-amber-400" />
          <span className="hidden sm:inline">Monolith Cart</span>
          {isMounted && (
            <span className="bg-white/20 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
              ${cartTotal.toFixed(2)} ({cartCount})
            </span>
          )}
        </Link>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-slate-900"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
    </nav>
  );
}
