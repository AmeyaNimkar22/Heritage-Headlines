import mongoose from "mongoose";

const HeritageSiteSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  country: { type: String, required: true },
  continent: String,

  yearInscribed: Number,
  category: {
    type: String,
    enum: ["Cultural", "Natural", "Mixed"]
  },

  image: {
    type: String,
    default: "/assets/heritage-fallback.jpg"
  },

  threats: [String],
  restorationStatus: {
    type: String,
    enum: ["Stable", "Endangered", "Under Restoration"],
    default: "Stable"
  },

  relatedStories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Story"
  }]
}, { timestamps: true });

export default mongoose.model("HeritageSite", HeritageSiteSchema);
