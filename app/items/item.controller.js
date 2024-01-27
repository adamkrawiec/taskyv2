const Item = require('./item.model');
const itemDTO = require('./item.dto');
const User = require('#app/users/user.model');
const { Op } = require('sequelize');

const index = async (req, res) => {
  const conditions = [];
  const perPage = req.query.perPage ? req.query.perPage : 10;
  const offset = req.query.page ? (req.query.page - 1) * perPage : 0;

  if(req.query.title) {
    conditions.push(
      {
        title: { [Op.iLike]: `%${req.query.title}%` }
      }
    );
  }

  const { count, rows } = await Item.findAndCountAll({
    where: conditions,
    include: User,
    limit: perPage,
    offset,
  });

  const items = rows.map((item) => itemDTO(item, req.currentUser));

  const pagination = {
    totalCount: count,
    page: req.query.page,
    pages: Math.ceil(parseFloat(count) / perPage)
  };
  res.json( { items, pagination });
};

const create = async(req, res) => {
  try {
    const item = await Item.create(itemParams(req));
    res.json({ item });
  } catch({ errors }) {
    res.status(422).json({ errors });
  }
};

const show = async(req, res) => {
  const item = await findItem(req.params.id, { include: [User]});

  if (req.query.include_task) {
    let tasks = await item.getTasks({ where: { userId: req.currentUser.id } });
    item.task = tasks[0];
  }

  res.json({ item: itemDTO(item, req.currentUser) });
};

const update = async(req, res) => {
  const item = await findItem(req.params.id);

  try {
    item.update(itemParams(req));
    res.json({ item });
  } catch({ errors }) {
    res.status(422).json({ errors });
  }
};

const findItem = async (id) => await Item.findByPk(id, { include: User });

const itemParams = (req) => {
  return {
    title: req.body.title,
    url: req.body.url,
    body: req.body.body,
    addedById: req.currentUser.id,
    visibility: req.body.visibility || 'hidden'
  };
};


module.exports = {
  index,
  create,
  show,
  update,
};
