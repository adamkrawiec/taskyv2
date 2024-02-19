const Item = require('./item.model');

const setItem = async (req, res, next) => {
  if(req.params.id) {
    req.item = await Item.findByPk(req.params.id, { include: Item.User });
    return next();
  }

  return res.status(404).json({ message: 'Not found' });
};

const authorizeItem = (policy) => (req, res, next) => {
  if (req.item && policy(req.currentUser, req.item)) {
    return next();
  }

  if (policy(req.currentUser)) { return next(); }

  return res.status(403).json({ message: 'Forbidden' });
};

const permitItemParams = (req, res, next) => {
  const itemParams = {
    title: req.body.title,
    url: req.body.url,
    body: req.body.body,
    addedById: req.currentUser.id,
    visibility: req.body.visibility || 'hidden'
  };

  req.itemParams = itemParams;
  return next();
};

module.exports = {
  setItem,
  authorizeItem,
  permitItemParams
};