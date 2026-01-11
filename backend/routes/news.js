import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://newsapi.org/v2/everything",
      {
        params: {
          q: "heritage preservation OR cultural heritage OR monument restoration",
          language: "en",
          sortBy: "publishedAt",
          apiKey: process.env.NEWS_API_KEY,
        },
      }
    );

    res.json(response.data.articles);
  } catch (error) {
  console.error("News API error:", error.response?.data || error.message);

  res.status(500).json({
    error: "Failed to fetch heritage news",
    details: error.response?.data || error.message,
  });
}

});

export default router;
