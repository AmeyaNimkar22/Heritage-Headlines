import { useEffect, useState } from "react";
import axios from "axios";
import HeritageMap from "../components/HeritageMap";
import ContinentDashboard from "../components/ContinentDashboard";

export default function Regions() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/news");

        const safeData = res.data.map((item) => ({
          ...item,
          continent: item.continent || "Other",
        }));

        setData(safeData);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load heritage data");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <div className="text-center mt-20">Loading map…</div>;
  if (error) return <div className="text-center mt-20 text-red-500">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: "Elsie, serif" }}>Global Heritage Story Map</h1>
      <HeritageMap data={data} />
      <ContinentDashboard data={data} />
      
    </div>
  );
}
