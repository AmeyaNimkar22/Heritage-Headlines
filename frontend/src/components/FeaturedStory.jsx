import fallbackImage from "../assets/fallback.jpg";

export default function FeaturedStory({ article }) {
  console.log(article);
  if (!article) return null;

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-10 items-center bg-gray-50 rounded-2xl overflow-hidden shadow-sm">
        {/* Image */}
        <img
          src={article.image}
          alt={article.title}
          referrerPolicy="no-referrer"
          className="w-full h-[400px] object-cover"
          onError={(e) => {
            e.target.src = fallbackImage;
          }}
        />

        {/* Content */}
        <div className="p-8">
          <span className="inline-block mb-3 px-3 py-1 text-xs font-semibold tracking-wide text-white bg-gray-900 rounded-full">
            FEATURED STORY
          </span>

          <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
            {article.title}
          </h2>

          <p className="text-gray-600 text-lg mb-6 line-clamp-4">
            {article.description || "No description available."}
          </p>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{article.source?.name}</span>
            <a
              href={article.url}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-gray-900 hover:underline"
            >
              Read full story →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
