const config = require('../knexfile.js')

let config_db = process.env.NODE_ENV === 'test' ? config.test : config.development

const knex = require('knex')(config_db)

module.exports = knex