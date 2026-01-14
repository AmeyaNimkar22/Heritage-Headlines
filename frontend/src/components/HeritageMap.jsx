import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Approximate center coordinates for each continent
const continentCenters = {
  Asia: [28, 80],
  Europe: [54, 15],
  Africa: [2, 20],
  "North America": [40, -100],
  "South America": [-15, -60],
  Oceania: [-25, 135],
  Other: [0, 0], // fallback for unknown
};

// Colors matching your dashboard
const continentColors = {
  Asia: "#f97316",        // orange
  Europe: "#2563eb",      // blue
  Africa: "#16a34a",      // green
  "North America": "#dc2626", // red
  "South America": "#7c3aed", // purple
  Oceania: "#ca8a04",     // yellow
  Other: "#6b7280",       // gray
};

export default function HeritageMap({ data }) {
  return (
    <div style={{ height: "600px", width: "100%" }}>
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {data.map((story, index) => {
          // Use continent center, fallback to Other
          const base = continentCenters[story.continent] || continentCenters.Other;

          // Random offset so markers don’t overlap exactly
          const lat = base[0] + (Math.random() - 0.5) * 12; // ±6 degrees
          const lng = base[1] + (Math.random() - 0.5) * 12; // ±6 degrees

          const color = continentColors[story.continent] || continentColors.Other;

          return (
            <CircleMarker
              key={index}
              center={[lat, lng]}
              radius={6}
              pathOptions={{
                color,
                fillColor: color,
                fillOpacity: 0.85,
              }}
            >
              <Popup>
                <strong>{story.title}</strong>
                <br />
                {story.country || story.continent}
                <br />
                <a href={story.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  Read more
                </a>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
