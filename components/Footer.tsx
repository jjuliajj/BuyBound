import Link from "next/link";
import { Crown } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-14 pb-10 border-t border-amber-500/30 font-manrope">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <Crown className="w-6 h-6 text-amber-400" />
              <span className="font-serif font-bold text-2xl text-white">Buy<span className="text-amber-400">Bound</span></span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              London High-End Monolith. Luxury artisanal digital bookstore, rare gilded typography, and archival EPUB collections for discerning readers.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-3">Atelier Collections</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/collections" className="hover:text-amber-400 transition-colors">Monolith Vault</Link></li>
              <li><Link href="/genres" className="hover:text-amber-400 transition-colors">Genres & Folios</Link></li>
              <li><Link href="/authors" className="hover:text-amber-400 transition-colors">Master Authors</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-3">Atelier Concierge</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/privacy" className="hover:text-amber-400 transition-colors">Privacy Guarantee</Link></li>
              <li><Link href="/terms" className="hover:text-amber-400 transition-colors">Terms of Binding</Link></li>
              <li><Link href="/contact" className="hover:text-amber-400 transition-colors">Atelier Desk</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-6 text-center text-xs text-slate-500 font-medium">
          © {new Date().getFullYear()} BuyBound Monolith Atelier. All rights reserved. Archival Digital Preservation.
        </div>
      </div>
    </footer>
  );
}
