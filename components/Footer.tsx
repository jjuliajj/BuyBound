import Link from "next/link";
import { Crown, Mail, ShieldCheck, Lock, CreditCard, Award, ArrowRight } from "lucide-react";


export default function Footer() {
  return (
    <footer className="bg-[#0A2647] text-slate-300 pt-12 pb-8 border-t-4 border-[#C92A2A] font-manrope">
      <div className="container mx-auto px-4 sm:px-8 md:px-12 max-w-7xl space-y-10">
        
        {/* Top Newsletter & Deals Bar */}
        <div className="bg-[#05192D] rounded-xl p-6 border border-slate-700 flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <Mail className="w-5 h-5 text-amber-400" />
              <span>Get Rare Book Alerts & Exclusive Marketplace Deals</span>
            </div>
            <p className="text-xs text-slate-400">
              Sign up for curated weekly releases, author spotlights, and collector discounts.
            </p>
          </div>

          <div className="flex items-center w-full md:w-auto max-w-md gap-2">
            <input
              type="email"
              placeholder="Enter your email address..."
              className="bg-white text-slate-900 px-4 py-2.5 rounded-lg text-xs font-medium focus:outline-none w-full shadow-inner"
            />
            <button className="bg-[#C92A2A] hover:bg-[#A61E1E] text-white px-5 py-2.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors shadow-sm">
              Subscribe
            </button>
          </div>
        </div>

        {/* 4 Marketplace Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-8 border-b border-slate-700 text-left">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-amber-500 text-[#0A2647] flex items-center justify-center font-bold">
                <Crown className="w-5 h-5" />
              </div>
              <span className="font-serif font-bold text-xl text-white">Buy<span className="text-amber-400">Bound</span></span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              The premier online marketplace for independent digital book collectors, rare folios, and DRM-free classics.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-400 pt-1 font-bold">
              <Award className="w-4 h-4" />
              <span>Alibris Independent Partner</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3.5 border-b border-slate-700 pb-1.5">
              Explore Marketplace
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><Link href="/collections" className="hover:text-amber-400 transition-colors">All Vault Books</Link></li>
              <li><Link href="/genres" className="hover:text-amber-400 transition-colors">Category Matrix</Link></li>
              <li><Link href="/authors" className="hover:text-amber-400 transition-colors">Author Directory</Link></li>
              <li><Link href="/about" className="hover:text-amber-400 transition-colors">About BuyBound</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3.5 border-b border-slate-700 pb-1.5">
              Customer Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><Link href="/privacy" className="hover:text-amber-400 transition-colors">Privacy & Data Guarantee</Link></li>
              <li><Link href="/terms" className="hover:text-amber-400 transition-colors">Terms of Use</Link></li>
              <li><Link href="/refund" className="hover:text-amber-400 transition-colors">Digital Return Policy</Link></li>
              <li><Link href="/contact" className="hover:text-amber-400 transition-colors">Help & Contact Desk</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3.5 border-b border-slate-700 pb-1.5">
              Guaranteed Security
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              All transactions are secured with 256-bit SSL encryption via Stripe Gateway.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold bg-slate-900/60 p-2.5 rounded-lg border border-slate-700">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
              <span>Verified Safe Checkout</span>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Payment Badges */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} BuyBound Inc. Alibris Partner Network. All rights reserved.
          </div>
          <div className="flex items-center gap-3 text-slate-300 text-xs">
            <span className="bg-slate-800 px-2.5 py-1 rounded text-[10px] font-bold">Stripe</span>
            <span className="bg-slate-800 px-2.5 py-1 rounded text-[10px] font-bold">Visa / MC</span>
            <span className="bg-slate-800 px-2.5 py-1 rounded text-[10px] font-bold">Apple Pay</span>
            <span className="bg-slate-800 px-2.5 py-1 rounded text-[10px] font-bold">DRM-Free EPUB</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

