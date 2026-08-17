import Link from "next/link";
import { Crown } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0A192F] text-[#FAF8F5] pt-14 pb-10 border-t-2 border-[#D4AF37]">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#D4AF37]/30">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <Crown className="w-6 h-6 text-[#D4AF37]" />
              <span className="font-serif font-bold text-2xl text-white">Buy<span className="text-[#D4AF37]">Bound</span></span>
            </div>
            <p className="text-xs text-[#FAF8F5]/70 leading-relaxed max-w-md">
              Luxury artisanal digital bookstore. Rare leather-bound styling, gilded typography, and archival EPUB collections.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-3">Atelier Collections</h4>
            <ul className="space-y-1.5 text-xs text-[#FAF8F5]/80">
              <li><Link href="/collections" className="hover:text-[#D4AF37]">Rare Vaults</Link></li>
              <li><Link href="/genres" className="hover:text-[#D4AF37]">Genres & Folios</Link></li>
              <li><Link href="/authors" className="hover:text-[#D4AF37]">Master Authors</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-3">Atelier Concierge</h4>
            <ul className="space-y-1.5 text-xs text-[#FAF8F5]/80">
              <li><Link href="/privacy" className="hover:text-[#D4AF37]">Privacy Guarantee</Link></li>
              <li><Link href="/terms" className="hover:text-[#D4AF37]">Terms of Binding</Link></li>
              <li><Link href="/contact" className="hover:text-[#D4AF37]">Atelier Desk</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-6 text-center text-xs text-[#D4AF37]">
          © {new Date().getFullYear()} BuyBound Atelier. All rights reserved. Gilded Digital Preservation.
        </div>
      </div>
    </footer>
  );
}
