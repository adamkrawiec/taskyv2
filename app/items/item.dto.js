const { userDTO } = require('#app/users/user.dto');

const getItemSource = (url) => {
  if(!url) return 'unknown';

  return new URL(url).hostname.replace('www.', '').split('.')[0];
};

const itemDTO = (item, currentUser) => {
  return {
    id: item.id,
    title: item.title,
    body: item.body,
    url: item.url,
    source: getItemSource(item.url),
    createdAt: item.createdAt.toDateString(),

    author: item.user && userDTO(item.user, currentUser),

    _links: {
      self: `/items/${item.id}`,
      tasks: `/items/${item.id}/tasks`
    }
  };
};

module.exports = itemDTO;
