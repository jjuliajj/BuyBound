"use client";

import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import { Plus, Crown } from "lucide-react";

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  price: string;
  category: string;
  image: string;
  description?: string;
}

export default function BookCard({ id, title, author, price, category, image, description }: BookCardProps) {
  const { addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(id, 1);
  };

  return (
    <Link href={`/products/${id}`} className="group cursor-pointer block h-full">
      <div className="bg-[#1E2229] border-2 border-[#E5E7EB]/20 rounded-3xl p-6 shadow-2xl hover:border-[#E5E7EB] transition-all duration-500 font-manrope space-y-5">
        
        {/* Oversized Art Magazine Portrait Cover */}
        <div className="relative aspect-[3/4] overflow-hidden bg-[#15181D] rounded-2xl border border-[#E5E7EB]/30">
          {image ? (
            <img src={image} alt={title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#E5E7EB] font-serif text-sm px-4 text-center">
              {title}
            </div>
          )}

          <div className="absolute top-4 left-4">
            <span className="bg-[#1E2229]/90 backdrop-blur-md text-[#E5E7EB] border border-[#E5E7EB]/30 px-3.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full">
              {category || "MONOLITH EDITION"}
            </span>
          </div>

          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-6 text-center">
            <button 
              onClick={handleQuickAdd}
              className="bg-[#E5E7EB] text-[#1E2229] px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-white flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Acquire Folio
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-2 text-left">
          <div className="flex justify-between items-baseline gap-2">
            <h3 className="font-serif font-bold text-2xl text-[#F5F5F7] group-hover:text-[#E5E7EB] transition-colors line-clamp-1">
              {title}
            </h3>
            <span className="font-serif font-bold text-lg text-[#E5E7EB] whitespace-nowrap">{price}</span>
          </div>
          
          <p className="text-xs text-[#F5F5F7]/70 italic">by {author}</p>
          
          {description && (
            <p className="text-xs text-[#F5F5F7]/80 line-clamp-2 pt-2 border-t border-[#E5E7EB]/10 leading-relaxed font-light">
              {description}
            </p>
          )}
        </div>

      </div>
    </Link>
  );
}
