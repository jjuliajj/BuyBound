import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ShieldCheck, Lock, ArrowLeft, Eye, Database, Mail } from "lucide-react";

export default function PrivacyPage() {
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
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center border border-emerald-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-3xl md:text-4xl font-newsreader font-bold text-charcoal">
              Privacy Policy
            </h1>
            <p className="text-xs font-manrope font-semibold text-charcoal/50 uppercase tracking-widest">
              US Standard Data Protection • GDPR & CCPA Compliant
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-charcoal/10 shadow-sm space-y-8 font-manrope text-charcoal/80 text-sm leading-relaxed">
            
            <section className="space-y-3">
              <h2 className="text-xl font-newsreader font-bold text-charcoal flex items-center gap-2 border-b border-charcoal/10 pb-3">
                <Database className="w-5 h-5 text-coral" /> 1. Information We Collect
              </h2>
              <p>
                At <strong>eBookMarket Library</strong>, we collect only the essential personal information required to process your orders and deliver your purchased digital EPUB files:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-charcoal/70">
                <li><strong>Customer Contact Details:</strong> Email address (used strictly for order confirmation and EPUB download link delivery).</li>
                <li><strong>Billing Information:</strong> Name, billing ZIP/Postal code (used for credit card fraud prevention verification).</li>
                <li><strong>Transaction History:</strong> Details of purchased titles, order timestamps, and transaction IDs.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-newsreader font-bold text-charcoal flex items-center gap-2 border-b border-charcoal/10 pb-3">
                <Lock className="w-5 h-5 text-coral" /> 2. Payment Card Security (PCI-DSS Level 1)
              </h2>
              <p>
                We prioritize your financial security. All credit card, debit card, Apple Pay, and Google Pay transactions are encrypted and processed through <strong>Stripe Payment Gateway</strong>. 
              </p>
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs text-emerald-900 font-medium">
                <strong>Zero Card Storage Guarantee:</strong> eBookMarket Library does not store, transmit, or have access to your full credit card numbers. All payment data is tokenized securely via Stripe.
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-newsreader font-bold text-charcoal flex items-center gap-2 border-b border-charcoal/10 pb-3">
                <Eye className="w-5 h-5 text-coral" /> 3. Zero Data Sale Commitment
              </h2>
              <p>
                We maintain a strict zero-spam policy. We <strong>never sell, rent, trade, or share</strong> your email address or personal details with third-party marketers or advertisers under any circumstances.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-newsreader font-bold text-charcoal flex items-center gap-2 border-b border-charcoal/10 pb-3">
                <Mail className="w-5 h-5 text-coral" /> 4. Your Rights (GDPR & CCPA Data Rights)
              </h2>
              <p>
                Under US Privacy laws (CCPA) and European General Data Protection Regulation (GDPR), you have full rights regarding your data:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-charcoal/70">
                <li>Right to request a copy of your stored order history.</li>
                <li>Right to request complete deletion of your account/email records from our system.</li>
              </ul>
              <p className="pt-2">
                To exercise any data privacy rights, simply send an email to <a href="mailto:support@ebookmarket.com" className="text-coral font-bold hover:underline">support@ebookmarket.com</a>.
              </p>
            </section>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
