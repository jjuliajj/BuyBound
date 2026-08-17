import Link from "next/link";
import { ArrowRight, Crown, Bookmark, ShieldCheck } from "lucide-react";

export default function Hero() {
  return (
    <section className="pt-32 pb-20 bg-[#FAF8F5] border-b-2 border-[#D4AF37]/30 font-serif">
      <div className="container mx-auto px-4 sm:px-8 md:px-12 max-w-7xl">
        
        {/* Double Gold Foil Framed Banner Container */}
        <div className="bg-[#0A192F] text-[#FAF8F5] rounded-3xl p-8 sm:p-14 border-4 border-[#D4AF37] shadow-2xl relative overflow-hidden grid lg:grid-cols-12 gap-10 items-center">
          
          {/* Decorative Corner Flourishes */}
          <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37]" />
          <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#D4AF37]" />
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#D4AF37]" />
          <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37]" />

          {/* Left Content Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold rounded-full border border-[#D4AF37]/40 uppercase tracking-widest">
              <Crown className="w-4 h-4 text-[#D4AF37]" /> Collector's Vault & Gold Artisanal Atelier
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold leading-[1.1] text-white">
              Curated Rare & <br />
              <span className="text-[#D4AF37] italic font-normal">Gilded Digital Editions</span>
            </h1>

            <p className="text-sm sm:text-base text-[#FAF8F5]/80 leading-relaxed max-w-xl font-manrope">
              Experience digital reading elevated to artisanal mastery. Hand-curated literature presented in regal typography, leather aesthetics, and gold foil bindings.
            </p>

            <div className="flex flex-wrap gap-4 pt-2 font-manrope">
              <Link 
                href="/collections" 
                className="bg-[#D4AF37] hover:bg-[#b59226] text-[#0A192F] px-9 py-4 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center gap-2.5 hover:scale-105"
              >
                <span>Enter The Vault</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link 
                href="/about" 
                className="bg-white/10 hover:bg-white text-white hover:text-[#0A192F] px-8 py-4 rounded-full border border-[#D4AF37]/40 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
              >
                <Bookmark className="w-4 h-4 text-[#D4AF37]" />
                <span>Atelier Heritage</span>
              </Link>
            </div>
          </div>

          {/* Right Side: 3D Leather Book Cover Showcase with Ribbon Bookmark */}
          <div className="lg:col-span-5 relative flex justify-center py-4">
            <div className="relative w-64 aspect-[9/14] bg-gradient-to-b from-[#6B1724] via-[#4A101A] to-[#0A192F] rounded-2xl border-4 border-[#D4AF37] shadow-2xl p-6 flex flex-col justify-between text-center transform hover:scale-105 transition-transform duration-500">
              
              {/* Hanging Red Ribbon Bookmark */}
              <div className="absolute -top-3 right-6 w-5 h-20 bg-[#6B1724] border-x border-b border-[#D4AF37] shadow-md z-30" />

              <span className="text-[9px] uppercase font-bold tracking-widest text-[#D4AF37] bg-[#D4AF37]/20 px-3 py-1 rounded-full border border-[#D4AF37]/40 w-max mx-auto">
                WAX SEAL EDITION
              </span>

              <div className="my-auto space-y-3 py-4">
                <Crown className="w-12 h-12 mx-auto text-[#D4AF37]" />
                <h3 className="text-xl font-serif font-bold text-white">Artisanal Bindings</h3>
                <p className="text-xs text-[#FAF8F5]/70 font-manrope">Archival preservation & gilded EPUB typography.</p>
              </div>

              <div className="pt-3 border-t border-[#D4AF37]/30 text-xs font-bold text-[#D4AF37] uppercase tracking-widest">
                Collector Grade
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
