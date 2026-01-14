import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Color scheme to match the map
const continentColors = {
  Asia: "#ff7f0e",
  Europe: "#1f77b4",
  Africa: "#2ca02c",
  "North America": "#d62728",
  "South America": "#9467bd",
  Oceania: "#8c564b",
  Other: "#7f7f7f",
};

export default function ContinentDashboard({ data }) {
  // Count stories per continent
  const counts = data.reduce((acc, curr) => {
    acc[curr.continent] = (acc[curr.continent] || 0) + 1;
    return acc;
  }, {});

  // Transform to chart-friendly array
  const chartData = Object.entries(counts)
    .map(([continent, stories]) => ({
      continent,
      stories,
      color: continentColors[continent] || "#7f7f7f",
    }))
    .sort((a, b) => b.stories - a.stories); // Sort descending by stories

  return (
    <div className="mb-8">
      {/* Dashboard Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
        {chartData.map((c) => (
          <div
            key={c.continent}
            className="p-4 rounded-xl shadow-lg bg-white text-center transition-transform transform hover:scale-105"
          >
            <h3 className="font-semibold text-gray-700">{c.continent}</h3>
            <p
              className="text-3xl font-bold mt-2"
              style={{ color: c.color }}
            >
              {c.stories}
            </p>
            <p className="text-sm text-gray-500">
              {((c.stories / data.length) * 100).toFixed(1)}%
            </p>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <div className="bg-white p-4 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Stories by Continent
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <XAxis dataKey="continent" tick={{ fill: "#555", fontSize: 14 }} />
            <YAxis tick={{ fill: "#555", fontSize: 12 }} />
            <Tooltip
              contentStyle={{ backgroundColor: "#f9f9f9", borderRadius: 8 }}
              formatter={(value, name, props) => [value, "Stories"]}
            />
            <Bar
              dataKey="stories"
              fill="#8884d8"
              // Dynamic fill per continent
              isAnimationActive
            >
              {chartData.map((entry, index) => (
                <cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
