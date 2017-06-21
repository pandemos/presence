/**
 * Created by aknauss on 6/21/17.
 *
 * All REST API routes should be defined in this file, but implemented in their own modules as appropriate.
 */

const requireUser = require('./auth-helper.js').requireUser;
const auth = require('./auth.js');

const UserService = require('./service/user-service.js');

const router = require('koa-router')();

router

    // Publically-visible health check (such as for AWS)
    .get('test', '/health', async ctx => {
        ctx.body = "Ok";
    })

    // Secured health check (for testing)
    .get('secured', '/secured-health', requireUser(ctx => {
        ctx.body = "Secured";
    }))

    // Login. Expects {username: "username", password: "password"} in the body
    .post('login', '/login', async ctx => {
        await auth.login(ctx);
    })

    // List users. Must be admin.
    .get('user', '/user', requireAdmin(async ctx => {
        await UserService.all(ctx);
    }))

    /* Add additional routes here. */
    ;

module.exports = () => {
  return router;
};
