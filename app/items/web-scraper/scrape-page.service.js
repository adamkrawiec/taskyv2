const ogs = require('open-graph-scraper');

const getOGFromUrl = async (url) => {
  const options = {
    url,
  };

  const { result } = await ogs(options);
  return result;
};

module.exports = {
  getOGFromUrl
};
