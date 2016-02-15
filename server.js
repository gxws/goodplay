require('babel-core/register')//使用babel加载运行模块
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from './webpack.dev.config'

var app = new (require('express'))()
var port = 3002

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/_index.html')
})
app.get("/h1", (req, res) => {
  res.sendFile(__dirname + '/html/01_HD.html')
})
app.get("/h2", (req, res) => {
  res.sendFile(__dirname + '/html/02_HD.html')
})
app.get("/h3", (req, res) => {
  res.sendFile(__dirname + '/html/03_HD.html')
})
app.get("/h4", (req, res) => {
  res.sendFile(__dirname + '/html/04_HD.html')
})
app.get("/h5", (req, res) => {
  res.sendFile(__dirname + '/html/05_HD.html')
})
app.get("/h6", (req, res) => {
  res.sendFile(__dirname + '/html/06_HD.html')
})
app.get("/h7", (req, res) => {
  res.sendFile(__dirname + '/html/07_HD.html')
})
app.get("/h8", (req, res) => {
  res.sendFile(__dirname + '/html/08_HD.html')
})
app.get("/h9", (req, res) => {
  res.sendFile(__dirname + '/html/09_HD.html')
})
app.get("/logo",(req, res) => {
  res.sendFile(__dirname + '/static/images/logo.png')
})
app.get("/origin",(req, res) => {
  res.sendFile(__dirname + '/updata/sj/origin.jpg')
})
app.get("/p3",(req, res) => {
  res.sendFile(__dirname + '/updata/sj/3.jpg')
})
app.get("/p4",(req, res) => {
  res.sendFile(__dirname + '/updata/sj/4.jpg')
})
app.get("/p5",(req, res) => {
  res.sendFile(__dirname + '/updata/sj/5.jpg')
})
app.get("/ajax",(req, res) => {
  res.sendFile(__dirname + '/ajax.json')
})
app.get("/imgtest.jpg",(req, res) => {
  res.sendFile(__dirname + '/updata/test.jpg')
})
app.listen(port, error => {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
