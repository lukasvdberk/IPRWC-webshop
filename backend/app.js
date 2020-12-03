const express = require('express')
const routesManager = require('./routes/routesManager')
const bodyParser = require('body-parser')
const Database =  require('./dao/database')

// For environment variables
require('dotenv').config()

const app = express()

app.use(bodyParser.json())
app.use('/', routesManager)


// default port 3000
app.listen(process.env.API_PORT || 3000)