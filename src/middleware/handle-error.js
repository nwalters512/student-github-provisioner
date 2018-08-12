module.exports = (err, req, res, _next) => {
  console.error(err.stack)
  if (res.headersSent) {
    req.socket.destroy()
    return
  }
  res.status(500).send()
}