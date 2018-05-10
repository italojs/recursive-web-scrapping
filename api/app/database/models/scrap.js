'use strict'

const { Schema } = require('mongoose')

const properties = {
  url: {
    type: String,
    required: true
  },
  scrapped: [{
    url: {
      type: String,
      required: true
    }
  }]
}

const options = {
  id: false,
  collection: 'scrap',
  strict: true,
  safe: true,
  timestamps: false,
  versionKey: false
}

const schema = new Schema(properties, options)

const factory = (connection) => {
  return connection.model('Scrap', schema)
}

module.exports = schema
module.exports.factory = factory
