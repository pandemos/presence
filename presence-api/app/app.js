/**
 * Created by aknauss on 6/21/17.
 */

// TODO change this for production. Should be configurable somehow
// Though really, it should be set per-user

const Koa = require('koa');
const jwt = require('koa-jwt');
const cors = require('koa-cors')
const bodyParser = require('koa-bodyparser');
const authHelper = require('./auth-helper.js');

const router = require('./routes.js')();
const app = new Koa();
app.use(bodyParser());
app.use(cors());

// Set x-response-time header
app.use(async function (ctx, next) {
   const start = new Date();
   await next();
   const ms = new Date() - start;
   ctx.set('X-Response-Time', `${ms}ms`);
});

// Log request
app.use(async function (ctx, next) {
   const start = new Date();
   await next();
   const ms = new Date() - start;
   console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

// Custom 401 error
app.use(function(ctx, next) {
   return next().catch((err) => {
       if (401 == err.status) {
           ctx.status = 401;
           ctx.body = 'Protected resource, access denied.\n';
       } else {
           throw err;
       }
   });
});

// Everything below this requires a valid JWT
app.use(
    jwt({
        secret: process.env.TOKEN_KEY,
        passthrough: true,
        isRevoked: authHelper.checkRevoked
    }).unless({
        path: [/^\/public/, /favicon.ico$/]
    })
);

app
    .use(router.routes())
    .use(router.allowedMethods());

server = app.listen(3000);

module.exports = server;
