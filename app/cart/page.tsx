"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowLeft, 
  ShieldCheck, 
  Crown,
  ArrowRight
} from "lucide-react";

export default function CartPage() {
  const { cartItems, allBooks, updateQuantity, removeFromCart, cartTotal, isMounted } = useCart();

  const fullCartItems = cartItems.map(item => {
    const book = allBooks.find(b => b.id === item.id);
    return { ...book, quantity: item.quantity, id: item.id };
  }).filter(item => item.title);

  if (!isMounted) return null;

  return (
    <main className="flex min-h-screen flex-col bg-[#F8F9FA] text-slate-900 font-manrope">
      <Navbar />
      
      <section className="pt-32 sm:pt-36 pb-20">
        <div className="container mx-auto px-4 sm:px-8 md:px-12 max-w-5xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 text-left">
            <div>
              <Link href="/collections" className="inline-flex items-center text-xs font-bold text-slate-500 hover:text-[#C92A2A] transition-colors mb-2 uppercase tracking-wider gap-2">
                <ArrowLeft className="w-4 h-4" />
                Continue Browsing Catalog
              </Link>
              <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#0A2647] flex items-center gap-2.5">
                <ShoppingBag className="w-7 h-7 text-[#C92A2A]" />
                Marketplace Shopping Cart
              </h1>
            </div>
            <span className="text-xs font-bold text-[#0A2647] bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-xs w-fit">
              {fullCartItems.length} {fullCartItems.length === 1 ? 'Volume Selected' : 'Volumes Selected'}
            </span>
          </div>

          {fullCartItems.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-xs max-w-lg mx-auto my-8">
              <div className="w-16 h-16 bg-blue-50 text-[#0A2647] rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-100">
                <ShoppingBag className="w-8 h-8 text-[#C92A2A]" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#0A2647] mb-2">Your Shopping Cart is Empty</h3>
              <p className="text-xs text-slate-500 mb-6 font-medium">Explore millions of rare, out-of-print, and discounted digital editions.</p>
              <Link 
                href="/collections" 
                className="inline-flex items-center gap-2 bg-[#C92A2A] hover:bg-[#A61E1E] text-white px-8 py-3.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
              >
                <span>Browse Marketplace Vault</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              
              <div className="lg:col-span-7 space-y-4 text-left">
                {fullCartItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex gap-4 items-center"
                  >
                    <Link href={`/products/${item.id}`} className="w-16 aspect-[3/4] bg-slate-100 rounded-lg overflow-hidden flex-shrink-0 border border-slate-200 block">
                      {item.cover_url ? (
                        <img src={item.cover_url} alt={item.title} className="object-cover w-full h-full" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400 text-[9px]">
                          {item.title}
                        </div>
                      )}
                    </Link>

                    <div className="flex-grow min-w-0 space-y-1">
                      <div className="flex justify-between items-start gap-2">
                        <Link href={`/products/${item.id}`} className="font-serif text-sm font-bold text-[#0A2647] hover:text-[#C92A2A] transition-colors line-clamp-1">
                          {item.title}
                        </Link>
                        <span className="font-bold text-[#C92A2A] text-sm whitespace-nowrap font-mono">
                          {item.price && item.price.startsWith('$') ? item.price : `$${item.price || '1.99'}`}
                        </span>
                      </div>

                      <p className="text-xs text-slate-500 italic">by {item.author}</p>
                      <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold uppercase inline-block">
                        Instant EPUB Delivery
                      </span>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center space-x-3 bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-0.5">
                          <button className="text-slate-500 hover:text-slate-900" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-slate-800 w-4 text-center">{item.quantity}</span>
                          <button className="text-slate-500 hover:text-slate-900" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button className="text-rose-600 hover:bg-rose-50 p-1.5 rounded transition-all flex items-center gap-1 text-xs font-medium" onClick={() => removeFromCart(item.id)}>
                          <Trash2 className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary - Alibris Navy Box */}
              <div className="lg:col-span-5 text-left">
                <div className="bg-[#0A2647] text-white rounded-2xl p-6 md:p-8 shadow-lg border border-slate-700 space-y-6 sticky top-36">
                  <div className="flex items-center justify-between border-b border-slate-700 pb-4">
                    <h2 className="font-serif text-lg font-bold flex items-center gap-2 text-white">
                      <ShieldCheck className="w-5 h-5 text-amber-400" /> Order Summary
                    </h2>
                    <span className="text-xs font-bold text-amber-400 bg-white/10 px-2.5 py-0.5 rounded uppercase">Verified</span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span>Items Subtotal ({fullCartItems.length})</span>
                      <span className="font-bold text-white text-sm font-mono">${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Digital Shipping & EPUB DRM</span>
                      <span className="text-emerald-400 font-bold uppercase text-[10px]">Free Digital Delivery</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Estimated Sales Tax</span>
                      <span className="font-bold text-white font-mono">$0.00</span>
                    </div>

                    <div className="flex justify-between items-baseline pt-4 border-t border-slate-700">
                      <span className="text-sm font-bold text-white">Total Order Due</span>
                      <span className="text-2xl font-bold text-amber-400 font-mono">${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <Link 
                    href="/checkout" 
                    className="w-full bg-[#C92A2A] hover:bg-[#A61E1E] text-white py-3.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md flex items-center justify-center gap-2 group"
                  >
                    <span>Proceed to Secure Checkout</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <div className="pt-2 border-t border-slate-700 flex items-center justify-center gap-1.5 text-[10px] text-slate-400 uppercase text-center">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>256-Bit SSL Secured by Stripe</span>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
