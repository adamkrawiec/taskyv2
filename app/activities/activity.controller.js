const Activity = require('./activity.model');
const activityDTO = require('./activity.dto');

const index = async(req, res) => {
  const activities = await Activity.findAll({
    include: [Activity.Item, Activity.User],
    where: activitiesQuery(req)
  });

  res.json({
    activities: serializeActivities(activities)
  });
};

const userActivities = async(req, res) => {
  const activities = await Activity.findAll({
    include: [Activity.Item, Activity.User],
    where: { userId: req.params.userId }
  });

  res.json({
    activities: serializeActivities(activities)
  });
};

const serializeActivities = (activities) => activities.map((activity) => activityDTO(activity));

const activitiesQuery = ({ query }) => {
  let conditions = {};
  if(query.verb) conditions.verb = query.verb;
  if(query.itemId) conditions.itemId = query.itemId;
  if(query.userId) conditions.userId = query.userId;

  return conditions;
};

module.exports = {
  index,
  userActivities,
};
