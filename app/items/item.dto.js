const { userDTO } = require("#app/users/user.dto");

const itemDTO = (item) => {
  return {
    id: item.id,
    title: item.title,
    body: item.body,
    url: item.url,
    createdAt: item.createdAt,

    author: item.user && userDTO(item.user),

    _links: {
      self: `/items/${item.id}`,
    }
  }
}

module.exports = itemDTO;
