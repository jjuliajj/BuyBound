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
    <main className="flex min-h-screen flex-col bg-[#FBF9F5] text-[#0A192F]">
      <Navbar />
      
      <section className="pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-5xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <Link href="/collections" className="inline-flex items-center text-xs font-bold text-[#D4AF37] hover:text-[#0A192F] transition-colors mb-2 uppercase tracking-widest gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Rare Vaults
              </Link>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#0A192F] flex items-center gap-3">
                <Crown className="w-8 h-8 text-[#D4AF37]" />
                Atelier Vault Cart
              </h1>
            </div>
            <span className="text-xs font-bold text-[#D4AF37] bg-[#0A192F] px-4 py-2 rounded-full border border-[#D4AF37]/40 w-fit">
              {fullCartItems.length} {fullCartItems.length === 1 ? 'Gilded Folio' : 'Gilded Folios'}
            </span>
          </div>

          {fullCartItems.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border-2 border-[#D4AF37]/40 shadow-xl max-w-lg mx-auto my-8">
              <div className="w-16 h-16 bg-[#0A192F] text-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-[#D4AF37]">
                <Crown className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#0A192F] mb-2">Vault Cart is Empty</h3>
              <p className="text-xs text-[#0A192F]/70 mb-6 font-medium">Explore rare digital bindings, gold foil manuscripts, and artisanal literature.</p>
              <Link 
                href="/collections" 
                className="inline-flex items-center gap-2 bg-[#0A192F] hover:bg-[#D4AF37] text-white hover:text-[#0A192F] px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all border border-[#D4AF37] shadow-lg"
              >
                <span>Browse Atelier Vault</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              
              <div className="lg:col-span-7 space-y-4">
                {fullCartItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="bg-white rounded-2xl p-4 border-2 border-[#D4AF37]/30 shadow-md hover:border-[#D4AF37] transition-all flex gap-4 items-center"
                  >
                    <Link href={`/products/${item.id}`} className="w-16 md:w-20 aspect-[9/16] bg-[#0A192F] rounded-xl overflow-hidden flex-shrink-0 border-2 border-[#D4AF37]/40 block">
                      {item.cover_url ? (
                        <img src={item.cover_url} alt={item.title} className="object-cover w-full h-full" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#D4AF37] text-[9px] font-serif">
                          {item.title}
                        </div>
                      )}
                    </Link>

                    <div className="flex-grow min-w-0 space-y-1.5">
                      <div className="flex justify-between items-start gap-2">
                        <Link href={`/products/${item.id}`} className="font-serif text-base md:text-lg font-bold text-[#0A192F] hover:text-[#D4AF37] transition-colors line-clamp-1">
                          {item.title}
                        </Link>
                        <span className="font-bold text-[#D4AF37] text-sm whitespace-nowrap">
                          {item.price && item.price.startsWith('$') ? item.price : `$${item.price || '0.00'}`}
                        </span>
                      </div>

                      <p className="text-xs text-[#0A192F]/70 italic">by {item.author}</p>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center space-x-3 bg-[#FBF9F5] border border-[#D4AF37]/40 rounded-full px-3 py-1">
                          <button className="text-[#0A192F]/70 hover:text-[#D4AF37]" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-[#0A192F] w-4 text-center">{item.quantity}</span>
                          <button className="text-[#0A192F]/70 hover:text-[#D4AF37]" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button className="text-rose-600 hover:bg-rose-50 p-2 rounded-lg transition-all" onClick={() => removeFromCart(item.id)}>
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary - High Contrast Royal Gold Box */}
              <div className="lg:col-span-5">
                <div className="bg-[#0A192F] text-white rounded-3xl p-6 md:p-8 shadow-2xl border-2 border-[#D4AF37] space-y-6 sticky top-28">
                  <div className="flex items-center justify-between border-b border-[#D4AF37]/30 pb-4">
                    <h2 className="font-serif text-xl font-bold flex items-center gap-2 text-white">
                      <Crown className="w-5 h-5 text-[#D4AF37]" /> Vault Order Summary
                    </h2>
                    <span className="text-xs font-bold text-[#D4AF37] bg-[#D4AF37]/20 px-3 py-1 rounded-full uppercase border border-[#D4AF37]/30">Gilded EPUB</span>
                  </div>

                  <div className="space-y-3 text-xs text-white">
                    <div className="flex justify-between text-white/90">
                      <span>Subtotal ({fullCartItems.length} items)</span>
                      <span className="font-bold text-white text-sm">${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-white/90">
                      <span>Digital Atelier Delivery</span>
                      <span className="text-[#D4AF37] font-bold uppercase text-[10px]">Instant Private Access</span>
                    </div>
                    <div className="flex justify-between text-white/90">
                      <span>Atelier Tax</span>
                      <span className="font-bold text-white">$0.00</span>
                    </div>

                    <div className="flex justify-between items-baseline pt-4 border-t border-[#D4AF37]/30">
                      <span className="text-base font-bold text-white">Total Amount</span>
                      <span className="text-3xl font-black text-[#D4AF37]">${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <Link 
                    href="/checkout" 
                    className="w-full bg-[#D4AF37] hover:bg-white text-[#0A192F] py-4 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-xl flex items-center justify-center gap-2 group"
                  >
                    <span>Proceed to Vault Checkout</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <div className="pt-2 border-t border-[#D4AF37]/20 flex items-center justify-center gap-2 text-[10px] text-white/80 uppercase text-center">
                    <ShieldCheck className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                    <span>Guaranteed Private Digital Ownership</span>
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
