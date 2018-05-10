'use strict'

const { omitBy } = require('lodash')

/**
 * Makes the query to search
 * @param {Object} criteria                 Object containing search criteria
 * @return {object}                         Query for search
 */
const makeQuery = ({ filter }) => {
  const filterRegex = new RegExp(filter)

  const query = omitBy({
    $or: filter ? [
      { '_id': filterRegex },
      { 'url': filterRegex },
      { 'scrapped.url': filterRegex },
      { 'scrapped._id': filterRegex }
    ] : null
  }, (field) => !field)


  return query
}

class ScrapRepository {
  /**
   * @param {Object} model scrap model.
   */
  constructor (model) {
    this.$model = model
  }

  /**
   * Searches exams using criteria to filter.
   * @param {Object} criteria                 Object containing search criteria
                                              to filter.
   * @param {Number} criteria.limit           Pagination limit of response
                                              items.
   * @param {Number} criteria.offset          Pagination offset.
   * @param {String} criteria.filter          A field to filter internal
   * @return {Object}
   */
  async search (criteria) {
    const {
      limit = null,
      offset = null,
      filter = null
    } = criteria

    const query = makeQuery({ filter })

    const total = await this.$model.count(query)

    if (total === 0) {
      return { data: [], total }
    }

    const data = await this.$model.find(query)
                                  .skip(offset)
                                  .limit(limit)
                                  .lean()

    return { data, total }
  }
}

module.exports = ScrapRepository
