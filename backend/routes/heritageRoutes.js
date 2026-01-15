import express from "express";
import heritageSites from "../models/heritageSites.js";

const router = express.Router();

router.get("/spotlight", async (req, res) => {
  const sites = await heritageSites.find();
  res.json({ success: true, sites });
});

export default router;
