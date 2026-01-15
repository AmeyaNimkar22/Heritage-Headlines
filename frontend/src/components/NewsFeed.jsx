import { useEffect, useState } from "react";
import axios from "axios";
import FeaturedStory from "./FeaturedStory";
import NewsSkeleton from "./NewsSkeleton";
import fallbackImage from "../assets/fallback.jpg";


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
        console.warn("Backend returned unexpected data:", res.data);
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
    <>
      
      {/* Featured */}
      <FeaturedStory article={featured} />

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <h3 className="text-2xl font-semibold mb-8">
          Latest Heritage Updates
        </h3>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((a, i) => (
            <article
  key={i}
  className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
>
  <img
    src={a.image || fallbackImage}
    alt={a.title}
    className="h-48 w-full object-cover"
    onError={(e) => {
      e.currentTarget.onerror = null;
      e.currentTarget.src = fallbackImage;
    }}
  />

  <div className="p-5">
    <h4 className="font-semibold text-lg mb-2 line-clamp-2">
      {a.title}
    </h4>

    <p className="text-sm text-gray-600 line-clamp-3 mb-4">
      {a.description}
    </p>

    <div className="flex justify-between items-center text-sm">
      <span className="opacity-70">{a.source?.name}</span>
      <a
        href={a.url}
        target="_blank"
        rel="noreferrer"
        className="text-blue-600 font-medium hover:underline"
      >
        Read →
      </a>
    </div>
  </div>
</article>

          ))}
        </div>
      </section>
    </>
  );
}