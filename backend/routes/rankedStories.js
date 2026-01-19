import express from "express";
import RankedStory from "../models/RankedStory.js";

const router = express.Router();

router.get("/ranked", async (req, res) => {
  try {
    const stories = await RankedStory.find().sort({ final_score: -1 });
    res.json(stories);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch ranked stories" });
  }
});


export default router;
