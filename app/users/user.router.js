const express = require('express');
const userController = require('./user.controller');
const leaderboardController = require('./user-tasks/leaderboard.controller');
const { USER_PATH, LEADERBOARD_PATH } = require('./users.paths');
const router = express.Router();

router.post('/', userController.create);
router.get('/', userController.findAll);
router.get('/me', userController.me);
router.get(LEADERBOARD_PATH, leaderboardController.getLeaderboard);
router.get(USER_PATH, userController.findOne);
router.put(USER_PATH, userController.updateOne);
router.delete(USER_PATH, userController.destroyOne);

module.exports = router;
