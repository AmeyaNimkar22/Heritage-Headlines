import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";

/**
 * HeritageAnalysis Component
 * Brand: Heritage Headlines 
 * Constraints: No external animation packages, Responsive, Dark Mode, Modern UI.
 */
const HeritageAnalysis = () => {
  const location = useLocation();
  const { heritageName, description } = location.state || {};
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    if (!heritageName) return;

    axios
      .post("http://localhost:5001/api/ai-analysis", {
        heritageName,
        description,
      })
      .then((res) => setAnalysis(res.data.analysis))
      .catch((error) => console.error("Analysis Error:", error));
  }, [heritageName, description]);

  if (!heritageName) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-slate-500 font-medium">
        No heritage selected.
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="max-w-4xl mx-auto py-32 px-6">
        <div className="flex flex-col items-center space-y-8">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 border-4 border-emerald-500/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Analyzing Heritage Data</h2>
            <p className="text-slate-500 animate-pulse">Consulting digital archives...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500 pb-20">
      {/* Hero Header */}
      <header className="relative h-[40vh] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500 via-transparent to-transparent animate-pulse"></div>
        <div className="relative z-10 text-center px-6">
          <div className="inline-block mb-4 px-4 py-1.5 text-[10px] font-black tracking-[0.2em] uppercase rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/20">
            Heritage Headlines AI Analysis
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
            {heritageName}
          </h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto -mt-16 px-6 relative z-20">
        {/* Main Content Card */}
        <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden group">
          
          {/* Metadata Bar */}
          <div className="flex items-center justify-between px-8 py-6 border-b border-slate-50 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-800/30">
            <div className="flex gap-4">
              <div className="h-3 w-3 rounded-full bg-red-400"></div>
              <div className="h-3 w-3 rounded-full bg-amber-400"></div>
              <div className="h-3 w-3 rounded-full bg-emerald-400"></div>
            </div>
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
              Report ID: #{Math.random().toString(36).substr(2, 9).toUpperCase()}
            </span>
          </div>

          <div className="p-8 md:p-16">
            {/* Markdown Styles Integration */}
            <article className="prose prose-slate prose-lg lg:prose-xl dark:prose-invert max-w-none 
              prose-h1:hidden
              prose-h2:text-emerald-600 dark:prose-h2:text-emerald-400 prose-h2:font-bold prose-h2:text-3xl prose-h2:mt-12
              prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-p:leading-relaxed
              prose-strong:text-slate-900 dark:prose-strong:text-white prose-strong:font-bold
              prose-blockquote:border-l-emerald-500 prose-blockquote:bg-slate-50 dark:prose-blockquote:bg-slate-800/50 prose-blockquote:py-2 prose-blockquote:rounded-r-xl
              prose-li:marker:text-emerald-500">
              <ReactMarkdown>{analysis}</ReactMarkdown>
            </article>
          </div>

          {/* Site Footer Signature */}
          <footer className="px-8 py-10 bg-slate-900 dark:bg-black text-center border-t border-slate-800">
            <p className="text-slate-400 text-sm font-medium mb-2">
              Deep Learning Reconstruction by <span className="text-emerald-500 font-bold">Heritage Headlines</span>
            </p>
            <div className="flex justify-center gap-6 mt-6">
              <button 
                onClick={() => window.history.back()}
                className="text-xs font-bold text-white uppercase tracking-widest hover:text-emerald-400 transition-colors"
              >
                Return Home
              </button>
              <button 
                onClick={() => window.print()}
                className="text-xs font-bold text-white uppercase tracking-widest hover:text-emerald-400 transition-colors"
              >
                Print PDF
              </button>
            </div>
          </footer>
        </section>

        {/* Disclaimer */}
        <p className="mt-8 text-center text-xs text-slate-400 max-w-2xl mx-auto leading-relaxed">
          The information provided above is synthesized using artificial intelligence. 
          While we strive for historical accuracy, please consult official UNESCO or local 
          government records for legal or academic citations.
        </p>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        main {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .prose h2 {
          scroll-margin-top: 2rem;
        }
      `}} />
    </main>
  );
};

export default HeritageAnalysis;