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
    let summaryData = summary.find((dp) => dp.status === status);
    return summaryData && summaryData.count;
  };

  let completed = findDataPointCount('completed') || 0;
  let open = findDataPointCount('open') || 0;
  let overdue = findDataPointCount('overdue') || 0;

  return [
    { status: 'completed', count: completed },
    { status: 'open', count: open + overdue },
    { status: 'overdue', count: overdue },
  ];
};


module.exports = { getSummary };
