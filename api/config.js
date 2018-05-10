'use strict'

const env = require('sugar-env')

module.exports = {
  mongodb: {
    url: env.get('MONGODB_URL')
  }
}
