const Activity = require('./activity.model');
const activityDTO = require('./activity.dto');
const addActivityCompleted = require('./services/add-activity-completed');

const index = async(req, res) => {
  const activities = await Activity.findAll({
    include: [Activity.Item, Activity.User],
    where: activitiesQuery(req)
  });

  res.json({
    activities: serializeActivities(activities)
  });
};

const create = async(req, res) => {
  const activityParams = {
    userId: req.body.user_id,
    itemId: req.body.item_id,
    verb: req.body.verb
  };

  try {
    const activity = addActivityCompleted(activityParams);
    res.json(activityDTO(activity));
  } catch (err) {
    res.status(422).json({ err });
  }
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
  if(query.itemId) conditions.itemId = query.item_id;
  if(query.userId) conditions.userId = query.user_id;

  return conditions;
};

module.exports = {
  index,
  create,
  userActivities,
};
