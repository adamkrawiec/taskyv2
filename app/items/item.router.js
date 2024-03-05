
/**
 * @openapi
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The item's title.
 *           example: NodeJS basic course
 *         body:
 *           type: string
 *         url:
 *           type: string
 *           example: www.example.com/node-js
 *         visibility:
 *           type: string,
 *           example: all
 */

/** GET Methods */
/**
 * @openapi
 * '/items':
 *  get:
 *     tags:
 *     - Item Controller
 *     summary: Get a list of items
 *     parameters:
 *      - name: title
 *        in: query
 *        description: title of item you're searching for
 *     responses:
 *      200:
 *        description: Fetched Successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Item'
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 *  post:
 *   summary: Create a new item
 *   requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - title
 *              - body
 *              - url
 *              - visbility
 *            properties:
 *              title:
 *                type: string
 *              body:
 *                type: string
 *              url:
 *                type: string
 *              visibility:
 *                type: string
 *                enum: [hidden, selected, all]
 */
const express = require('express');
const ItemController = require('./item.controller');
const ItemTasksController = require('./item-tasks/item-tasks.controller');
const WebScraperRouter = require('./web-scraper/web-scraper.router');
const { addPageParams } = require('#middlewares/paginate');
const { authorizeSingle, authorizeCollection } = require('#middlewares/authorize');

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
