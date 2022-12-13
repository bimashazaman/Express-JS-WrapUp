/* A built-in module that helps us to work with paths. */
const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')

const errorController = require('./controllers/error')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

/* Telling the server to use the bodyParser middleware to parse the body of the request. */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

/* Telling the server to use the adminRoutes and shopRoutes for the /admin and /shop routes
respectively. */
app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use(errorController.get404)

app.listen(3000)
