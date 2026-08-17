export default function BookCardSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-5 gap-y-8 w-full">
      {Array.from({ length: count }).map((_, i) => (
        <div 
          key={i} 
          className="bg-white/60 backdrop-blur-sm border border-charcoal/10 rounded-2xl p-3 shadow-xs animate-pulse flex flex-col h-full"
        >
          {/* 9:16 Cover Skeleton */}
          <div className="aspect-[9/16] mb-3 bg-charcoal/10 rounded-xl w-full flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
          </div>

          {/* Content Skeleton */}
          <div className="flex flex-col flex-grow justify-between space-y-3">
            <div className="space-y-2">
              <div className="h-3.5 bg-charcoal/10 rounded-md w-4/5" />
              <div className="h-3 bg-charcoal/10 rounded-md w-full" />
              <div className="h-3 bg-charcoal/10 rounded-md w-2/3" />
            </div>

            <div className="pt-2 border-t border-charcoal/10 flex justify-between items-center">
              <div className="h-2.5 bg-charcoal/10 rounded w-1/2" />
              <div className="h-3 bg-coral/20 rounded w-1/4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
