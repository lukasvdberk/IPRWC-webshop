const express = require('express')
const routesManager = require('./routes/routesManager')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');

// For environment variables
// require('dotenv').config()

const app = express()

app.use(bodyParser.json())
// enable files upload
app.use(fileUpload({
    createParentPath: true
}));


app.use('/', routesManager)


// default.conf port 3000
app.listen(process.env.API_PORT || 3000, "0.0.0.0")
