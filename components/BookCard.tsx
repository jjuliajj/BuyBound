"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import { ShoppingCart, Check, BookOpen, Star, Sparkles } from "lucide-react";

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
  const numericPrice = parseFloat(formattedPrice.replace(/[^0-9.]/g, "")) || 1.99;
  const listPrice = (numericPrice * 5 + 4.99).toFixed(2);

  return (
    <div className="bg-white border border-slate-200 hover:border-[#0A2647] hover:shadow-lg rounded-xl p-4 transition-all duration-300 font-manrope flex flex-col justify-between h-full group text-left relative">
      
      {/* Top Format / Condition Ribbon */}
      <div className="flex items-center justify-between gap-1 mb-2.5">
        <span className="bg-blue-50 text-[#0A2647] text-[10px] font-bold px-2 py-0.5 rounded border border-blue-200 uppercase tracking-wide">
          EPUB • DRM-Free
        </span>
        <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded truncate max-w-[100px]">
          {category || "Literature"}
        </span>
      </div>

      {/* Book Cover */}
      <div className="flex justify-center mb-3">
        <Link href={`/products/${id}`} className="block relative group/cover overflow-hidden rounded-lg bg-slate-100 border border-slate-200 aspect-[3/4] max-h-56 w-full max-w-[160px] shadow-xs">
          {image ? (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover group-hover/cover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center text-slate-400 bg-slate-100">
              <BookOpen className="w-8 h-8 mb-1.5 opacity-40 text-[#0A2647]" />
              <span className="text-xs font-bold italic line-clamp-2 text-slate-700">{title}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-[#0A2647]/70 opacity-0 group-hover/cover:opacity-100 transition-opacity flex items-end p-2.5">
            <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Quick Look
            </span>
          </div>
        </Link>
      </div>

      {/* Book Meta & Info */}
      <div className="flex-grow flex flex-col justify-between space-y-3">
        <div>
          <Link href={`/products/${id}`}>
            <h3 className="font-serif font-bold text-sm text-slate-900 group-hover:text-[#C92A2A] transition-colors line-clamp-2 leading-snug min-h-[2.25rem]">
              {title}
            </h3>
          </Link>
          <p className="text-xs text-slate-500 italic mt-0.5 truncate">
            by <span className="text-slate-800 not-italic font-medium">{author}</span>
          </p>

          {/* Star Rating & Review Count */}
          <div className="flex items-center gap-1 mt-1.5 text-[11px] text-amber-500">
            <div className="flex items-center">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            </div>
            <span className="text-slate-400 font-semibold text-[10px] ml-1">(4.9)</span>
          </div>
        </div>

        {/* Pricing & Add to Cart Action */}
        <div className="pt-2.5 border-t border-slate-100 space-y-2">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-extrabold text-[#C92A2A] font-mono leading-none">
                {formattedPrice}
              </span>
              <span className="text-[10px] text-slate-400 line-through font-mono">
                ${listPrice}
              </span>
            </div>
            <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
              Save 80%
            </span>
          </div>

          <button
            type="button"
            onClick={handleQuickAdd}
            className={`w-full py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-xs flex items-center justify-center gap-1.5 ${
              added 
                ? "bg-emerald-600 text-white" 
                : "bg-[#C92A2A] hover:bg-[#A61E1E] text-white active:scale-95"
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[2.5]" /> Added to Cart
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
}


