const Task = require("./task.model");
const User = require("../users/user.model");
const express = require("express");
const taskDTO = require("./task.dto");

const tasksController = require("./tasks.controller");
const router = express.Router();

router.get("/", async (req, res) => {
  let tasks = await Task.findAll( { include: User });
  tasks = tasks.map((task) => taskDTO(task));

  res.json({ data: tasks });
});

router.post("/", tasksController.create)

router.get("/user/:userId", async (req, res) => {
  const user = await User.findByPk(req.params.userId);

  let tasks = await user.getTasks({ include: User });
  tasks = tasks.map((task) => taskDTO(task));

  res.json({ data: tasks });
})

module.exports = router;
