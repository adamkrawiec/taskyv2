const { faker } = require('@faker-js/faker');
const User = require('#app/users/User.model');

const createRandomUser = async () => {
  let userAttrs = {
    fullName: faker.internet.userName(),
    email: faker.internet.email(),
    invitedAt: faker.date.past(),
    acceptedAt: faker.date.past(),
  };

  return await User.create(userAttrs);
};

faker.helpers.multiple(createRandomUser, { count: 50 });
