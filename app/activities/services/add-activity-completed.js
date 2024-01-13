const Activity = require('../activity.model');
const Task = require('#app/tasks/task.model');
const { completeTask } = require('#app/tasks/services/complete-task.service');
const { sequelize }  = require('#db');

const addActivityCompleted = async (activityParams) => {
  const t = await sequelize.transaction();
  try {
    const activity = await Activity.create(activityParams);
    activity.user = await activity.getUser();
    activity.item = await activity.getItem();

    const tasks = await Task.findAll({
      where: {
        completedAt: null,
        userId: activity.userId,
        itemId: activity.itemId
      }
    });

    if(tasks.length > 0) {
      tasks.map(async (task) => await completeTask(task.id));
    }

    await t.commit();
    return activity;
  } catch(e) {
    await t.rollback();
    return e;
  }
};

module.exports = addActivityCompleted;
