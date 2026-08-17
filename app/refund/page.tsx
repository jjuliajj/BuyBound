import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ShieldCheck, RefreshCw, ArrowLeft, CheckCircle2, AlertCircle, Mail } from "lucide-react";

export default function RefundPage() {
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
              <RefreshCw className="w-6 h-6" />
            </div>
            <h1 className="text-3xl md:text-4xl font-newsreader font-bold text-charcoal">
              Refund & Cancellation Policy
            </h1>
            <p className="text-xs font-manrope font-semibold text-charcoal/50 uppercase tracking-widest">
              7-Day Money-Back Guarantee for Digital Books
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-charcoal/10 shadow-sm space-y-8 font-manrope text-charcoal/80 text-sm leading-relaxed">
            
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-6 text-emerald-950 space-y-2">
              <h3 className="font-newsreader text-lg font-bold flex items-center gap-2 text-emerald-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" /> 100% Customer Satisfaction Guarantee
              </h3>
              <p className="text-xs leading-relaxed text-emerald-900">
                At eBookMarket Library, we stand behind the quality of our archival digital collections. If you experience any issues with your digital book download, we offer a <strong>7-Day Money-Back Guarantee</strong>.
              </p>
            </div>

            <section className="space-y-3">
              <h2 className="text-xl font-newsreader font-bold text-charcoal border-b border-charcoal/10 pb-3">
                1. Eligible Refund Scenarios
              </h2>
              <p>You are eligible for a full, hassle-free refund within <strong>7 days of purchase</strong> if:</p>
              
              <div className="grid md:grid-cols-3 gap-4 pt-2">
                <div className="bg-paper-beige/60 p-4 rounded-2xl border border-charcoal/10 space-y-2">
                  <div className="font-bold text-charcoal text-xs flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-coral" /> File Corruption
                  </div>
                  <p className="text-[11px] text-charcoal/60">
                    The downloaded EPUB/PDF file is corrupted, unreadable, or cannot be opened by standard e-Readers.
                  </p>
                </div>

                <div className="bg-paper-beige/60 p-4 rounded-2xl border border-charcoal/10 space-y-2">
                  <div className="font-bold text-charcoal text-xs flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-coral" /> Content Mismatch
                  </div>
                  <p className="text-[11px] text-charcoal/60">
                    The content inside the file substantially differs from the title and summary listed on the store.
                  </p>
                </div>

                <div className="bg-paper-beige/60 p-4 rounded-2xl border border-charcoal/10 space-y-2">
                  <div className="font-bold text-charcoal text-xs flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-coral" /> Duplicate Purchase
                  </div>
                  <p className="text-[11px] text-charcoal/60">
                    You accidentally completed a duplicate purchase for the exact same eBook volume.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-newsreader font-bold text-charcoal border-b border-charcoal/10 pb-3">
                2. How to Request a Refund
              </h2>
              <p>Requesting a refund is simple and fast. Follow these steps:</p>
              <ol className="list-decimal pl-5 space-y-2 text-xs text-charcoal/80">
                <li>Send an email to <a href="mailto:support@ebookmarket.com" className="text-coral font-bold hover:underline">support@ebookmarket.com</a>.</li>
                <li>Include your <strong>Order Email Address</strong> or <strong>Stripe Transaction ID</strong>.</li>
                <li>Briefly describe the issue (e.g. file error or duplicate order).</li>
              </ol>
              <p className="pt-2 text-xs text-charcoal/60">
                Our support team processes all refund requests within <strong>24 hours</strong>. Once issued, refunds are credited back to your original payment card within 3-5 business days.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-newsreader font-bold text-charcoal border-b border-charcoal/10 pb-3">
                3. Direct Resolution & Support First
              </h2>
              <p className="text-xs leading-relaxed text-charcoal/70">
                We are committed to resolving any order issues promptly. If you encounter any problems with your purchase, please contact our support desk directly at <a href="mailto:support@ebookmarket.com" className="text-coral font-bold hover:underline">support@ebookmarket.com</a> prior to contacting your card issuer. We guarantee a fast and satisfactory resolution.
              </p>
            </section>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
