const express = require('express');
const ItemController = require('./item.controller');
const ItemTasksController = require('./item-tasks/item-tasks.controller');
const WebScraperRouter = require('./web-scraper/web-scraper.router');
const { addPageParams } = require('#middlewares/paginate');

const {
  setItem,
  authorizeItem,
  permitItemParams
} = require('./item.middleware');

const {
  allowShow,
  allowEdit,
  allowIndex
} = require('./item.policy');

const router = express.Router();

router.route('/')
  .get(authorizeItem(allowIndex), addPageParams, ItemController.index)
  .post(permitItemParams, ItemController.create);

router.use('/web-scrape/', WebScraperRouter);

router.route('/:id')
  .all(setItem)
  .get(authorizeItem(allowShow), ItemController.show)
  .put(authorizeItem(allowEdit), permitItemParams, ItemController.update);

router.get('/:id/tasks', setItem, authorizeItem(allowShow), ItemTasksController.getTasks);
router.get('/:id/tasks/summary', setItem, authorizeItem(allowShow), ItemTasksController.getTaskSummary);

module.exports = router;
