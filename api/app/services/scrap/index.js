'use strict'

const axios = require('axios')
const BaseError = require('./errors/base-error')
const NotFoundError = require('./errors/not-found-error')

const DEFAULT_PAGINATION_LIMIT = 50
const DEFAULT_PAGINATION_OFFSET = 0

/**
 * scrap's service class
 */
class ScrapService {
  /**
  * Construtor's class
  */
  constructor (scrapStorage, scrapRepository) {
    this.$scrapStorage = scrapStorage
    this.$scrapRepository = scrapRepository
  }

  /**
  * Create a scrap
  * @param {Object} properties 
  */
  async create (properties) {
    const result = await this.$scrapStorage.create(properties)
    return result._id
  }

  /**
   * Searches scrap using criteria to filter.
   * @param {Object} criteria                 Object containing search criteria
   to filter.
   * @param {Number} criteria.limit           Pagination limit of response
   items.
   * @param {Number} criteria.offset          Pagination offset.
   * @param {String} criteria.filter          A field to filter internal
   */
  async search (criteria) {
    const {
      types = [],
      groups = [],
      statuses = [],
      filter = null
    } = criteria

    const limit = parseInt(criteria.limit || DEFAULT_PAGINATION_LIMIT)
    const offset = parseInt(criteria.offset || DEFAULT_PAGINATION_OFFSET)

    const { data, total } = await this.$repository.search({
      types,
      limit,
      filter,
      groups,
      offset,
      statuses
    })

    const count = data.length

    const range = {
      from: offset,
      to: offset + count
    }

    return { data, total, count, range }
  }
}

module.exports = ScrapService
module.exports.BaseError = BaseError
module.exports.ScrapService = ScrapService
module.exports.NotFoundError = NotFoundError
