import mongoose from "mongoose";

const heritageSiteSchema = new mongoose.Schema({}, { strict: false });

export default mongoose.model(
  "HeritageSite",
  heritageSiteSchema,
  "heritae_sites" // ⚠️ EXACT typo-matching collection name
);
