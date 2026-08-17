import BookCardSkeleton from "@/components/BookCardSkeleton";

export default function GlobalLoading() {
  return (
    <div className="min-h-screen bg-paper-beige flex flex-col pt-28 pb-20 px-6 md:px-12">
      {/* Brand Loading Indicator Banner */}
      <div className="max-w-5xl mx-auto w-full mb-12 flex flex-col items-center justify-center text-center">
        <div className="relative mb-4">
          <div className="w-14 h-14 rounded-2xl bg-white p-1 shadow-lg border border-charcoal/10 flex items-center justify-center animate-pulse">
            <img src="/logo.png" alt="eBookMarket Logo" className="w-full h-full object-cover rounded-xl" />
          </div>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-coral rounded-full animate-ping" />
        </div>
        <h2 className="text-xl font-newsreader font-bold text-charcoal mb-1">
          eBookMarket <span className="text-coral italic font-normal">Library</span>
        </h2>
        <p className="text-xs font-manrope font-semibold text-charcoal/40 uppercase tracking-widest mb-4">
          Fetching digital archives...
        </p>

        {/* Shimmering Coral Progress Bar */}
        <div className="w-48 h-1 bg-charcoal/10 rounded-full overflow-hidden relative">
          <div className="absolute inset-y-0 bg-coral rounded-full animate-[loading-bar_1.2s_ease-in-out_infinite]" />
        </div>
      </div>

      {/* Grid Skeleton Preview */}
      <div className="max-w-7xl mx-auto w-full">
        <BookCardSkeleton count={12} />
      </div>
    </div>
  );
}
