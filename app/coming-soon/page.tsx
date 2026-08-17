"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function ComingSoon() {
  return (
    <main className="flex min-h-screen flex-col bg-paper-beige">
      <Navbar />
      <section className="pt-48 pb-24 flex-grow flex items-center justify-center">
        <div className="text-center max-w-2xl px-6">
          <span className="text-coral font-manrope font-bold text-xs uppercase tracking-[0.3em] mb-8 inline-block">
            Chapter in Progress
          </span>
          <h1 className="text-6xl md:text-7xl font-newsreader font-semibold text-charcoal mb-12 italic">
            Coming Soon
          </h1>
          <p className="text-xl font-newsreader text-charcoal/40 leading-relaxed mb-16 italic">
            "Every great story requires time to be written." <br/>
            We are meticulously curating this experience. Please check back shortly.
          </p>
          <Link href="/" className="inline-block border-b border-charcoal text-charcoal pb-2 font-manrope font-bold hover:text-coral hover:border-coral transition-all uppercase tracking-widest text-sm">
            Return to Library
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
