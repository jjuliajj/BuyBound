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
    <div className="flex flex-col sm:flex-row gap-3 pt-2">
      <button 
        onClick={handleAdd}
        className="bg-charcoal hover:bg-coral text-paper-beige px-8 py-3.5 rounded-full font-manrope font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md flex items-center justify-center space-x-2.5 flex-1"
      >
        {added ? (
          <>
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Added to Cart</span>
          </>
        ) : (
          <>
            <ShoppingBag className="w-4 h-4" />
            <span>Add to Cart</span>
          </>
        )}
      </button>
      
      <button className="border border-charcoal/15 px-6 py-3.5 rounded-full font-manrope font-bold text-charcoal hover:bg-charcoal/5 transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2">
        <Heart className="w-4 h-4 text-coral" />
        <span>Wishlist</span>
      </button>
    </div>
  );
}
