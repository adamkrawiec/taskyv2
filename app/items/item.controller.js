const Item = require('./item.model');
const itemDTO = require('./item.dto');
const { VisibleItems } = require('./item.scope');

const index = async (req, res) => {
  const items = await VisibleItems(req.currentUser, req.query, req.perPage, req.offset);

  const itemsData = items.map((item) => itemDTO(item, req.currentUser));
  res.json( { items: itemsData });
};

const create = async(req, res) => {
  try {
    const item = await Item.create(req.itemParams);
    res.json({ item });
  } catch({ errors }) {
    res.status(422).json({ errors });
  }
};

const show = async(req, res) => {
  const item = req.item;

  if (req.query.include_task) {
    let tasks = await item.getTasks({ where: { userId: req.currentUser.id } });
    item.task = tasks[0];
  }

  res.json({ item: itemDTO(item, req.currentUser) });
};

const update = async(req, res) => {
  const item = req.item;

  try {
    await item.update(req.itemParams);
    res.json({ item });
  } catch({ errors }) {
    res.status(422).json({ errors });
  }
};



module.exports = {
  index,
  create,
  show,
  update,
};
