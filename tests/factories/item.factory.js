const Item = require('#app/items/item.model');
const { faker } = require('@faker-js/faker');
const { times } = require('lodash');

const createItem = async () => {
  let itemAttrs = {
    title: faker.lorem.sentence(),
    body:  faker.lorem.paragraphs(3),
    url:   faker.internet.url()
  };

  return await Item.create(itemAttrs);
};

const createList = (count) => {
  return times(count, async() => { await createItem(); });
};

module.exports = {
  createItem,
  createList
};
