const { userDTO } = require('#app/users/user.dto');
const itemDTO = require('#app/items/item.dto');

module.exports = (activity) => {
  return {
    id: activity.id,
    verb: activity.verb,
    createdAt: activity.createdAt,
    item: itemDTO(activity.item),
    user: userDTO(activity.user)
  };
};
