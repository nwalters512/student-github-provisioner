module.exports.getIdentity = req => {
  if (process.env.NODE_ENV === 'development') {
    // Fake data
    const netid = process.env.NETID || 'dev'
    return {
      name: 'Test User',
      email: `${netid}@illinois.edu`,
      netid,
    }
  }
  const email = req.get('eppn')
  if (!email || email.length === 0) {
    return null
  }
  const [netid] = email.split('@')
  const name = req.get('displayname') || null
  return { email, netid, name }
}

/**
 * Allows us to safely handle errors in async code without wrapping each route
 * handler in a try...catch block.
 */
module.exports.safeAsync = fn => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}
