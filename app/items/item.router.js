const express = require('express');
const ItemController = require('./item.controller');
const ItemTasksController = require('./item-tasks/item-tasks.controller');
const WebScraperRouter = require("./web-scraper/web-scraper.router");

const router = express.Router();

router.route('/')
      .get(ItemController.index)
      .post(ItemController.create);

router.use('/web-scrape/', WebScraperRouter);

router.route('/:id')
      .get(ItemController.show)
      .put(ItemController.update);

router.get('/:id/tasks', ItemTasksController.getTasks);
router.get('/:id/tasks/summary', ItemTasksController.getTaskSummary);

module.exports = router;
