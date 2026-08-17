import Link from "next/link";
import { ArrowRight, Crown, ShieldCheck, Sparkles, BookOpen, Clock, Award, CheckCircle2 } from "lucide-react";

export default function Hero() {
  return (
    <section className="pt-32 sm:pt-36 pb-10 bg-[#F8F9FA] font-manrope">
      <div className="container mx-auto px-4 sm:px-8 md:px-12 max-w-7xl space-y-6">
        
        {/* Alibris-Style Multi-Promo Grid */}
        <div className="grid lg:grid-cols-12 gap-5 items-stretch">
          
          {/* Main Hero Card (8 Cols) */}
          <div className="lg:col-span-8 bg-gradient-to-br from-[#0A2647] via-[#144272] to-[#0A2647] text-white rounded-2xl p-6 sm:p-10 md:p-12 shadow-lg border border-slate-700 flex flex-col justify-between relative overflow-hidden text-left">
            {/* Background Texture Element */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="space-y-4 relative z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-amber-500 text-[#0A2647] text-xs font-black rounded-md uppercase tracking-wider shadow-sm">
                <Crown className="w-4 h-4" /> Alibris Partner Vault Collection
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold leading-tight text-white">
                Find Rare, Archival & <br />
                <span className="text-amber-400">Hard-to-Find Digital Editions</span>
              </h1>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-xl font-medium">
                Connect with thousands of curated independent book collections. Access out-of-print classics, academic treatises, and rare digital folios delivered instantly in DRM-free EPUB.
              </p>
            </div>

            <div className="pt-6 sm:pt-8 flex flex-wrap items-center gap-4 relative z-10">
              <Link 
                href="/collections" 
                className="bg-[#C92A2A] hover:bg-[#A61E1E] text-white px-7 py-3.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2 hover:translate-x-0.5"
              >
                <span>Shop Vault Editions</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link 
                href="/genres" 
                className="bg-white/10 hover:bg-white text-white hover:text-[#0A2647] px-6 py-3.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all border border-white/30 flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>Browse Matrix</span>
              </Link>
            </div>
          </div>

          {/* Right 2 Stacked Promo Tiles (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            
            {/* Promo Card 1: Rare Antiquarian */}
            <Link 
              href="/collections?genre=Philosophy" 
              className="flex-1 bg-white rounded-2xl p-6 border-2 border-amber-500/40 shadow-sm hover:shadow-md hover:border-amber-500 transition-all flex flex-col justify-between group text-left"
            >
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                  Curator's Choice
                </span>
                <h3 className="text-xl font-serif font-bold text-[#0A2647] mt-2 group-hover:text-[#C92A2A] transition-colors">
                  Rare & Antiquarian Folios
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Pristine digital preservation of classic texts, philosophical treatises, and first printings.
                </p>
              </div>

              <div className="pt-4 flex items-center justify-between text-xs font-bold text-[#C92A2A] border-t border-slate-100 mt-4">
                <span>Explore Rare Catalog</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Promo Card 2: Bargain Books */}
            <Link 
              href="/collections?genre=Non-Fiction" 
              className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 text-[#0A2647] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group text-left"
            >
              <div>
                <span className="text-[10px] font-mono font-extrabold uppercase tracking-wider bg-[#0A2647] text-white px-2.5 py-0.5 rounded">
                  Special Value
                </span>
                <h3 className="text-xl font-serif font-bold text-[#0A2647] mt-2">
                  Vault Bargains Under $5
                </h3>
                <p className="text-xs text-[#0A2647]/80 mt-1 font-medium">
                  Thousands of bestselling non-fiction and academic masterworks priced for everyday readers.
                </p>
              </div>

              <div className="pt-4 flex items-center justify-between text-xs font-extrabold text-[#0A2647] border-t border-[#0A2647]/20 mt-4">
                <span>View Daily Deals</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

          </div>

        </div>

        {/* Alibris-Style 4-Pillar Trust Guarantee Strip */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs grid grid-cols-2 md:grid-cols-4 gap-4 text-left font-manrope">
          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#0A2647] flex items-center justify-center flex-shrink-0">
              <Award className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Archival Guarantee</div>
              <div className="text-[11px] text-slate-500">Verified authentic digital text</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Instant Download</div>
              <div className="text-[11px] text-slate-500">DRM-Free EPUB format</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#0A2647] flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5 text-blue-700" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">100% Safe & Secure</div>
              <div className="text-[11px] text-slate-500">256-bit encrypted checkout</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Independent Sellers</div>
              <div className="text-[11px] text-slate-500">Support independent curators</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

