const Activity = require('../activity.model');
const Item = require('#app/items/item.model');

const getLastCompletedItem = async(userId) => {
  try {
    let { itemId, createdAt } = await Activity.findOne({
      order: [['createdAt', 'DESC']],
      where: { userId, verb: 'completed' },
      raw: true,
      attributes: ['itemId', 'createdAt']
    }) || { itemId: null, createdAt: null };

    return itemId ? [await Item.findByPk(itemId), createdAt] : null;
  }
  catch(e) {
    return [null, null];
  }
};

module.exports = getLastCompletedItem;
