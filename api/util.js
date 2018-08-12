module.exports.getIdentity = (req) => {
  if (process.env.NODE_ENV === 'development') {
    // Fake data
    return {
      email: 'dev@illinois.edu',
      netid: 'dev',
    }
  }
  const email = req.get('eppn')
  if (!email || email.length === 0) {
    return null;
  }
  const [netid] = email.split('@')
  return { email, netid }
}

/**
 * Allows us to safely handle errors in async code without wrapping each route
 * handler in a try...catch block.
 */
module.export.safeAsync = fn => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}