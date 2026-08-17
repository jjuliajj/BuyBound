"use client";

import { useCart } from "@/lib/CartContext";
import { useState } from "react";
import { ShoppingBag, Heart, Check } from "lucide-react";

export default function AddToCartActions({ bookId }: { bookId: string }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(bookId);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 pt-2 font-manrope">
      <button 
        onClick={handleAdd}
        className="bg-[#C92A2A] hover:bg-[#A61E1E] text-white px-8 py-3.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md flex items-center justify-center space-x-2.5 flex-1"
      >
        {added ? (
          <>
            <Check className="w-4 h-4 text-emerald-300 stroke-[2.5]" />
            <span>Added to Cart</span>
          </>
        ) : (
          <>
            <ShoppingBag className="w-4 h-4" />
            <span>Add to Cart (Instant EPUB)</span>
          </>
        )}
      </button>
      
      <button className="border border-slate-300 px-6 py-3.5 rounded-lg font-bold text-slate-700 hover:bg-slate-50 transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2">
        <Heart className="w-4 h-4 text-[#C92A2A]" />
        <span>Save to Wishlist</span>
      </button>
    </div>
  );
}
