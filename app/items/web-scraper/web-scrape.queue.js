const { webScrapeQueue } = require("#queues/web-scrape.queue");
const CreateItemService = require("./create-item.service");

webScrapeQueue.process(async (job, done) => {
  await CreateItemService.addItemFromUrl(job.data);
  done();
});

module.exports = { webScrapeQueue };
