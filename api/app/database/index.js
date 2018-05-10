'use strict'

const mongoose = require('mongoose')
const merge = require('lodash.merge')

/**
 * Models
 * ======
 */
const ScrapModel = require('./models/scrap')

/**
 * Repositories
 * ========
 */
const ScrapRepository = require('./repositories/scrap')

/**
 * Storages
 * ========
 */
const ScrapStorage = require('./storages/scrap')

/**
 * Constants
 * =========
 */
const DEFAULT_OPTIONS = {
  poolSize: 10,
  keepAlive: 120,
  reconnectTries: 30,
  bufferMaxEntries: 0,
  bufferCommands: false,
  reconnectInterval: 500,
  promiseLibrary: Promise
}

/**
 * Initiates everything related to database usage such as connection, models and
 * repositories.
 * @param  {String} config.url     MongoDB connection string.
 * @param  {Object} config.options MongoDB Client options.
 * @return {Object}                Object containing instantiated repositories.
 */
const factory = (config) => {
  const { url, options } = merge({ options: DEFAULT_OPTIONS }, config)

  const connection = mongoose.createConnection(url, options)

  const models = {
    scrap: ScrapModel.factory(connection)
  }

  const storages = {
    scrap: new ScrapStorage(models.scrap),
  }

  const repositories = {
    repository: new ScrapRepository(models.scrap)
  }

  return  { repositories, storages }
}

module.exports = { factory }
