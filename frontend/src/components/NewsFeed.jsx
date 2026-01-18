import React, { useEffect, useState } from "react";
import axios from "axios";
import FeaturedStory from "./FeaturedStory";
import NewsSkeleton from "./NewsSkeleton";
import fallbackImage from "../assets/fallback.jpg";

/**
 * NewsFeed Component - BrightCode Studio
 * Optimized with:
 * - Hover scale effects (zoom)
 * - Dark mode compatibility
 * - Modern Tailwind UI patterns
 * - Pure CSS transitions (No external animation libraries)
 */
export default function NewsFeed() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/news");
        if (Array.isArray(res.data)) {
          setArticles(res.data);
        } else {
          setArticles([]);
        }
      } catch (err) {
        console.error("Failed to fetch heritage news", err);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading) {
    return <NewsSkeleton />;
  }

  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Featured Section */}
      <section className="animate-in fade-in duration-700">
        <FeaturedStory article={featured} />
      </section>

      {/* Grid Section */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <header className="flex items-center gap-4 mb-12">
          <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Latest Updates
          </h3>
          <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800"></div>
        </header>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((a, i) => (
            <article
              key={i}
              className="group relative flex flex-col bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image Container with Zoom Effect */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={a.image || fallbackImage}
                  alt={a.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = fallbackImage;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Source Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-900 dark:text-white rounded-lg shadow-sm">
                    {a.source?.name || "Archive"}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-1">
                <h4 className="font-bold text-xl text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {a.title}
                </h4>

                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-3 mb-6">
                  {a.description}
                </p>

                <div className="mt-auto pt-6 border-t border-slate-50 dark:border-slate-800 flex justify-between items-center">
                  <span className="text-xs font-medium text-slate-400 uppercase tracking-tighter">
                    {a.source || "Archive"}
                  </span>
                  <a
                    href={a.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:gap-2 transition-all"
                  >
                    Read Article 
                    <span className="text-lg">→</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Global CSS for Entry Animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}} />
    </main>
  );
}