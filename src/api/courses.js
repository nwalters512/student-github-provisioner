const router = require('express').Router({
  mergeParams: true,
})

const config = require('../config')

router.get('/', (req, res, next) => res.send(config.courses || []))

module.exports = router
