import mongoose from "mongoose";

const heritageSiteSchema = new mongoose.Schema({
  name: String,
  description: String,
  country: String,
  city: String,
  continent: String,

  imageUrl: String,

  yearInscribed: Number,
  restorationStatus: {
    type: String,
    enum: ["Stable", "Under Restoration", "Endangered"],
    default: "Stable"
  },

  threatLevel: {
    type: String,
    enum: ["Low", "Moderate", "High"],
    default: "Low"
  },

  relatedStories: {
    type: Array,
    default: []
  },

  // 🔥 Spotlight fields
  spotlight: {
    type: Boolean,
    default: false
  },
  spotlightScore: Number,
  featuredReason: String,
  lastUpdated: Date
});

export default mongoose.model("HeritageSite", heritageSiteSchema);
