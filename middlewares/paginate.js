const addPageParams = (req, res, next) => {
  const perPage = req.query.perPage ? req.query.perPage : 10;
  const offset = req.query.page ? (req.query.page - 1) * perPage : 0;

  req.perPage = perPage;
  req.offset = offset;
  next();
};

module.exports = {
  addPageParams
};