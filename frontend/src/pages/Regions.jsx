import { useNavigate } from "react-router-dom";

const regions = [
  { name: "Asia", query: "Asian heritage sites" },
  { name: "Europe", query: "European heritage monuments" },
  { name: "Africa", query: "African cultural heritage" },
  { name: "Americas", query: "American heritage preservation" },
  { name: "Middle East", query: "Middle Eastern heritage sites" },
];

export default function Regions() {
  const navigate = useNavigate();

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-4xl font-bold text-center mb-12">
        Explore Heritage by Region
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {regions.map((r) => (
          <button
            key={r.name}
            onClick={() => navigate(`/?region=${r.query}`)}
            className="group rounded-2xl p-8 border bg-white hover:shadow-xl transition text-left"
          >
            <h3 className="text-2xl font-semibold mb-2 group-hover:text-blue-600">
              {r.name}
            </h3>
            <p className="text-gray-600 text-sm">
              Discover preservation stories from {r.name}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}
