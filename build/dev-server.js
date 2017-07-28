require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()

// 用 express 体替 json-server
const fs = require('fs')
const bodyParser = require('body-parser')
const apiRouter = express.Router()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

apiRouter.route('/:apiName').all(function(req, res) {
  fs.readFile('./db.json', 'utf8', function(err, data) {
    if (err) throw err

    // 将 json 数据转化为 js 对象
    var data = JSON.parse(data)

    if (data[req.params.apiName]) {
      res.json(data[req.params.apiName])
    } else {
      res.send('no such api name')
    }
  })
})

app.use('/api', apiRouter)
app.listen(port + 1, (err) => {
  if (err) {
    console.log(err)
    return
  }

  console.log('> Express server Listening at ' + (port + 1) + '\n')
})

// // json-server
// const jsonServer = require('json-server')
// const apiServer = jsonServer.create()
// const apiRouter = jsonServer.router('db.json')
// const middlewares = jsonServer.defaults()

// apiServer.use(middlewares)
// apiServer.use('/api', apiRouter)
// apiServer.listen(port + 1, () => {
//   console.log('JSON Server is running')
// })

var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {},
  heartbeat: 2000
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
