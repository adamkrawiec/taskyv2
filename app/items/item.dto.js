const { userDTO } = require('#app/users/user.dto');

const itemDTO = (item, currentUser) => {
  return {
    id: item.id,
    title: item.title,
    body: item.body,
    url: item.url,
    createdAt: item.createdAt.toDateString(),

    author: item.user && userDTO(item.user, currentUser),

    _links: {
      self: `/items/${item.id}`,
      tasks: `/items/${item.id}/tasks`
    }
  };
};

module.exports = itemDTO;
