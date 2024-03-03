const express = require('express');
const ItemController = require('./item.controller');
const ItemTasksController = require('./item-tasks/item-tasks.controller');
const WebScraperRouter = require('./web-scraper/web-scraper.router');
const { addPageParams } = require('#middlewares/paginate');
const { authorizeSingle, authorizeCollection } = require("#middlewares/authorize");

const {
  setItem,
  permitItemParams
} = require('./item.middleware');

const {
  allowShow,
  allowEdit,
  allowIndex
} = require('./item.policy');

const router = express.Router();

router.route('/')
  .get(authorizeCollection(allowIndex), addPageParams, ItemController.index)
  .post(authorizeCollection(allowIndex), permitItemParams, ItemController.create);

router.use('/web-scrape/', WebScraperRouter);

router.route('/:id')
  .all(setItem)
  .get(authorizeSingle(allowShow), ItemController.show)
  .put(authorizeSingle(allowEdit), permitItemParams, ItemController.update);

router.get('/:id/tasks', setItem, authorizeSingle(allowShow), ItemTasksController.getTasks);
router.get('/:id/tasks/summary', setItem, authorizeSingle(allowShow), ItemTasksController.getTaskSummary);

module.exports = router;
