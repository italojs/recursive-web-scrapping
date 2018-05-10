'use strict'

const routes = require('./routes')
const database = require('./database')
const appfy = require('@mantris/appfy')
const ScrapService = require('./services/scrap')

/**
 * Application setup.
 * @param  {Object} api                 Express instance.
 * @param  {Object} options.config      Application configs.
 */
const setup = (api, { config }) => {
  const { repositories, storages } = database.factory(config.mongodb)

  const services = {
    scrap: new ScrapService(storages.scrap, repositories.scrap)
  }

  api.post('/', routes.scrap.create.factory(services.scrap)) 
}

/**
 * Application factory.
 * @type {Function}
 */
const factory = appfy(setup)

module.exports = { factory }
