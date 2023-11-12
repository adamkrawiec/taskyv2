const Item = require('../item.model');
const ScrapePageService = require('./scrape-page.service');

const addItemFromUrl = async( { url, currentUser }) => {
  const { ogTitle, ogDescription } = await ScrapePageService.getOGFromUrl(url);
  const item = await Item.create({
    title: ogTitle,
    description: ogDescription,
    url,
    addedBy: currentUser
  });
  // notify item added
  return item;
};

module.exports = {
  addItemFromUrl
};
