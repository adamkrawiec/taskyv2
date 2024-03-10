
/**
 * @openapi
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the item.
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
 *           enum: [hidden, selected, all]
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the item was created.
 *           example: 2021-09-01T00:00:00.000Z
 *         author:
 *           $ref: '#/components/schemas/User'
 */

/** GET Methods */
/**
 * @openapi
 * '/items':
 *  get:
 *     tags:
 *     - Items Controller
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
 *   tags:
 *     - Items Controller
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
 * '/items/{id}':
 *  get:
 *    tags:
 *     - Items Controller 
 *    summary: Get a single item
 *    parameters:
 *      - name: include_tasks
 *        in: query
 *        description: Allows to include tasks in the response
 *    responses:
 *      200:
 *        description: Fetched Successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Item'
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
