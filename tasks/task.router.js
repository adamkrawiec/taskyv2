const Task = require("./task.model");
const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  const tasks = await Task.findAll();
  res.send(tasks);
});

module.exports = router;
