const express = require('express');
const ActivityController = require('./activity.controller');

const router = express.Router();

router.route('/')
  .get(ActivityController.index)
  .post(ActivityController.create);

router.route('/user/:userId').get(ActivityController.userActivities);
router.route('/user/:userId/last_completed').get(ActivityController.lastCompleted);
router.route('/user/:userId/favorite_item').get(ActivityController.favoriteItem);

module.exports = router;
