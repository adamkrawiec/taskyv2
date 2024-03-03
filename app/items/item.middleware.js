const Item = require('./item.model');

const setItem = async (req, res, next) => {
  if(req.params.id) {
    let item = await Item.findByPk(req.params.id, { include: Item.User });
    if(item){
      req.item = item;
      return next();
    }
  }

  return res.status(404).json({ message: 'Not found' });
};

const permitItemParams = (req, res, next) => {
  if(!req.body.title) return res.status(401).json( { title: "mising" });

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
  permitItemParams
};