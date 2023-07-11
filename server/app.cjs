const fs = require('fs');
const path = require('path');
const Koa = require('./koa/index.cjs');
const Router = require('./koa-router/index.cjs');
const renderStatic = require('./koa-static/index.cjs');

const router = new Router({ prefix: '/qm-vnit' });

router.get(['/home', '/library/:id+'], function(ctx) {
  ctx.type = 'html';
  ctx.body = fs.createReadStream(path.resolve(__dirname, '../build/index.html'));
});

router.get('/static/:id+', function(ctx) {
  const url = ctx.url;
  console.log(url);
  ctx.redirect(url.slice('8'));
});

const app = new Koa();

app.use(renderStatic(path.resolve(__dirname, '../build')));

app.use(router.routes());

app.listen(3333, function() {
  process.stdout.write('hello world localhost:3333\n');
});
