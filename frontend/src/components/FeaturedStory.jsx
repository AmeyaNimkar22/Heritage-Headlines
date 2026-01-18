import React from "react";
import fallbackImage from "../assets/fallback.jpg";

/**
 * FeaturedStory Component - BrightCode Studio
 * Enhanced with:
 * - Premium Glassmorphism & Shadows
 * - Dynamic Hover Zoom on Image
 * - Dark Mode Support
 * - Custom Pure CSS Animations
 */
export default function FeaturedStory({ article }) {
  if (!article) return null;

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 animate-fade-in">
      <div className="group relative grid md:grid-cols-2 gap-0 items-center bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 transition-all duration-500 hover:border-emerald-500/30">
        
        {/* Image Container with Zoom */}
        <div className="relative h-[400px] md:h-[500px] overflow-hidden ">
          <img
            src={article.image}
            alt={article.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110 rounded w-6/7"
            onError={(e) => {
              e.target.src = fallbackImage;
            }}
          />
          {/* Subtle Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          
          {/* Floating Badge (Mobile/Desktop) */}
          <div className="absolute top-6 left-6 md:hidden">
            <span className="px-4 py-1.5 text-[10px] font-black tracking-widest text-white bg-emerald-600 rounded-full shadow-lg">
              FEATURED
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 md:p-14 lg:p-20 relative">
          {/* Desktop Badge */}
          <div className="hidden md:block mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-[10px] font-black tracking-[0.2em] text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 rounded-full border border-emerald-100 dark:border-emerald-800/50">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              {article.source || "Heritage Headlines"}
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black leading-[1.1] mb-6 text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
            {article.title}
          </h2>

          <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl mb-8 line-clamp-4 leading-relaxed font-medium">
            {article.description || "Uncovering the depths of global heritage through digital preservation and analytical storytelling."}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-8 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 font-bold text-xs border border-slate-200 dark:border-slate-700">
                {article.source.charAt(0) || "H"}
              </div>
              <span className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {article.source || "Heritage Headlines"}
              </span>
            </div>

            <a
              href={article.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-2xl hover:bg-emerald-600 dark:hover:bg-emerald-500 dark:hover:text-white transition-all hover:scale-105 active:scale-95 shadow-xl shadow-slate-900/10 dark:shadow-none"
            >
              Explore Full Story
              <span className="ml-2 text-xl transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}} />
    </section>
  );
}