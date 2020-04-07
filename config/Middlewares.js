const bodyParser = require('body-parser')
const cors = require('cors')

module.exports = app => {
  app.use(bodyParser.json({ limit: "50mb" }))
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
  app.use(cors())
}