const Task = require("./task.model");
const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  const tasks = await Task.findAll();
  res.send(tasks);
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


module.exports = router;
