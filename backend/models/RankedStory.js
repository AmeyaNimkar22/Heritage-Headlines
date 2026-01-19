import mongoose from "mongoose";

const RankedStorySchema = new mongoose.Schema({
  title: String,
  description: String,
  source: String,
  publishedAt: Date,

  relevance_score: Number,
  sentiment_score: Number,
  final_score: Number,
  sentiment_label: String,

  ranked_at: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("RankedStory", RankedStorySchema);
