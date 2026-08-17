"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import { 
  ArrowLeft, 
  CreditCard, 
  ShieldCheck, 
  Lock, 
  Loader2, 
  BookOpen, 
  Sparkles,
  CheckCircle2
} from "lucide-react";

export default function CheckoutPage() {
  const { cartItems, allBooks, cartCount, cartTotal, isMounted } = useCart();
  const [loading, setLoading] = useState(false);

  const fullCartItems = cartItems.map(item => {
    const book = allBooks.find(b => b.id === item.id);
    return { ...book, quantity: item.quantity, id: item.id };
  }).filter(item => item.title);

  if (!isMounted) return null;

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const itemsForStripe = cartItems.map(item => {
        const book = allBooks.find(b => b.id === item.id);
        return { ...book, quantity: item.quantity };
      }).filter(item => item.title);

      if (itemsForStripe.length === 0) {
        alert("Your cart is empty!");
        return;
      }

      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 
        (process.env.NODE_ENV === 'development' ? 'http://localhost:5000/api' : 'https://logbook-snowy-gamma.vercel.app/api');

      const response = await fetch(`${API_BASE_URL}/checkout/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: itemsForStripe }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (error: any) {
      console.error("Checkout failed:", error);
      alert(`Checkout Error: ${error.message || "Payment failed to initialize"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-[#FAF9F6] text-slate-900 font-manrope">
      <Navbar />
      
      <section className="pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-5xl">
          {/* Back link */}
          <Link href="/cart" className="inline-flex items-center text-xs font-manrope font-bold text-slate-500 hover:text-amber-600 transition-colors mb-6 sm:mb-8 uppercase tracking-widest gap-2 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Monolith Cart
          </Link>

          {/* Main Card Container */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-stone-200 shadow-md grid md:grid-cols-12 gap-6 md:gap-8 lg:gap-12 items-start overflow-hidden">
            
            {/* Left: Shipping & Payment Form */}
            <div className="md:col-span-7 space-y-6 sm:space-y-8 w-full min-w-0">
              <div>
                <h2 className="text-lg sm:text-xl font-serif font-bold text-slate-900 mb-4 flex items-center gap-2 border-b border-stone-100 pb-3">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-amber-400 text-xs font-bold font-manrope flex items-center justify-center flex-shrink-0">1</span>
                  Contact & EPUB Delivery Details
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="col-span-1">
                    <label className="block text-xs font-manrope font-bold text-slate-600 mb-1">First Name</label>
                    <input 
                      type="text" 
                      placeholder="Jane"
                      className="w-full min-w-0 bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-manrope text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all font-medium" 
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-xs font-manrope font-bold text-slate-600 mb-1">Last Name</label>
                    <input 
                      type="text" 
                      placeholder="Doe"
                      className="w-full min-w-0 bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-manrope text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all font-medium" 
                    />
                  </div>
                  <div className="col-span-1 sm:col-span-2">
                    <label className="block text-xs font-manrope font-bold text-slate-600 mb-1">Email Address (for EPUB Delivery)</label>
                    <input 
                      type="email" 
                      placeholder="jane.doe@example.com"
                      className="w-full min-w-0 bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-manrope text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all font-medium" 
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg sm:text-xl font-serif font-bold text-slate-900 mb-4 flex items-center gap-2 border-b border-stone-100 pb-3">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-amber-400 text-xs font-bold font-manrope flex items-center justify-center flex-shrink-0">2</span>
                  Payment Gateway
                </h2>
                
                <div className="space-y-3">
                  <div className="bg-amber-50/50 border-2 border-amber-600 p-3.5 sm:p-4 rounded-2xl flex items-center justify-between shadow-xs gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center flex-shrink-0">
                        <CreditCard className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 font-manrope truncate">Stripe Secure Checkout</div>
                        <div className="text-[10px] sm:text-[11px] text-slate-500 truncate font-medium">Credit / Debit Card, Apple Pay</div>
                      </div>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Order Summary Luxury Obsidian Card */}
            <div className="md:col-span-5 w-full min-w-0">
              <div className="bg-slate-950 text-white rounded-3xl p-5 sm:p-6 md:p-8 shadow-2xl border border-slate-800 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <h3 className="font-serif text-xl font-bold flex items-center gap-2 text-white">
                    <Sparkles className="w-5 h-5 text-amber-400" /> Monolith Overview
                  </h3>
                  <span className="text-xs font-manrope font-semibold text-slate-400">
                    {cartCount} {cartCount === 1 ? 'Volume' : 'Volumes'}
                  </span>
                </div>

                {/* Items Thumbnails List */}
                <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                  {fullCartItems.map(item => (
                    <div key={item.id} className="flex items-center gap-3 bg-slate-900 p-2.5 rounded-2xl border border-slate-800">
                      <div className="w-9 aspect-[3/4] bg-slate-950 rounded-lg overflow-hidden flex-shrink-0 border border-slate-800">
                        {item.cover_url ? (
                          <img src={item.cover_url} alt={item.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-500">
                            <BookOpen className="w-3 h-3 text-amber-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-grow min-w-0 text-xs">
                        <div className="font-bold text-slate-200 truncate">{item.title}</div>
                        <div className="text-slate-400 text-[10px] truncate">{item.author}</div>
                      </div>
                      <div className="text-xs font-serif font-bold text-amber-400 whitespace-nowrap px-1">
                        {item.price}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="pt-4 border-t border-slate-800 space-y-2 font-manrope text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Subtotal</span>
                    <span className="font-bold text-white">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Digital Packaging & DRM</span>
                    <span className="text-emerald-400 font-bold uppercase text-[10px]">Complimentary</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-3 border-t border-slate-800">
                    <span className="text-sm font-bold text-white">Total Due</span>
                    <span className="text-3xl font-serif font-bold text-amber-400">${cartTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button 
                  onClick={handleCheckout}
                  disabled={loading || cartItems.length === 0}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 py-4 rounded-full font-manrope font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                      <span>Redirecting to Stripe...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Complete Purchase (${cartTotal.toFixed(2)})</span>
                    </>
                  )}
                </button>

                <div className="pt-2 flex items-center justify-center gap-1.5 text-[10px] font-manrope text-slate-400 uppercase tracking-widest text-center">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>256-Bit SSL Encrypted Checkout</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
