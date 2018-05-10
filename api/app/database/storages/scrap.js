'use strict'

const { pick } = require('lodash')

class ScrapStorage {
  /**
   * @param {Object} model Scrap model.
   */
  constructor (model) {
    this.$model = model
  }

  /**
   * Creates a new scrap
   * @param params scrap scheema
   * @returns {Promise<Object>}
   */
  async create (params) {
    const scrap = pick(params, [
      'url',
      'page.scrapped.url'
    ])
    return this.$model.create(scrap)
                      .then((document) => document.toObject())
  }

}

module.exports = ScrapStorage
