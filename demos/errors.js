'use strict'

const gateway = require('./../index')
const PORT = process.env.PORT || 8080

const server = gateway({
  routes: [{
    prefix: '/*',
    prefixRewrite: '',
    target: 'http://127.0.0.1:3000',
    hooks: {
      onRequest: () => {
        throw new SyntaxError('Something went wrong')
      },
      onError(err, req) {
        // allows for extra error handling logic (i.e. Sentry, Newrelic etc.)
        console.warn(req.method, req.url, err)
      }
    }
  }]
})

server.start(PORT).then(server => {
  console.log(`API Gateway listening on ${PORT} port!`)
})