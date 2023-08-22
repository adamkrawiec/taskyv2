const User = require("./user.model");
const { userDTO } = require("./user.dto");

const create = async (req, res) => {
  const userParams = {
    fullName: req.body.fullName,
    email: req.body.email
  }

  const user = await User.create(userParams);
  res.json(userDTO(user));
}

const findAll = (req, res) => {
  User.findAll().then((data) => {
    const users = data.map((user) => userDTO(user));
    res.json(users)
  })
}

const findOne = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  res.json(userDTO(user))
}

const updateOne = async (req, res) => {
  const userParams = {
    fullName: req.body.fullName,
    email: req.body.email
  }
  const user = await User.findByPk(req.params.id);
  user.update(userParams);
  res.json(userDTO(user));
}

const destroyOne = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  await user.destroy();
  res.status(204);
}

module.exports = {
  create,
  findAll,
  findOne,
  updateOne,
  destroyOne,
}
