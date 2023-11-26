const TaskSummary = require('#app/tasks/services/task-summary.service');

const getItemTasksSummary = async (itemId) => {
  let summaryData = await TaskSummary.getSummary({ query: { item_id: itemId } });
  let summary = {};

  summaryData.map((dataPoint) => summary[dataPoint.status] = dataPoint.count);
  return summary;
};

module.exports = { getItemTasksSummary };
