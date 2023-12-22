const express = require('express');
const ActivityController = require('./activity.controller');

const router = express.Router();

router.route('/').get(ActivityController.index);
router.route('/users/:userId').get(ActivityController.userActivities);

module.exports = router;
