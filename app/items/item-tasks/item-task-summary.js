const Task = require('#app/tasks/task.model');
const { sequelize } = require('#db');


const countCompletedTasksSql = `(
  SELECT COUNT(*)
  FROM tasks AS t
  WHERE "t"."completedAt" is not null and "t"."itemId" = "task"."itemId"
)`;

const countOverdueTasksSql = `(
  SELECT COUNT(*)
  FROM tasks AS t
  WHERE "t"."deadlineAt" > NOW() and "t"."completedAt" is null and "t"."itemId" = "task"."itemId"
)`;

const countAllTasksSql = `(
  SELECT COUNT(*)
  FROM tasks AS t
  WHERE "t"."itemId" = "task"."itemId"
)`;

const getItemTasksSummary = async (itemId) => {
  let summary = await Task.findOne({
    where: { itemId },
    attributes: {
      include: [
        [
          sequelize.literal(countCompletedTasksSql),
          'countComopleted'
        ],
        [
          sequelize.literal(countOverdueTasksSql),
          'countOverdue'
        ],
        [
          sequelize.literal(countAllTasksSql),
          'countAll'
        ]
      ]
    }
  });

  return {
    completed: summary.dataValues.countComopleted,
    overdue: summary.dataValues.countOverdue,
    all: summary.dataValues.countAll
  };
};

module.exports = { getItemTasksSummary };
