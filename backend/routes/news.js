import express from "express";
import axios from "axios";
import inferContinent from "../utils/inferContinent.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        q: "heritage OR monument OR cultural heritage OR archaeology",
        language: "en",
        sortBy: "publishedAt",
        pageSize: 100,
        apiKey: process.env.NEWS_API_KEY,
      },
    });

    const articles = response.data.articles
      .map((article) => {
        const text = `${article.title || ""} ${article.description || ""}`;
        const continent = inferContinent(text, article.url);

        if (continent === "Other") return null;

        return {
          title: article.title,
          description: article.description,
          url: article.url,
          image: article.urlToImage,
          source: article.source,
          publishedAt: article.publishedAt,
          continent,
        };
      })
      .filter(Boolean);

    res.json(articles);
  } catch (err) {
    console.error("News fetch error:", err.message);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

export default router;
