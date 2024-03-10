const Item = require('./item.model');
const Task = require('#app/tasks/task.model');

const findItemByIdIncludeTaskForUser = async (id, user) => {
  let item = await Item.findByPk(
    id,
    {
      include: [
        Item.User,
        {
          model: Task,
          where: {
            userId: user && user.id,
          },
          limit: 1,
          required: false
        }
      ]
    }
  );
  return item;
};

module.exports = {
  findItemByIdIncludeTaskForUser
};