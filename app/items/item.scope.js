const Item = require('#app/items/item.model');
const Task = require('#app/tasks/task.model');
const { Op } = require('sequelize');

const VisibleItems = async (user, query, perPage, offset) => {
  const conditions = {};
  if(query.title) {
    conditions.title = { [Op.iLike]: `%${query.title}%` };
  }
  if(user.type === 'admin') {
    return await Item.findAll({
      where: conditions,
      limit: perPage,
      offset
    });
  }

  let taskedItemIds = await Task.findAll({
    attributes: ['itemId'],
    where: { userId: user.id },
    raw: true
  });
  
  console.log(
    {
      where: { 
        [Op.or]: [
          { visibility: 'all' },
          { visibility: 'selected', id: {
            [Op.in]: taskedItemIds.map((task) => task.itemId)
          } }
        ],
        ...conditions,
      }
    }
  );
  return await Item.findAll({
    where: { 
      [Op.or]: [
        { visibility: 'all' },
        { visibility: 'selected', id: {
          [Op.in]: taskedItemIds.map((task) => task.itemId)
        } }
      ],
      ...conditions,
    },
    limit: perPage,
    offset,
  });
};

module.exports = { VisibleItems };