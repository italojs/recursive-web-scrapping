'use strict'

const axios = require('axios')
const config = require('../config')
const cheerio = require('cheerio')

/**
 * 
 * @param { Object } err axios error response
 */
const errHandler = (err) => {
  if (err.response.status === 404) {
    console.log('request 404 response: ', err.response.message)
  }
}

/**
 * Job's class
 */
class Job {

  /**
   * @param { string } startUrl url that will startt the recursive process
   * @return null
   */
  async run (startUrl) {
    const urls = []
    const html = await axios.get(startUrl)
                            .catch(errHandler)

    const $ = cheerio.load(html)
    const links = $('a')

    $(links).each(function(i, link){
      urls.push($(this).attr('href'))
    })

    const content = {
      url: startUrl,
      scrapped: {
        urls
      }
    }
                    
    await axios.post(config.api.url, content)
               .catch(errHandler)
    urls.map(url => {
      run(url)
    })
  }
}
module.exports = Job