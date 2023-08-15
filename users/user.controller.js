const User = require("./user.model");

const create = (req, res) => {
  const user = {
    fullName: req.body.fullName,
    email: req.body.email
  }
  User.create(user)
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send(err))
}

const findAll = (req, res) => {
  User.findAll().then((data) => res.send(data))
}

module.exports = {
  create,
  findAll
}
