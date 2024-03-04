const Item = require('./item.model');
const ItemSchema = require('./item.schema');

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
  const itemParams = {
    title: req.body.title,
    url: req.body.url,
    body: req.body.body,
    addedById: req.currentUser.id,
    visibility: req.body.visibility || 'hidden'
  };

  let errors = ItemSchema.validate(itemParams).error;
  if(errors) return res.status(400).json( { errors: errors.details });
  
  req.itemParams = itemParams;
  return next();
};

module.exports = {
  setItem,
  permitItemParams
};