const TaskRepository = require("#app/tasks/task.repository");
const { createTask } = require("#factories/task.factory");
const { createItem } = require("#factories/item.factory");
const { createUser } = require("#factories/user.factory");
const { faker } = require('@faker-js/faker');

describe("TaskRepository", () => {
  let item;
  let task;
  let taskCompleted;
  let taskOverdue;
  let taskwithItem;
  let user;
  let req = { query: {} };

  beforeAll(async () => {
    item = await createItem();
    task = await createTask();
    user = await createUser();
    taskCompleted = await createTask({ completed: true });
    taskOverdue = await createTask({ overdue: true });
    taskwithItem = await createTask({ item });
    taskwithUser = await createTask({ user });
  });

  describe("findTasks", () => {
    it("it returns all tasks by default", async () => {
      let tasks = await TaskRepository.findTasks(req, {});
      let taskIds = tasks.map((t) => t.id);
      let allTaskIds = [task,
                        taskCompleted,
                        taskOverdue,
                        taskwithItem,
                        taskwithUser].map((t) => t.id);

      expect(taskIds).toEqual(expect.arrayContaining(allTaskIds));
    });

    it("it returns tasks assigned to the item provided", async () => {
      let tasks = await TaskRepository.findTasks({ query: { item_id: item.id }}, {});
      let taskIds = tasks.map((t) => t.id);

      expect(taskIds).toContain(taskwithItem.id);
      expect(taskIds).not.toContain(taskCompleted.id);
    });

    it("it returns tasks assigned to the user provided", async () => {
      let tasks = await TaskRepository.findTasks({ query: { user_id: user.id }}, {});
      let taskIds = tasks.map((t) => t.id);

      expect(taskIds).toContain(taskwithUser.id);
      expect(taskIds).not.toContain(taskCompleted.id);
    });

    it("it returns completed tasks", async () => {
      let tasks = await TaskRepository.findTasks({ query: { completed: true }}, {});
      let taskIds = tasks.map((t) => t.id);

      expect(taskIds).toContain(taskCompleted.id);
      expect(taskIds).not.toContain(taskOverdue.id);
    });

    it("it returns tasks with deadline before", async () => {
      let tasks = await TaskRepository.findTasks(
        { query: {
            deadline_before: faker.date.past({ days: 1 })
          }
        }
      );

      let taskIds = tasks.map((t) => t.id);

      expect(taskIds).toContain(taskOverdue.id);
      expect(taskIds).not.toContain(task.id);
    });

    it("it returns tasks with deadline after", async () => {
      let tasks = await TaskRepository.findTasks(
        { query: {
            deadline_after: faker.date.past({ days: 1 })
          }
        }
      );

      let taskIds = tasks.map((t) => t.id);

      expect(taskIds).not.toContain(taskOverdue.id);
      expect(taskIds).toContain(task.id);
    });
  });
});
