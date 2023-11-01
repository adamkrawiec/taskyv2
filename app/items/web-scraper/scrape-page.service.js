const ogs = require('open-graph-scraper');

const getOGFromUrl = async (url) => {
  const options = {
    url,
  }

  const { error, html, result, response } = await ogs(options)
  return result
}

module.exports = {
  getOGFromUrl
}
