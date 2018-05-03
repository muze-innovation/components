// eslint-disable-next-line no-underscore-dangle
if (!global._babelPolyfill) {
  // eslint-disable-next-line global-require
  require('babel-polyfill')
}

const run = require('./run')
const utils = require('./utils')

module.exports = {
  ...utils,
  run
}
