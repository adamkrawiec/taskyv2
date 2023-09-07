const Task = require("./task.model");
const User = require("../users/user.model");
const TaskMailer = require("./task.mailer");

const create = async (req, res) => {
  const deadlineAt = req.body.deadline && new Date(req.body.deadline);
  const user = await User.findByPk(req.body.user_id);

  const taskParams = {
    userId: req.body.user_id,
    title: req.body.title,
    body: req.body.body,
    deadlineAt: req.body.deadline,
  }

  try {
    const task = await Task.create(taskParams);
    await TaskMailer.emailCreated(task, user, req.t);
    res.json(task);
  } catch(errors) {
    res.status(422).json({ errors })
  }
};

module.exports = {
  create,
}
