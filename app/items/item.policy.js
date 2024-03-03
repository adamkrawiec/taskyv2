const allowShow = (user, item) => {
  if (user.type === 'admin') return true;

  // add condition for visibility == 'selected' and having task
  return item.visibility === 'all' ||
    item.addedById === user.id;
};

const allowEdit = (user, item) => {
  if (user.type === 'admin') return true;

  return item.addedById === user.id;
};

const allowIndex = (user) => user;

module.exports = {
  allowShow,
  allowEdit,
  allowIndex
};