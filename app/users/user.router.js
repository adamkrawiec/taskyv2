const express = require('express');
const userController = require('./user.controller');
const leaderboardController = require('./user-tasks/leaderboard.controller');
const { USER_PATH, LEADERBOARD_PATH } = require('./users.paths');
const router = express.Router();


/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the user.
 *         fullName:
 *           type: string
 *           description: The user's full name.
 *         email:
 *           type: string
 *           description: The user's email.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the user was created.
 *           example: 2021-09-01T00:00:00.000Z
 *         type:
 *           type: string
 *           description: The user's type.
 *           example: admin
 */

/** GET Methods */
/**
 * @openapi
 * '/users':
 *  get:
 *     tags:
 *     - Users Controller
 *     summary: Get a list of users
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
 *                    $ref: '#/components/schemas/User'
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 * '/users/{id}':
 *  get:
 *    tags:
 *     - Users Controller 
 *    summary: Get a single user
 *    responses:
 *      200:
 *        description: Fetched Successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 */

router.post('/', userController.create);
router.get('/', userController.findAll);
router.get('/me', userController.me);
router.get(LEADERBOARD_PATH, leaderboardController.getLeaderboard);
router.get(USER_PATH, userController.findOne);
router.put(USER_PATH, userController.updateOne);
router.delete(USER_PATH, userController.destroyOne);

module.exports = router;
