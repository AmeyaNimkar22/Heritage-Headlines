import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Spotlight = () => {
  const navigate = useNavigate(); // ✅ correct place
  const [monuments, setMonuments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/heritage/spotlight")
      .then((res) => setMonuments(res.data))
      .catch(console.error);
  }, []);

  const cleanText = (text) => text?.replace(/<[^>]+>/g, "");

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-center mb-10" style={{ fontFamily: "Elsie, serif" }} >
         Heritage Spotlight
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {monuments.map((m) => (
          <div key={m._id} className="group perspective h-[380px]">
            <div className="relative h-full w-full transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">

              {/* FRONT */}
              <div className="absolute inset-0 backface-hidden bg-white rounded-xl shadow-lg overflow-hidden">
                <img
                  src={m.main_image_url?.url || "/placeholder.jpg"}
                  alt={m.name_en}
                  className="h-48 w-full object-cover"
                />

                <div className="p-4">
                  <h3 className="text-lg font-semibold line-clamp-2">
                    {cleanText(m.name_en)}
                  </h3>

                  <p className="text-sm text-gray-600 mt-1">
                    {m.states_names?.[0]}
                  </p>

                  <span className="inline-block mt-3 px-3 py-1 text-xs rounded-full bg-emerald-100 text-emerald-700">
                    {m.category}
                  </span>
                </div>
              </div>

              {/* BACK */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 bg-emerald-900 text-white rounded-xl shadow-lg p-5 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                    {cleanText(m.name_en)}
                  </h3>

                  <p className="text-sm"> {m.region}</p>
                  <p className="text-sm mt-2"> {m.category}</p>
                  <p className="text-sm mt-2"> {m.date_inscribed}</p>

                  <p className="text-sm mt-2">
                     Status:{" "}
                    <span
                      className={
                        m.danger === "True"
                          ? "text-red-400 font-semibold"
                          : "text-emerald-300 font-semibold"
                      }
                    >
                      {m.danger === "True" ? "At Risk" : "Stable"}
                    </span>
                  </p>
                </div>

                <button
                  onClick={() => navigate(`/heritage/${m._id}`)}
                  className="mt-4 bg-white text-emerald-900 py-2 rounded-md font-medium hover:bg-gray-100 transition"
                >
                  Learn More
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Spotlight;
