/* eslint-env browser */

module.exports.baseUrl =
  (typeof window !== 'undefined' && window.BASE_URL) ||
  (typeof process !== 'undefined' && process.env.BASE_URL) ||
  ''

module.exports.env =
  (typeof window !== 'undefined' && window.NODE_ENV) ||
  (typeof process !== 'undefined' && process.env.NODE_ENV) ||
  null

module.exports.withBaseUrl = url => `${module.exports.baseUrl}${url}`