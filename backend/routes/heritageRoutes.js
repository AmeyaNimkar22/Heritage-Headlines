import express from "express";
import { ObjectId } from "mongodb";

const router = express.Router();

/**
 * GET spotlight sites
 */
router.get("/spotlight", async (req, res) => {
  try {
    const monuments = await req.app.locals.db
      .collection("heritage_sites")
      .aggregate([{ $sample: { size: 10 } }])
      .toArray();

    res.json(monuments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch spotlight" });
  }
});

/**
 * GET single heritage site by ID
 */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // validate ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const site = await req.app.locals.db
      .collection("heritage_sites")
      .findOne({ _id: new ObjectId(id) });

    if (!site) {
      return res.status(404).json({ error: "Heritage site not found" });
    }

    res.json(site);
  } catch (err) {
    console.error("Fetch by ID error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
