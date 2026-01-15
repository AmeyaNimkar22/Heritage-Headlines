import axios from "axios";
import HeritageSite from "../models/HeritageSite.js";

const importSites = async () => {
  const res = await axios.get("UNESCO_API_ENDPOINT");

  for (const site of res.data.sites) {
    await HeritageSite.updateOne(
      { name: site.name },
      {
        name: site.name,
        country: site.country,
        category: site.category,
        yearInscribed: site.year,
        image: site.image,
        threats: site.threats || []
      },
      { upsert: true }
    );
  }
};

export default importSites;
