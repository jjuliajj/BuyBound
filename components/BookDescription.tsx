"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Sparkles } from "lucide-react";

function decodeHtmlEntities(text: string): string {
  if (!text) return "";
  return text
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => {
      try { return String.fromCharCode(parseInt(hex, 16)); } catch { return _; }
    })
    .replace(/&#([0-9]+);/g, (_, dec) => {
      try { return String.fromCharCode(parseInt(dec, 10)); } catch { return _; }
    })
    .replace(/&rsquo;/gi, "'")
    .replace(/&lsquo;/gi, "'")
    .replace(/&rdquo;/gi, '"')
    .replace(/&ldquo;/gi, '"')
    .replace(/&mdash;/gi, '—')
    .replace(/&ndash;/gi, '–')
    .replace(/&hellip;/gi, '…')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&nbsp;/gi, ' ');
}

export default function BookDescription({ description }: { description: string }) {
  const [isExpanded, setIsExpanded] = useState(false);

  let cleanText = decodeHtmlEntities(description || "");
  
  // Strip duplicate leading headers e.g. "Introduction Introduction"
  cleanText = cleanText
    .replace(/^(\s*introduction\s*)+/gi, '')
    .replace(/^(\s*preface\s*)+/gi, '')
    .replace(/^(\s*foreword\s*)+/gi, '')
    .trim();

  if (!cleanText) {
    cleanText = "An essential volume curated for discerning readers.";
  }

  const isLong = cleanText.length > 250;

  return (
    <div className="space-y-2">
      <h3 className="text-xs font-manrope font-bold uppercase tracking-widest text-charcoal/40 flex items-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-coral" /> Summary & Details
      </h3>
      <div className="bg-paper-beige/40 p-4 rounded-2xl border border-charcoal/5 transition-all duration-300">
        <div 
          className={`text-xs md:text-sm font-manrope text-charcoal/80 leading-relaxed whitespace-pre-line ${
            !isExpanded && isLong ? "line-clamp-4" : ""
          }`}
        >
          {cleanText}
        </div>

        {isLong && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-3 text-xs font-manrope font-bold text-coral hover:text-charcoal transition-colors inline-flex items-center gap-1 focus:outline-none bg-coral/10 hover:bg-coral/20 px-3.5 py-1.5 rounded-full"
          >
            {isExpanded ? (
              <>
                <span>Collapse Summary</span>
                <ChevronUp className="w-3.5 h-3.5" />
              </>
            ) : (
              <>
                <span>Read Full Introduction</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
