const HeritageCard = ({ site }) => {
  return (
    <div className="rounded-2xl shadow-lg overflow-hidden bg-white hover:scale-[1.02] transition">
      <img
        src={site.imageUrl || site.image}
        onError={(e) => (e.target.src = "/assets/heritage-fallback.jpg")}
        className="h-48 w-full object-cover"
        alt={site.name}
      />

      <div className="p-4">
        <h3 className="text-xl font-semibold">{site.name}</h3>
        <p className="text-sm text-gray-500">
          {site.country} • {site.city}
        </p>

        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
          <span>📰 {site.relatedStories.length} stories</span>
        </div>

        <span
          className={`inline-block mt-3 px-3 py-1 rounded-full text-xs
          ${
            site.restorationStatus === "Endangered"
              ? "bg-red-100 text-red-700"
              : site.restorationStatus === "Under Restoration"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {site.restorationStatus}
        </span>
      </div>
    </div>
  );
};

export default HeritageCard;
