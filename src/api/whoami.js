const router = require('express').Router({
  mergeParams: true,
})

const { getIdentity } = require('./util')

router.get('/', (req, res) => {
  const identity = getIdentity(req)
  if (!identity) {
    res.status(401).send({
      error: 'Could not authorize',
    })
  } else {
    res.send(identity)
  }
})

module.exports = router
