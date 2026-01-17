import express from "express";
const router = express.Router();

router.get("/spotlight", async (req, res) => {
  try {
    const monuments = await req.app.locals.db
      .collection("heritage_sites") // ✅ EXACT MATCH
      .aggregate([{ $sample: { size: 10 } }])
      .toArray();

    console.log("Fetched monuments:", monuments.length);

    res.json(monuments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch spotlight" });
  }
});

export default router;
