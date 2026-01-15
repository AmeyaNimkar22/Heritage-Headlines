import cron from "node-cron";
import axios from "axios";
import HeritageSite from "../models/HeritageSite.js";

export const startSpotlightJob = () => {
  cron.schedule("0 0 * * *", async () => {
    console.log("🌍 Running daily AI spotlight selection");

    const sites = await HeritageSite.find();

    if (!sites.length) return;

    const payload = sites.map(site => ({
      _id: site._id,
      threatLevel: site.threatLevel,
      restorationStatus: site.restorationStatus,
      relatedStories: site.relatedStories,
      continent: site.continent
    }));

    const { data } = await axios.post(
      "http://localhost:8000/score-sites",
      payload
    );

    const topSites = data.slice(0, 3);

    await HeritageSite.updateMany({}, {
      spotlight: false
    });

    await HeritageSite.updateMany(
      { _id: { $in: topSites.map(s => s._id) } },
      {
        spotlight: true,
        featuredReason: "AI-selected based on preservation urgency",
        lastUpdated: new Date()
      }
    );

    for (const s of topSites) {
      await HeritageSite.findByIdAndUpdate(s._id, {
        spotlightScore: s.score
      });
    }

    console.log("✅ Spotlight updated");
  });
};
