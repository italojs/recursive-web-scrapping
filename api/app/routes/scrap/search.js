'use strict'

const { format } = require('util')
const rescue = require('express-rescue')

const factory = (service) => ([
  /**
   * Request handler
   * ===============
   */
  rescue(async (req, res) => {
    const {
      data,
      range,
      total,
      count
    } = await service.search(req.query)

    const status = total > count
      ? 206
      : 200

    if (status === 206) {
      const contentRange = format('results %s-%s/%s', range.from, range.to, total)

      res.append('Content-Range', contentRange)
    }

    res.status(status)
       .json(data)
  })
])

module.exports = { factory }
