'use strict'

const env = require('sugar-env')

module.exports = {
  api: {
    url: env.get('API_URL')
  }
}
