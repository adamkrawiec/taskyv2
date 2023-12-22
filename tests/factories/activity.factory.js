const Activity = require('#app/activities/activity.model');
const { createUser } = require('./user.factory');
const { createItem } = require('./item.factory');

const createActivity = async ({ user, item, verb } = {}) => {
  user = user || await createUser();
  item = item || await createItem();
  let activityAttrs = {
    userId: user.id,
    itemId: item.id,
    verb: verb || 'viewed',
  };

  console.log(activityAttrs);

  return await Activity.create(activityAttrs);
};

module.exports = { createActivity };
