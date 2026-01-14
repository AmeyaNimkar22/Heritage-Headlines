// backend/utils/geonames.js
import axios from "axios";
import NodeCache from "node-cache";

// Cache results for 7 days to avoid repeated API calls
const geoCache = new NodeCache({ stdTTL: 604800 }); // 7 days in seconds

/**
 * Get latitude and longitude for a country using GeoNames API
 * @param {string} country - Country name
 * @returns {Promise<{lat: number|null, lng: number|null, continentName: string}>}
 */
export const getCountryLatLng = async (country) => {
  if (!country) return { lat: null, lng: null, continentName: "Other" };

  // Check cache first
  const cached = geoCache.get(country);
  if (cached) return cached;

  try {
    const res = await axios.get("http://api.geonames.org/searchJSON", {
      params: {
        q: country,
        maxRows: 1,
        username: process.env.GEONAMES_USERNAME, // Your GeoNames username
      },
    });

    const geo = res.data?.geonames?.[0];

    if (!geo) {
      geoCache.set(country, { lat: null, lng: null, continentName: "Other" });
      return { lat: null, lng: null, continentName: "Other" };
    }

    const lat = geo.lat ? parseFloat(geo.lat) : null;
    const lng = geo.lng ? parseFloat(geo.lng) : null;
    const continentName = geo.continentName || "Other";

    const data = { lat, lng, continentName };
    geoCache.set(country, data);

    return data;
  } catch (err) {
    console.error("GeoNames API error:", err.message);
    return { lat: null, lng: null, continentName: "Other" };
  }
};

export default { getCountryLatLng };
