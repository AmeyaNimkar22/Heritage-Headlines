import express from "express";
import axios from "axios";
import inferContinent from "../utils/inferContinent.js";

const router = express.Router();

/* =======================
   KEYWORD DEFINITIONS
   ======================= */

// Must mention heritage / monument / site
const HERITAGE_KEYWORDS = [
  // Core Heritage & Landmarks
  "heritage",
  "cultural heritage",
  "heritage site",
  "historic site",
  "historic monument",
  "monument",
  "archaeological site",
  "unesco",
  "world heritage",
  "world heritage site",
  "historical landmark",
  "cultural landmark",
  "historical site",
  "cultural site",
  "historical monument",
  "landmark",
  "ruins",

  // Discovery & Archaeology Specifics
  "archaeology",
  "funerary complex",
  "excavation",
  "burial ground",
  "marching camps",
  "ancient temple",
  "submerged remains",
  "republican tombs",
  "bone stylus",
  "hoard discovery",
  "inscriptions",
  "petroglyphs",

  // Periods & Civilizations
  "neolithic",
  "bronze age",
  "iron age",
  "anglo-saxon",
  "roman empire",
  "tang dynasty",
  "victorian",
  "palaeoanthropology",
  "neanderthal",
  "pleistocene",

  // Technology & Analysis
  "lidar",
  "3d interactive map",
  "geoscience",
  "palaeontology",
  "geothermal resources",
  "digital preservation",
  "cultural conservation",
  "historical preservation",

  // Architecture & Structures
  "fort",
  "palace",
  "ancient landscape",
  "urban metropolis",
  "limestone quarry",
  "cave sanctuary",
  "historical architecture",
  "mosaic uncovered",

  // Legacy & Preservation
  "cultural legacy",
  "historical legacy",
  "cultural preservation",
  "heritage conservation",
  "digital reconstruction"
];

// Must mention preservation OR threat
const PRESERVATION_KEYWORDS = [
  "preservation",
  "restore",
  "restoration",
  "conservation",
  "protect",
  "protection",
  "rehabilitation",
  "rebuild",
];

const THREAT_KEYWORDS = [
  "damaged",
  "threatened",
  "endangered",
  "destroyed",
  "encroachment",
  "vandalism",
  "climate change",
  "flood",
  "earthquake",
  "fire",
  "erosion",
  "war",
  "conflict",
];

// Hard exclusions (UPSC / politics / courts / policy noise)
const EXCLUDE_KEYWORDS = [
  "upsc",
  "exam",
  "civil services",
  "politics",
  "election",
  "court",
  "judiciary",
  "supreme court",
  "law",
  "policy",
  "government scheme",
  "trump",
  "biden",
  "strike",
  "workers",
  "economy",
  "ai regulation",
  "gig workers",
];
const scoreText = (text, keywords, weight = 1) =>
  keywords.reduce(
    (score, k) => (text.includes(k) ? score + weight : score),
    0
  );

/* =======================
   ROUTE
   ======================= */

router.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        q:"heritage",
        language: "en",
        sortBy: "publishedAt",
        pageSize: 100,
        apiKey: process.env.NEWS_API_KEY,
      },
    });

   const articles = response.data.articles
  .map((article) => {
    const text = `${article.title || ""} ${article.description || ""}`.toLowerCase();

    const heritageScore = scoreText(text, HERITAGE_KEYWORDS, 3);
    const preservationScore = scoreText(text, PRESERVATION_KEYWORDS, 2);
    const threatScore = scoreText(text, THREAT_KEYWORDS, 2);
    const exclusionScore = scoreText(text, EXCLUDE_KEYWORDS, -5);

    const looksLikePlaceBased =
      /site|temple|church|fort|palace|monument|city|region|island/i.test(text)
        ? 2
        : 0;

    const totalScore =
      heritageScore +
      preservationScore +
      threatScore +
      looksLikePlaceBased +
      exclusionScore;

    // 🚫 discard only very weak articles
    if (totalScore < 4) return null;

    const continent = inferContinent(text, article.url);
    if (continent === "Other") return null;

    return {
      title: article.title,
      description: article.description,
      url: article.url,
      image: article.urlToImage,
      source: article.source?.name,
      publishedAt: article.publishedAt,
      continent,
      relevanceScore: totalScore,
    };
  })
  .filter(Boolean)
  .sort((a, b) => b.relevanceScore - a.relevanceScore)
  .slice(0, 15); // 👈 Daily digest size


    res.json(articles);
  } catch (err) {
    console.error("News fetch error:", err.message);
    res.status(500).json({
      error: "Failed to fetch heritage preservation news",
    });
  }
});


router.get("/heritage/:id", async (req, res) => {
  try {
    const site = await req.app.locals.db
      .collection("heritage_sites")
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!site) return res.json([]);

    const query = site.name_en;

    const response = await axios.get(
      "https://newsapi.org/v2/everything",
      {
        params: {
          q: query,
          language: "en",
          sortBy: "relevancy",
          pageSize: 5,
          apiKey: process.env.NEWS_API_KEY
        }
      }
    );

    res.json(response.data.articles || []);
  } catch (err) {
    console.error(err);
    res.json([]);
  }
});

export default router;
