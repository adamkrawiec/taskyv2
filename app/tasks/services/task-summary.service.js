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
  let summary = await countTasks({ query: req.query, attributes: [taskStatusAttribute], group: 'status' });

  const findDataPointCount = (status) => {
    let summaryData = summary.find((dp) => dp.status === status)
    return summaryData && summaryData.count
  }

  return [
    { status: 'completed', count: findDataPointCount("completed") || 0 },
    { status: 'open', count: findDataPointCount("open") || 0 },
    { status: 'overdue', count: findDataPointCount("overdue") || 0 },
  ]
};


module.exports = { getSummary };
