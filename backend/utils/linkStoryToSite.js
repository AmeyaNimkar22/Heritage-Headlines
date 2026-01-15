import HeritageSite from "../models/HeritageSite.js";

const linkStoryToSite = async (story) => {
  const sites = await HeritageSite.find();

  for (const site of sites) {
    if (
      story.title.includes(site.name) ||
      story.content.includes(site.name)
    ) {
      site.relatedStories.push(story._id);
      await site.save();
    }
  }
};

export default linkStoryToSite;
