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
      <iframe src="https://data.unesco.org/explore/embed/dataset/whc001/map/?sort=date_inscribed&refine.category=Cultural&dataChart=eyJxdWVyaWVzIjpbeyJjaGFydHMiOlt7ImFsaWduTW9udGgiOnRydWUsImNvbG9yIjoicmFuZ2UtY3VzdG9tIiwidHlwZSI6ImNvbHVtbiIsImZ1bmMiOiJTVU0iLCJzY2llbnRpZmljRGlzcGxheSI6dHJ1ZSwicG9zaXRpb24iOiJjZW50ZXIiLCJ5QXhpcyI6ImFyZWFfaGVjdGFyZXMifV0sInhBeGlzIjoicmVnaW9uIiwibWF4cG9pbnRzIjoiIiwidGltZXNjYWxlIjoiIiwic29ydCI6IiIsInNlcmllc0JyZWFrZG93biI6ImNhdGVnb3J5Iiwic2VyaWVzQnJlYWtkb3duVGltZXNjYWxlIjoiIiwic3RhY2tlZCI6Im5vcm1hbCIsImNvbmZpZyI6eyJkYXRhc2V0Ijoid2hjMDAxIiwib3B0aW9ucyI6e319fV0sImRpc3BsYXlMZWdlbmQiOnRydWUsImFsaWduTW9udGgiOnRydWUsInRpbWVzY2FsZSI6IiJ9&basemap=a2eb93&location=2,-4.8611,32.69531&static=false&datasetcard=false&scrollWheelZoom=false" width="600" height="450" frameborder="0"></iframe>
    </section>
  );
};

export default Spotlight;
