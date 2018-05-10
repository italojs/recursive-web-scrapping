'use strict'

const inquirer = require('inquirer')
const Job = require('./job')
const config = require('./config')

const questions = [
  {
    type: 'input',
    name: 'link',
    message: 'input the start link: '
  }
]

/**
 * start the recursive job
 */
const start = async () => {
  const { link } = await inquirer.prompt(questions)
  const job = new Job()
  await job.run(link)
}


start()
  .then(() => { process.exit(0) })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })