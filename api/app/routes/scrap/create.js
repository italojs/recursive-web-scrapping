'use strict'

const rescue = require('express-rescue')
const { HttpError } = require('@mantris/appfy')
const Scrap = require('../../services/scrap')

const factory = (service) => ([

  /**
   * Request handler
   * ===============
   */
  rescue(async (req, res) => {
    const id = await service.create(req.body)

    res.status(201)
       .json({ id })
  })
])

module.exports = { factory }
