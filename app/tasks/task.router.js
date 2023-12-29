const express = require('express');

const tasksController = require('./tasks.controller');
const taskUsersController = require('./task-users/task-users.controller');
const { MY_TASKS_PATH, SUMMARY_TASKS_PATH } = require('./tasks.paths');
const batchActionsRouter = require('./batch-actions/batch-actions.router');

const router = express.Router();

router.route('/').
  get(tasksController.index).
  post(tasksController.create);

router.get(MY_TASKS_PATH, tasksController.myTasks);
router.get(SUMMARY_TASKS_PATH, tasksController.summary);
router.get('/user/:userId', taskUsersController.index);

router.route('/:id').get(tasksController.showById)
  .put(tasksController.update)
  .delete(tasksController.destroy);

router.patch('/:id/complete', tasksController.complete);

router.use('/batch-actions', batchActionsRouter);

module.exports = router;
