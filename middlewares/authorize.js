const authorizeSingle = (policy) => async (req, res, next) => {
  if(!req.currentUser) return res.status(404).send('');

  if(req.item && await policy(req.currentUser, req.item)) return next();

  return res.status(403).json({ message: 'Forbidden' });
};

const authorizeCollection = (policy) => (req, res, next) => {
  if(!req.currentUser) return res.status(404).send('');

  if (policy(req.currentUser)) return next();

  return res.status(403).json({ message: 'Forbidden' });
};

module.exports = {
  authorizeSingle,
  authorizeCollection
};