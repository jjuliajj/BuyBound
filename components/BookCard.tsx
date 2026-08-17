"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import { Plus, Check, BookOpen, Crown } from "lucide-react";

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  price: string;
  category: string;
  image?: string;
  description?: string;
}

export default function BookCard({ id, title, author, price, category, image }: BookCardProps) {
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(id, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const formattedPrice = price ? (price.startsWith("$") ? price : `$${price}`) : "$1.99";

  return (
    <div className="bg-white border border-stone-200 hover:border-amber-500/70 rounded-3xl p-5 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 font-manrope flex flex-col justify-between h-full group text-left relative overflow-hidden">
      
      {/* Top Floating Badge */}
      <div className="flex items-center justify-between gap-1 mb-3 z-10">
        <span className="bg-amber-50 text-amber-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-amber-200 flex items-center gap-1 uppercase tracking-wider">
          <Crown className="w-3 h-3 text-amber-600" /> Monolith Folio
        </span>
        <span className="text-[10px] font-bold text-slate-500 bg-stone-100 px-2 py-0.5 rounded-full uppercase border border-stone-200">
          {category || "RARE"}
        </span>
      </div>

      {/* Book Cover Container */}
      <div className="flex justify-center mb-3">
        <Link href={`/products/${id}`} className="block relative group/cover overflow-hidden rounded-2xl bg-stone-100 border border-stone-200 aspect-[3/4] max-h-64 w-full max-w-[190px] shadow-sm">
          {image ? (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover group-hover/cover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center text-slate-400 bg-stone-100">
              <BookOpen className="w-8 h-8 mb-2 opacity-40 text-amber-600" />
              <span className="text-xs font-serif font-bold italic line-clamp-2 text-slate-700">{title}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover/cover:opacity-100 transition-opacity flex items-end p-3">
            <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest flex items-center gap-1">
              View Gilded Edition
            </span>
          </div>
        </Link>
      </div>

      {/* Book Information */}
      <div className="flex-grow flex flex-col justify-between space-y-3">
        <div>
          <Link href={`/products/${id}`}>
            <h3 className="font-serif font-bold text-base text-slate-900 group-hover:text-amber-700 transition-colors line-clamp-2 leading-snug min-h-[2.5rem]">
              {title}
            </h3>
          </Link>
          <p className="text-xs text-slate-500 italic mt-1 truncate">
            by <span className="text-slate-800 not-italic font-semibold">{author}</span>
          </p>
        </div>

        {/* Pricing & 1-Click Acquire Footer */}
        <div className="pt-3 border-t border-stone-100 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-lg font-serif font-bold text-slate-900 leading-none">
              {formattedPrice}
            </span>
            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
              Archival EPUB
            </span>
          </div>

          <button
            type="button"
            onClick={handleQuickAdd}
            className={`w-full py-2.5 px-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-sm flex items-center justify-center gap-1.5 ${
              added 
                ? "bg-emerald-600 text-white" 
                : "bg-slate-900 hover:bg-amber-600 text-white active:scale-95"
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5" /> Acquired
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 text-amber-400" /> Acquire Folio
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
}

