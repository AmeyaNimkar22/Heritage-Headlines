import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Spotlight = () => {
  const navigate = useNavigate();
  const [monuments, setMonuments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/heritage/spotlight")
      .then((res) => setMonuments(res.data))
      .catch(console.error);
  }, []);

  const cleanText = (text) => text?.replace(/<[^>]+>/g, "");

  return (
    <section className="bg-slate-50 dark:bg-slate-950 transition-colors duration-300 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-16 space-y-4">
          <h2 
            className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight" 
            style={{ fontFamily: "Elsie, serif" }}
          >
            Heritage Spotlight
          </h2>
          <div className="h-1.5 w-24 bg-emerald-500 mx-auto rounded-full"></div>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Discover the world's most breathtaking landmarks, preserved for generations to come.
          </p>
        </header>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {monuments.map((m) => (
            <div 
              key={m._id} 
              className="group perspective h-[460px] cursor-pointer"
            >
              <div className="relative h-full w-full transition-all duration-700 transform-style-preserve-3d group-hover:rotate-y-180">
                
                {/* FRONT CARD */}
                <div className="absolute inset-0 backface-hidden bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col">
                  <div className="relative overflow-hidden h-60">
                    <img
                      src={m.main_image_url?.url || "/placeholder.jpg"}
                      alt={m.name_en}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md dark:bg-slate-800/90 px-3 py-1 rounded-full shadow-sm">
                      <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                        {m.category}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 line-clamp-2 leading-tight">
                        {cleanText(m.name_en)}
                      </h3>
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-1">
                        <span className="text-emerald-500"></span> {m.states_names?.[0]}
                      </p>
                    </div>
                    
                    <div className="pt-4 border-t border-slate-50 dark:border-slate-800 flex justify-between items-center">
                      <span className="text-xs font-mono text-slate-400">{m.date_inscribed}</span>
                      <span className="text-emerald-500 text-xs font-bold uppercase tracking-tighter group-hover:translate-x-1 transition-transform">
                        Details →
                      </span>
                    </div>
                  </div>
                </div>

                {/* BACK CARD */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-slate-900 dark:bg-emerald-950 text-white rounded-[2.5rem] shadow-2xl p-8 flex flex-col justify-between overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl"></div>
                  
                  <div className="relative z-10 space-y-6">
                    <header>
                      <p className="text-emerald-400 text-xs font-black uppercase tracking-[0.2em] mb-2">Detailed View</p>
                      <h3 className="text-2xl font-bold line-clamp-2 leading-tight" style={{ fontFamily: "Elsie, serif" }}>
                        {cleanText(m.name_en)}
                      </h3>
                    </header>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <span className="text-slate-400 text-xs">Region</span>
                        <span className="text-sm font-medium">{m.region}</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <span className="text-slate-400 text-xs">Category</span>
                        <span className="text-sm font-medium">{m.category}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-xs">Status</span>
                        <span className={`text-sm font-bold ${
                          m.danger === "True" ? "text-red-400" : "text-emerald-400"
                        }`}>
                          {m.danger === "True" ? "⚠ At Risk" : "✓ Stable"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 space-y-3">
                    {/* NEW AI ANALYSIS BUTTON */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/heritage/${m._id}/analysis`);
                      }}
                      className="group/ai w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl text-sm font-bold border border-white/10 transition-all flex items-center justify-center gap-2"
                    >
                      <span className="text-emerald-400 group-hover/ai:animate-pulse"></span>
                      AI Analysis
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/heritage/${m._id}`);
                      }}
                      className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 py-3 rounded-xl text-sm font-bold transition-all transform active:scale-95 shadow-lg shadow-emerald-900/40"
                    >
                      Explore Monument
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Spotlight;