const { findItemByIdIncludeTaskForUser } = require('./item.repository');
const ItemSchema = require('./item.schema');
const { isNil } = require('lodash');

const setItem = async (req, res, next) => {
  if(isNil(req.currentUser)) return res.status(404).json({ message: 'Not found' });

  if(req.params.id) {
    const item = await findItemByIdIncludeTaskForUser(req.params.id, req.currentUser);
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