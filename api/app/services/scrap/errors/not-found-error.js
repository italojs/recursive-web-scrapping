'use strict'

const Error = require('./base-error')
const { format } = require('util')

const ERR_MESSAGE = 'the "%s" id\'s exam not found'

class NotFoundError extends Error {
  constructor (id) {
    super(format(ERR_MESSAGE, id))
  }
}

module.exports = NotFoundError
