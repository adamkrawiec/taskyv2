const { sequelize } = require('#db');
const Activity = require('../activity.model');
const Item = require('#app/items/item.model');

const getFavoriteItem = async(userId) => {
  try {
    let { itemId } =  await Activity.findOne({
      attributes: ['itemId', [sequelize.fn('count', sequelize.col('itemId')), 'count']],
      group : ['itemId'],
      order: sequelize.literal('count DESC'),
      where: { userId },
      raw: true
    }) || { itemId: null };

    return itemId ? await Item.findByPk(itemId) : null;
  }

  catch(e) {
    return null;
  }
};

module.exports = getFavoriteItem;
