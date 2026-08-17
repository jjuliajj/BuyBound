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
    <main className="flex min-h-screen flex-col bg-paper-beige">
      <Navbar />
      
      <section className="pt-24 sm:pt-28 pb-16 sm:pb-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-5xl">
          {/* Back link */}
          <Link href="/cart" className="inline-flex items-center text-xs font-manrope font-bold text-charcoal/50 hover:text-coral transition-colors mb-6 sm:mb-8 uppercase tracking-widest gap-2 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Cart
          </Link>

          {/* Main Card Container */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-4 sm:p-6 md:p-10 border border-charcoal/10 shadow-sm grid md:grid-cols-12 gap-6 md:gap-8 lg:gap-12 items-start overflow-hidden">
            
            {/* Left: Shipping & Payment Form */}
            <div className="md:col-span-7 space-y-6 sm:space-y-8 w-full min-w-0">
              <div>
                <h2 className="text-lg sm:text-xl font-newsreader font-bold text-charcoal mb-4 flex items-center gap-2 border-b border-charcoal/10 pb-3">
                  <span className="w-6 h-6 rounded-full bg-coral text-white text-xs font-bold font-manrope flex items-center justify-center flex-shrink-0">1</span>
                  Contact & Delivery Details
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="col-span-1">
                    <label className="block text-xs font-manrope font-bold text-charcoal/60 mb-1">First Name</label>
                    <input 
                      type="text" 
                      placeholder="Jane"
                      className="w-full min-w-0 bg-white border border-charcoal/15 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-manrope text-charcoal focus:outline-none focus:ring-2 focus:ring-coral/20 focus:border-coral transition-all" 
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-xs font-manrope font-bold text-charcoal/60 mb-1">Last Name</label>
                    <input 
                      type="text" 
                      placeholder="Doe"
                      className="w-full min-w-0 bg-white border border-charcoal/15 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-manrope text-charcoal focus:outline-none focus:ring-2 focus:ring-coral/20 focus:border-coral transition-all" 
                    />
                  </div>
                  <div className="col-span-1 sm:col-span-2">
                    <label className="block text-xs font-manrope font-bold text-charcoal/60 mb-1">Email Address (for EPUB Delivery)</label>
                    <input 
                      type="email" 
                      placeholder="jane.doe@example.com"
                      className="w-full min-w-0 bg-white border border-charcoal/15 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-manrope text-charcoal focus:outline-none focus:ring-2 focus:ring-coral/20 focus:border-coral transition-all" 
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg sm:text-xl font-newsreader font-bold text-charcoal mb-4 flex items-center gap-2 border-b border-charcoal/10 pb-3">
                  <span className="w-6 h-6 rounded-full bg-coral text-white text-xs font-bold font-manrope flex items-center justify-center flex-shrink-0">2</span>
                  Payment Gateway
                </h2>
                
                <div className="space-y-3">
                  <div className="bg-white border-2 border-coral p-3.5 sm:p-4 rounded-2xl flex items-center justify-between shadow-xs gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-coral/10 text-coral flex items-center justify-center flex-shrink-0">
                        <CreditCard className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-charcoal font-manrope truncate">Stripe Secure Checkout</div>
                        <div className="text-[10px] sm:text-[11px] text-charcoal/50 truncate">Credit / Debit Card, Apple Pay</div>
                      </div>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-coral flex-shrink-0" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Order Summary Dark Card */}
            <div className="md:col-span-5 w-full min-w-0">
              <div className="bg-gradient-to-br from-charcoal via-slate-900 to-indigo-950 text-paper-beige rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl border border-charcoal/20 space-y-6">
                <div className="flex items-center justify-between border-b border-paper-beige/10 pb-4">
                  <h3 className="font-newsreader text-xl font-bold flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-coral" /> Order Overview
                  </h3>
                  <span className="text-xs font-manrope font-semibold text-paper-beige/40">
                    {cartCount} {cartCount === 1 ? 'Volume' : 'Volumes'}
                  </span>
                </div>

                {/* Items Thumbnails List */}
                <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                  {fullCartItems.map(item => (
                    <div key={item.id} className="flex items-center gap-3 bg-white/5 p-2 rounded-xl border border-white/5">
                      <div className="w-9 aspect-[9/16] bg-charcoal/20 rounded overflow-hidden flex-shrink-0 border border-white/10">
                        {item.cover_url ? (
                          <img src={item.cover_url} alt={item.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-paper-beige/30">
                            <BookOpen className="w-3 h-3" />
                          </div>
                        )}
                      </div>
                      <div className="flex-grow min-w-0 text-xs">
                        <div className="font-bold text-paper-beige truncate">{item.title}</div>
                        <div className="text-paper-beige/40 text-[10px] truncate">{item.author}</div>
                      </div>
                      <div className="text-xs font-bold text-coral whitespace-nowrap px-1">
                        {item.price}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="pt-4 border-t border-paper-beige/10 space-y-2 font-manrope text-xs">
                  <div className="flex justify-between text-paper-beige/70">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-paper-beige/70">
                    <span>Digital Packaging</span>
                    <span className="text-emerald-400 font-bold">Complimentary</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-3 border-t border-paper-beige/10">
                    <span className="text-sm font-bold">Total Due</span>
                    <span className="text-3xl font-bold text-coral">${cartTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button 
                  onClick={handleCheckout}
                  disabled={loading || cartItems.length === 0}
                  className="w-full bg-coral hover:bg-coral/90 text-white py-4 rounded-full font-manrope font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-coral/30 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Redirecting to Stripe...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Complete Purchase (${cartTotal.toFixed(2)})</span>
                    </>
                  )}
                </button>

                <div className="pt-2 flex items-center justify-center gap-1.5 text-[10px] font-manrope text-paper-beige/40 uppercase tracking-widest text-center">
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
