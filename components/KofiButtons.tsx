import React from "react";

// Official Ko-fi Cup Icon with Heart SVG
export function KofiCupIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <div className="bg-white rounded-md p-1 flex items-center justify-center shadow-xs flex-shrink-0">
      <svg 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        className={`${className} text-[#FF5E5B]`}
      >
        <path d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.797-.679.797s-.094 8.052.094 11.758c.288 5.727 5.093 5.922 5.093 5.922h9.61c4.717 0 5.47-4.472 5.47-4.472l.001-.271s3.702.392 4.159-3.266c.456-3.658-.59-5.875-.59-5.875zm-3.528 5.618s-.255 1.545-2.203 1.545h-.226V8.291h.226c1.948 0 2.203 1.545 2.203 1.545s.314 1.157 0 4.73z" />
        <path d="M11.5 8.5c-1.657 0-3 1.343-3 3 0 2.2 3 4.5 3 4.5s3-2.3 3-4.5c0-1.657-1.343-3-3-3z" fill="#FF5E5B" />
      </svg>
    </div>
  );
}

export function BuyWithKofiButton({ href = "https://ko-fi.com/ebookmarket/shop", className = "" }: { href?: string; className?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 bg-[#FF5E5B] hover:bg-[#ff4340] text-white font-manrope font-bold text-xs sm:text-sm px-4 py-2 rounded-full shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer whitespace-nowrap ${className}`}
    >
      <KofiCupIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      <span>Buy With Ko-fi</span>
    </a>
  );
}

export function SupportKofiButton({ href = "https://ko-fi.com/ebookmarket", className = "" }: { href?: string; className?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 bg-[#FF5E5B] hover:bg-[#ff4340] text-white font-manrope font-bold text-xs sm:text-sm px-4 py-2 rounded-full shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer whitespace-nowrap ${className}`}
    >
      <KofiCupIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      <span>Support me on Ko-fi</span>
    </a>
  );
}
