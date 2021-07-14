const path = require('path')
const Koa = require('koa')
const koaStatic = require('koa-static')
const app = new Koa()

app.use(koaStatic(path.join(__dirname, 'html')))

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.set('X-Response-Time', `${ms}ms`)
})

// logger
app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}`)
})

app.use(async ctx => {
  ctx.body = 'Hello World'
})

// 要部署到Heroku上端口号必须得是process.env.PORT
app.listen(process.env.PORT || 3000, () => {
  console.log('启动成功')
})
