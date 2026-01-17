import HeritageSite from "../models/HeritageSite.js";
import crypto from "crypto";

export const getRandomMonuments = async (req, res) => {
  try {
    const total = await HeritageSite.countDocuments();
    if (total === 0) return res.json([]);

    // 🔐 Daily seed (changes once per day)
    const today = new Date().toISOString().slice(0, 10);
    const hash = crypto.createHash("md5").update(today).digest("hex");
    const seed = parseInt(hash.substring(0, 8), 16);

    const skip = seed % Math.max(total - 10, 1);

    const monuments = await HeritageSite.find()
      .skip(skip)
      .limit(10);

    res.json(monuments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
