import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const HeritageDetail = () => {
  const { id } = useParams();
  const [site, setSite] = useState(null);
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/heritage/${id}`)
      .then(res => setSite(res.data))
      .catch(console.error);

    axios.get(`http://localhost:5000/api/news/heritage/${id}`)
      .then(res => setNews(res.data))
      .catch(() => setNews([]));
  }, [id]);

  if (!site) return (
    <div className="flex h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
    </div>
  );

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        {/* HERO HEADER */}
        <div className="grid lg:grid-cols-2 gap-12 items-center animate-fadeIn">
          <div className="relative group overflow-hidden rounded-3xl shadow-2xl">
            <img
              src={site.main_image_url?.url}
              alt={site.name_en}
              className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          <div className="space-y-8">
            <header>
              <nav className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-sm font-semibold mb-6">
                <span>{site.region}</span>
                <span className="w-1 h-1 rounded-full bg-emerald-300"></span>
                <span>{site.states_names[0]}</span>
              </nav>
              <h1 className="text-5xl font-bold tracking-tight mb-4 leading-tight" style={{ fontFamily: "Elsie, serif" }}>
                {site.name_en}
              </h1>
            </header>

            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold uppercase tracking-widest border border-slate-200 dark:border-slate-700">
                Category: {site.category}
              </span>
              <span className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest border transition-all ${
                site.danger === "True"
                  ? "bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border-red-100 dark:border-red-900"
                  : "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900"
              }`}>
                {site.danger === "True" ? "Status: Threatened" : "Status: Stable"}
              </span>
            </div>

            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-light italic border-l-4 border-emerald-500 pl-8">
              {site.short_description_en}
            </p>
          </div>
        </div>

        {/* METRICS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatCard title="Year Inscribed" value={site.date_inscribed} icon="🏛️" color="emerald" />
          <StatCard title="Selection Criteria" value={site.criteria_txt} icon="⚖️" color="blue" />
          <StatCard title="Total Area" value={`${site.area_hectares.toFixed(1)} Hectares`} icon="🗺️" color="amber" />
        </div>

        <div className="grid lg:grid-cols-3 gap-16">
          {/* MAIN CONTENT */}
          <div className="lg:col-span-2 space-y-16">
            <section className="bg-slate-50 dark:bg-slate-900/50 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800">
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-4 dark:text-white" style={{ fontFamily: "Elsie, serif" }}>
                Historical Significance
              </h2>
              <p className="text-slate-700 dark:text-slate-300 leading-loose text-lg whitespace-pre-line">
                {site.justification_en}
              </p>
            </section>

            {/* NEWS SECTION */}
            <section>
              <h2 className="text-3xl font-bold mb-10 dark:text-white" style={{ fontFamily: "Elsie, serif" }}>Latest Updates</h2>
              {news.length === 0 ? (
                <div className="p-12 text-center rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                  <p className="text-slate-400 text-lg italic">No news articles found for this heritage site.</p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-8">
                  {news.map((n, i) => (
                    <a
                      key={i}
                      href={n.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl hover:border-emerald-500 dark:hover:border-emerald-500 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10"
                    >
                      <h3 className="font-bold text-xl mb-4 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {n.title}
                      </h3>
                      <div className="flex items-center justify-between text-slate-500 text-sm">
                        <span className="font-mono uppercase tracking-widest">{n.source.name}</span>
                        <span className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/30">
                          Visit Source ↗
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* SIDEBAR */}
          <aside className="space-y-10">
            <div className="sticky top-10 group">
              <div className="bg-white dark:bg-slate-900 p-3 rounded-[2rem] shadow-xl border border-slate-200 dark:border-slate-800 transition-transform duration-500 group-hover:-translate-y-2">
                <div className="p-4 flex items-center justify-between">
                  <h3 className="text-lg font-bold dark:text-white">Geographic Location</h3>
                  <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                </div>
                <MapContainer
                  center={[site.coordinates.lat, site.coordinates.lon]}
                  zoom={8}
                  className="h-[450px] w-full rounded-2xl z-0"
                  scrollWheelZoom={false}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={[site.coordinates.lat, site.coordinates.lon]}>
                    <Popup className="font-bold">{site.name_en}</Popup>
                  </Marker>
                </MapContainer>
                <div className="p-6 text-center">
                  <code className="text-xs text-slate-400 bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-full">
                    LAT {site.coordinates.lat.toFixed(4)} / LON {site.coordinates.lon.toFixed(4)}
                  </code>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};

const StatCard = ({ title, value, icon, color }) => (
  <div className="relative overflow-hidden group p-8 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-500">
    <div className={`absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 bg-${color}-500/5 rounded-full group-hover:scale-150 transition-transform duration-700`} />
    <div className="relative z-10">
      <div className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all">{icon}</div>
      <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-1">{title}</p>
      <p className="text-2xl font-bold text-slate-800 dark:text-white">{value}</p>
    </div>
  </div>
);

export default HeritageDetail;