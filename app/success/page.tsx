"use client";

import { useEffect, useState, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import { useSearchParams } from "next/navigation";

function SuccessContent() {
  const { cartItems, removeFromCart } = useCart();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [purchasedBooks, setPurchasedBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Clear the cart after successful purchase
    if (cartItems.length > 0) {
      cartItems.forEach(item => removeFromCart(item.id));
    }

    if (sessionId) {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://logbook-snowy-gamma.vercel.app/api';
      fetch(`${API_BASE_URL}/checkout/session/${sessionId}`)
        .then(res => res.json())
        .then(data => {
          if (data.books) {
            setPurchasedBooks(data.books);
          }
        })
        .catch(err => console.error("Error fetching session:", err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [sessionId]);

  return (
    <section className="pt-48 pb-24 flex-grow flex items-center justify-center">
      <div className="text-center max-w-2xl px-6 w-full">
        <div className="w-24 h-24 bg-coral/10 rounded-full flex items-center justify-center mx-auto mb-12">
          <svg className="w-10 h-10 text-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h1 className="text-5xl font-newsreader font-semibold text-charcoal mb-8">
          Order Confirmed
        </h1>
        <p className="text-lg font-manrope text-charcoal/60 leading-relaxed mb-12 italic">
          Thank you for your purchase. Your literary treasures are ready for download.
        </p>

        {loading ? (
          <div className="mb-12">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-4 bg-charcoal/10 w-48 mb-4 rounded"></div>
              <div className="h-4 bg-charcoal/10 w-32 rounded"></div>
            </div>
          </div>
        ) : purchasedBooks.length > 0 ? (
          <div className="mb-16 space-y-6">
            <h2 className="font-newsreader text-2xl text-charcoal mb-6 border-b border-charcoal/10 pb-4">Your Digital Library</h2>
            {purchasedBooks.map(book => (
              <div key={book.id} className="flex items-center justify-between bg-white p-6 rounded-lg shadow-ambient border border-charcoal/5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-16 bg-charcoal/5 rounded overflow-hidden">
                    {book.cover_url && <img src={book.cover_url} alt={book.title} className="w-full h-full object-cover" />}
                  </div>
                  <div className="text-left">
                    <h3 className="font-newsreader text-lg text-charcoal font-bold">{book.title}</h3>
                    <p className="text-xs font-manrope text-charcoal/40 uppercase tracking-widest">Digital Edition</p>
                  </div>
                </div>
                <a 
                  href={book.file_url} 
                  download 
                  target="_blank"
                  className="bg-coral text-white px-6 py-3 rounded-full font-manrope font-bold text-xs uppercase tracking-widest hover:bg-coral/80 transition-all"
                >
                  Download File
                </a>
              </div>
            ))}
          </div>
        ) : null}

        <Link href="/" className="inline-block bg-charcoal text-paper-beige px-12 py-5 rounded-sm font-manrope font-bold hover:bg-charcoal/90 transition-all shadow-ambient uppercase tracking-widest text-sm">
          Return to Collection
        </Link>
      </div>
    </section>
  );
}

export default function SuccessPage() {
  return (
    <main className="flex min-h-screen flex-col bg-paper-beige">
      <Navbar />
      <Suspense fallback={<div className="pt-48 text-center font-manrope">Loading receipt...</div>}>
        <SuccessContent />
      </Suspense>
      <Footer />
    </main>
  );
}
