const express = require('express');

const batchActionsController = require('./batch-actions.controller');

const router = express.Router();

router.post('/', batchActionsController.batchAssign);

module.exports = router;
