const { getItemTasksSummary } = require('#app/items/item-tasks/item-task-summary');
const { createItem } = require('#factories/item.factory');
const { createList } = require('#factories/task.factory');

describe('ItemTaskSummary.service', () => {
  let item;
  let item2;
  let summary;

  beforeAll(async() => {
    item = await createItem();

    await createList(5, { item });
    await createList(3, { item, overdue: true });
    await createList(2, { item, completed: true });
  });

  describe('retuns summary of tasks, assigned to the item', () => {
    beforeAll(async () => {
      summary = await getItemTasksSummary(item.id);
    });

    it('returns count of all tasks', async () => {
      expect(summary.all).toEqual('10');
    });

    it('returns count of completed tasks', () => {
      expect(summary.completed).toEqual('2');

    });

    it('returns count of overdue tasks', () => {
      expect(summary.overdue).toEqual('3');
    });
  });

  describe('it does not mix in data for other item tasks', () => {
    beforeAll(async () => {
      item2 = await createItem();

      await createList(2, { item2, overdue: true });
      await createList(1, { item2, completed: true });

      summary = await getItemTasksSummary(item.id);
    });

    it('returns count of all tasks for the item', async () => {
      expect(summary.all).toEqual('10');
    });

    it('returns count of completed tasks for item', () => {
      expect(summary.completed).toEqual('2');

    });

    it('returns count of overdue tasks for item', () => {
      expect(summary.overdue).toEqual('3');
    });
  });
});
