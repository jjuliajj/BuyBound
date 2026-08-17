import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ShieldCheck, FileText, Lock, ArrowLeft, BookOpen } from "lucide-react";

export default function TermsPage() {
  return (
    <main className="flex min-h-screen flex-col bg-paper-beige">
      <Navbar />

      <section className="pt-28 pb-20">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          {/* Back link */}
          <Link href="/" className="inline-flex items-center text-xs font-manrope font-bold text-charcoal/50 hover:text-coral transition-colors mb-6 uppercase tracking-widest gap-2 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          {/* Header Card */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-charcoal/10 shadow-sm mb-10 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-coral/10 text-coral flex items-center justify-center border border-coral/20">
              <FileText className="w-6 h-6" />
            </div>
            <h1 className="text-3xl md:text-4xl font-newsreader font-bold text-charcoal">
              Terms of Service
            </h1>
            <p className="text-xs font-manrope font-semibold text-charcoal/50 uppercase tracking-widest">
              Last Updated: August 2026 • Digital Rights & Content Agreement
            </p>
          </div>

          {/* Main Terms Content */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-charcoal/10 shadow-sm space-y-8 font-manrope text-charcoal/80 text-sm leading-relaxed">
            
            <section className="space-y-3">
              <h2 className="text-xl font-newsreader font-bold text-charcoal flex items-center gap-2 border-b border-charcoal/10 pb-3">
                <BookOpen className="w-5 h-5 text-coral" /> 1. Digital Copyright & Ownership
              </h2>
              <p>
                All digital books, EPUB files, PDF archives, cover art, and editorial literature available on <strong>eBookMarket Library</strong> are protected by United States and International copyright laws. All titles remain the sole intellectual property of their respective authors and publishers.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-newsreader font-bold text-charcoal flex items-center gap-2 border-b border-charcoal/10 pb-3">
                <Lock className="w-5 h-5 text-coral" /> 2. Personal Non-Transferable License
              </h2>
              <p>
                Upon purchasing an eBook volume from eBookMarket Library, you are granted a single-user, non-exclusive, non-transferable personal license to download, read, and store the digital file on your personal devices (e.g., e-Readers, tablets, mobile devices, and personal computers).
              </p>
              <p className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 font-medium">
                <strong>Restrictions:</strong> You may not copy, share, redistribute, resell, broadcast, torrent, or upload purchased files to any file-sharing network, website, or public directory.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-newsreader font-bold text-charcoal flex items-center gap-2 border-b border-charcoal/10 pb-3">
                <ShieldCheck className="w-5 h-5 text-coral" /> 3. Instant Digital Delivery & Access
              </h2>
              <p>
                Digital purchases are processed instantly via our secure checkout gateway. Access to EPUB and PDF download links is made available immediately after payment confirmation. Download links remain accessible for your personal library retrieval.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-newsreader font-bold text-charcoal flex items-center gap-2 border-b border-charcoal/10 pb-3">
                4. Pricing & Payment Security
              </h2>
              <p>
                All prices are listed in USD ($). Payments are encrypted using 256-bit SSL technology via Stripe. By completing a transaction, you represent that you are authorized to use the chosen payment card or method.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-newsreader font-bold text-charcoal flex items-center gap-2 border-b border-charcoal/10 pb-3">
                5. Questions & Inquiries
              </h2>
              <p>
                If you have questions regarding these Terms of Service or digital licensing agreements, please reach out to our dedicated support team at <a href="mailto:support@ebookmarket.com" className="text-coral font-bold hover:underline">support@ebookmarket.com</a>.
              </p>
            </section>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
