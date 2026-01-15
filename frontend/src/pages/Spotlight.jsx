import { useEffect, useState } from "react";
import HeritageCard from "../components/HeritageCard";

const Spotlight = () => {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpotlightSites = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/heritage/spotlight");
        const data = await res.json();
        setSites(data.sites || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSpotlightSites();
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-semibold mb-6" style={{ fontFamily: "Elsie, serif" }}>
        Our Top Heritage Sites for the Day
      </h2>

      {loading && <p>Loading heritage sites…</p>}

      {!loading && sites.length === 0 && (
        <p>No heritage sites available right now.</p>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {sites.map(site => (
          <HeritageCard key={site._id} site={site} />
        ))}
      </div>
    </section>
  );
};

export default Spotlight;
