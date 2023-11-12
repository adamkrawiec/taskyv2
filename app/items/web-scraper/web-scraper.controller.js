const webScrapeQueue = require('./web-scrape.queue');

const scrapeUrls = async (req, res) => {
  if(req.body.urls) {
    req.body.urls.map(async (url) => {
      await webScrapeQueue.add({ url, currentUser: null });
    });
  }

  res.status(204).send('ok');
};

module.exports = {
  scrapeUrls,
};
