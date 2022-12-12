const express = require('express')

const router = express.Router()

router.get('/', (req, res, next) => {
  console.log('In another middleware!')
  next()
})

module.exports = router
