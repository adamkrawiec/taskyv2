const { faker } = require('@faker-js/faker');
const { Sequelize, Op } = require('sequelize');

const User = require("#app/users/user.model");
const Item = require ("#app/items/item.model");
const Task = require("#app/tasks/task.model");


User.findAll().then((users) => {
  users.map((user) => {
    Item.findAll({ order: Sequelize.literal('RANDOM()'), limit: 5 }).then((items) => {
      items.map((item) => {
        let days = Math.floor(Math.random() * 30 + 1);

        Task.create({
          userId: user.id,
          itemId: item.id,
          deadlineAt: faker.date.soon({ days })
        }).then(() => console.log("."))
      })
    });
  })
})

Task.findAll({
  where: { deadlineAt: { [Op.not]: null },
           completedAt: { [Op.is]: null } },
  limit: 50
}).then((tasks) => {
  tasks.map(async (task) => {
    let completedAt = task.deadlineAt.setDate(task.deadlineAt.getDate() + 10)
    task.update({ completedAt })
  })
});

Task.findAll({
  where: { deadlineAt: { [Op.not]: null },
           completedAt: { [Op.is]: null } },
  limit: 80
}).then((tasks) => {
  tasks.map(async (task) => {
    let completedAt = task.deadlineAt.setDate(task.deadlineAt.getDate() - 10)
    task.update({ completedAt })
  })
});
