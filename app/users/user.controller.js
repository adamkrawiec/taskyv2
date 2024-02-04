const User = require('./user.model');
const { userDTO, fullUserDTO } = require('./user.dto');

const create = async (req, res) => {
  const userParams = {
    fullName: req.body.fullName,
    email: req.body.email
  };

  try {
    const user = await User.create(userParams);
    res.json(userDTO(user, req.currentUser));
  } catch({ errors }) {
    res.status(422).json({ errors });
  }
};

const findAll = (req, res) => {
  User.findAll().then((data) => {
    const users = data.map((user) => userDTO(user, req.currentUser));
    const links = {
      leaderboard: '/users/leaderboard'
    };
    res.json({ links, users });
  });
};

const findOne = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if(user) return res.json(fullUserDTO(user, req.currentUser));
  }
  catch(e) {
    res.status(404).send('not found');
  }
};

const updateOne = async (req, res) => {
  const userParams = {
    fullName: req.body.fullName,
    email: req.body.email
  };
  const user = await User.findByPk(req.params.id);

  if (!user) return res.status(404).send('not found');

  try {
    await user.update(userParams);
    res.json(userDTO(user, req.currentUser));
  } catch({ errors }) {
    res.status(422).json({ errors });
  }
};

const destroyOne = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  await user.destroy();
  res.status(204).send('ok');
};

module.exports = {
  create,
  findAll,
  findOne,
  updateOne,
  destroyOne
};
