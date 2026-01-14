// backend/utils/extractCountry.js
import countries from "./countries.js"; // Array of country names

/**
 * Extracts the first country found in the given text or URL
 * @param {string} text - Article title or description
 * @param {string} url - Optional: article URL
 * @returns {string|null} - Country name or null if none found
 */
export default function extractCountry(text, url = "") {
  const combined = `${text} ${url}`.toLowerCase();

  for (const country of countries) {
    if (combined.includes(country.toLowerCase())) {
      return country;
    }
  }

  return null;
}
