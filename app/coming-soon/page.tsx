"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function ComingSoon() {
  return (
    <main className="flex min-h-screen flex-col bg-[#FAF9F6] text-slate-900 font-manrope">
      <Navbar />
      <section className="pt-48 pb-24 flex-grow flex items-center justify-center">
        <div className="text-center max-w-2xl px-6">
          <span className="text-amber-700 font-manrope font-bold text-xs uppercase tracking-[0.3em] mb-6 inline-block">
            Archival Chapter in Progress
          </span>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-slate-900 mb-8">
            Coming Soon
          </h1>
          <p className="text-lg font-serif text-slate-500 leading-relaxed mb-12 italic">
            "Every great story requires time to be curated." <br/>
            We are meticulously assembling this archival monolith experience.
          </p>
          <Link href="/" className="inline-block border-b-2 border-slate-900 text-slate-900 pb-1.5 font-manrope font-bold hover:text-amber-600 hover:border-amber-600 transition-all uppercase tracking-widest text-xs">
            Return to Monolith Vault
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
