
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./solo-ui.cjs.production.min.js')
} else {
  module.exports = require('./solo-ui.cjs.development.js')
}
