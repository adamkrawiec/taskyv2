const express = require('express');
const WebScraperController = require('./web-scraper.controller');

const router = express.Router();

router.route('/')
  .post(WebScraperController.scrapeUrls);

module.exports = router;
