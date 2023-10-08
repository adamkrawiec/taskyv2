const express = require("express");
const ItemController = require("./item.controller");
const ItemTasksController = require("./item-tasks/item-tasks.controller");
const router = express.Router();

router.route("/").get(ItemController.index)
                 .post(ItemController.create);

router.route("/:id").get(ItemController.show)
                    .put(ItemController.update);

router.get("/:id/tasks", ItemTasksController.getTasks);
router.get("/:id/tasks/summary", ItemTasksController.getTaskSummary);

module.exports = router;
