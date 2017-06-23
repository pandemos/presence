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

    .post('set-core-hours', '/availability', requireUser(async ctx => {
        await AvailabilityService.setCoreHours(
            ctx,
            ctx.state.user._doc.uid, // TODO: What? Why does this work and not gettin .uid directly?
            ctx.request.body.start,
            ctx.request.body.end,
            ctx.request.body.tz
        );
    }))

    .post('set-in-office', '/availability/arrive', requireUser(async ctx => {
        await AvailabilityService.setInOffice(ctx, ctx.state.user._doc.uid);
    }))
    .post('set-out-of-office', '/availability/depart', requireUser(async ctx => {
        await AvailabilityService.setOutOfOffice(ctx, ctx.state.user._doc.uid);
    }))

    .post('set-out-of-office-at', '/availability/schedule', requireUser(async ctx => {
        await AvailabilityService.setOutOfOfficeAt(
            ctx,
            ctx.state.user._doc.uid,
            ctx.request.body.when,
            ctx.request.body.reason
        );
    }))

    .get('get-availability-for-team', '/availability/team', requireUser(async ctx => {
        await AvailabilityService.getTeamAvailability(ctx, ctx.state.user._doc.uid);
    }))

    .get('get-fe-data', '/fedata', async ctx => {
        if (ctx.state.user) {
            await AvailabilityService.getFrontendData(ctx, ctx.state.user._doc);
        } else {
            await AvailabilityService.getFrontendData(ctx);
        }
    })

    /* Add additional routes here. */
    ;

module.exports = () => {
  return router;
};
