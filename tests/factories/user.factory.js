const User = require('#app/users/user.model');
const { faker } = require('@faker-js/faker');
const { times } = require('lodash');

const createUser = async (attrs) => {
  let userAttrs = {
    fullName: faker.internet.userName(),
    email: faker.internet.email(),
    invitedAt: faker.date.past(),
    acceptedAt: faker.date.past(),
    type: (attrs && attrs.type) || 'learner',
  };

  return await User.create(userAttrs);
};

const createList = (count) => {
  return times(count, async() => { await createUser(); });
};

module.exports = {
  createUser,
  createList
};
