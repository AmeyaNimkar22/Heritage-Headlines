import { useEffect, useState } from "react";
import axios from "axios";

export default function NewsFeed() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(
          "https://newsapi.org/v2/everything",
          {
            params: {
              q: "heritage preservation OR cultural heritage OR monument restoration",
              language: "en",
              sortBy: "publishedAt",
              apiKey: import.meta.env.VITE_NEWS_API_KEY,
            },
          }
        );
        setArticles(res.data.articles);
      } catch (err) {
        console.error("Failed to fetch heritage news", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <p className="text-center py-10 text-lg">Loading heritage stories…</p>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h3 className="text-3xl font-bold mb-8 text-center">
        Global Heritage Updates
      </h3>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((a, i) => (
          <article
            key={i}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >
            {a.urlToImage && (
              <img
                src={a.urlToImage}
                alt={a.title}
                className="h-48 w-full object-cover"
              />
            )}

            <div className="p-5">
              <h4 className="font-semibold text-lg mb-2 line-clamp-2">
                {a.title}
              </h4>

              <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                {a.description}
              </p>

              <div className="flex justify-between items-center text-sm">
                <span className="opacity-70">
                  {a.source?.name}
                </span>
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
  );
}
