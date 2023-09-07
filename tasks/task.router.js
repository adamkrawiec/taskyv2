const Task = require("./task.model");
const User = require("../users/user.model");
const express = require("express");
const taskDTO = require("./task.dto");

const tasksController = require("./tasks.controller");
const router = express.Router();

router.get("/", tasksController.index);
router.get("/:id", tasksController.showById);
router.get("/user/:userId", tasksController.showByUserId);

router.post("/", tasksController.create);

module.exports = router;
