import express from "express";
import HeritageSite from "../models/HeritageSite.js";
import RankedStory from "../models/RankedStory.js";

// Temporary scoring logic used as AI placeholder.
// Can be replaced with Python service later.


const router = express.Router();

router.post("/run", async (req, res) => {
  try {
    const sites = await HeritageSite.find().limit(10);

    if (!sites.length) {
      return res.status(400).json({ message: "No heritage sites found" });
    }

    await RankedStory.deleteMany({});

    const ranked = sites.map((s) => ({
      title: s.name,
      description: s.description,
      source: "Heritage Database",
      publishedAt: new Date(),

      relevance_score: Math.random(),
      sentiment_score: Math.random(),
      final_score: Math.random(),
      sentiment_label: "neutral"
    }));

    await RankedStory.insertMany(ranked);

    res.json({ success: true, ranked: ranked.length });
  } catch (err) {
    res.status(500).json({ error: "AI ranking pipeline failed" });
  }
});

export default router;
