const express = require("express");

const tasksController = require("./tasks.controller");

const router = express.Router();

router.route("/").get(tasksController.index)
                 .post(tasksController.create);

router.route("/:id").get(tasksController.showById)
                    .put(tasksController.update)
                    .delete(tasksController.destroy);

router.patch("/:id/complete", tasksController.complete);

router.get("/my", tasksController.myTasks);
router.get("/summary", tasksController.summary);
router.get("/user/:userId", tasksController.showByUserId);

module.exports = router;
