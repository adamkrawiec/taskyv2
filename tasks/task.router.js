const express = require("express");

const tasksController = require("./tasks.controller");

const router = express.Router();

router.get("/", tasksController.index);
router.get("/:id", tasksController.showById);
router.get("/user/:userId", tasksController.showByUserId);

router.post("/", tasksController.create);

module.exports = router;
