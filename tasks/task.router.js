const Task = require("./task.model");
const User = require("../users/user.model");
const express = require("express");

const taskDTO = require("./task.dto");

const router = express.Router();

router.get("/", async (req, res) => {
  let tasks = await Task.findAll( { include: User });
  tasks = tasks.map((task) => taskDTO(task));

  res.json({ data: tasks });
});

router.post("/", async (req, res) => {
  const deadlineAt = req.body.deadline && new Date(req.body.deadline);

  const taskParams = {
    userId: req.body.user_id,
    title: req.body.title,
    body: req.body.body,
    deadlineAt: req.body.deadline,
  }

  try {
    const task = await Task.create(taskParams);
    res.json(task);
  } catch({ errors }) {
    res.status(422).json({ errors })
  }
})

router.get("/user/:userId", async (req, res) => {
  const user = await User.findByPk(req.params.userId);

  let tasks = await user.getTasks({ include: User });
  tasks = tasks.map((task) => taskDTO(task));

  res.json({ data: tasks });
})

module.exports = router;
