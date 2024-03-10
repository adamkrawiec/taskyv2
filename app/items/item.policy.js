const { find }  = require('lodash');

const allowShow = async (user, item) => {
  if (user.type === 'admin') return true;

  let task = find(item.tasks, { userId: user.id });

  return item.visibility === 'all' ||
    (item.visibility === 'selected' && task) ||
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