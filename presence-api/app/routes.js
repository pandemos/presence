/**
 * Created by aknauss on 6/21/17.
 *
 * All REST API routes should be defined in this file, but implemented in their own modules as appropriate.
 */

const requireUser = require('./auth-helper.js').requireUser;
const auth = require('./auth.js');

const UserService = require('./service/user-service.js');
const AvailabilityService = require('./service/availability-service.js');

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

    // Get a specific user by uid.
    .get('user-by-id', '/user/:uid', requireAdmin(async ctx => {
        await UserService.get(ctx, ctx.params.uid);
    }))

    .post('create-user', '/user', requireAdmin(async ctx => {
        await UserService.create(ctx, ctx.request.body);
    }))

    .post('set-core-hours', '/availability/:uid', requireUser(async ctx => {
        await AvailabilityService.setCoreHours(
            ctx,
            ctx.params.uid,
            ctx.request.body.start,
            ctx.request.body.end,
            ctx.request.body.tz
        );
    }))

    /* Add additional routes here. */
    ;

module.exports = () => {
  return router;
};
