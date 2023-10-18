const express = require("express");

const batchActionsController = require("./batch-actions.controller");

const router = express.Router();

router.post("/", batchActionsController.batchAssign)
router.put("/", batchActionsController.batchUpdate)
router.delete("/", batchActionsController.batchDelete)

module.exports = router;
