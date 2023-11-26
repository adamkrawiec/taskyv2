const { countTasks } = require('../task.repository');
const { sequelize } = require('#db');

// there could be a separate file that would define those raw queries
const selectStatus = `
(case
   when (task."deadlineAt" < Now() and task."completedAt" is null) then 'overdue'
   when (task."completedAt" is not null) then 'completed'
   else 'open'
   end)`;

const getSummary = async (req) => {
  let taskStatusAttribute = [sequelize.literal(selectStatus), 'status'];
  return await countTasks({ query: req.query, attributes: [taskStatusAttribute], group: 'status' });
};


module.exports = { getSummary };
