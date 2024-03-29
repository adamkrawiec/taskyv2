const Activity = require('./activity.model');
const activityDTO = require('./activity.dto');
const getFavoriteItem = require('./services/get-favorite-item');
const getLastCompletedItem = require('./services/get-last-completed-item');

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
    const activity = await Activity.create(activityParams);
    activity.user = await activity.getUser();
    activity.item = await activity.getItem();

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
    data: serializeActivities(activities)
  });
};

const lastCompleted = async(req, res) => {
  const [item, completedAt] = await getLastCompletedItem(req.params.userId);
  res.json( { item, completedAt });
};

const favoriteItem = async(req, res) => {
  const item = await getFavoriteItem(req.params.userId);
  res.json( { item });
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
  lastCompleted,
  favoriteItem,
};
