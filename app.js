const http = require('http')
const bodyParser = require('body-parser')
const express = require('express')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.listen(3000)
