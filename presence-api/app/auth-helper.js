/**
 * Created by aknauss on 6/21/17.
 */


requireUser = function(f) {
    return async ctx => {
        if (!ctx.state.user) {
            throw {status: 401};
        }
        else {
            f(ctx);
        }
    };
}

checkRevoked = function(ctx, token, user) {
    // TODO: Check to see if auth is revoked
    return Promise.resolve(false);
}

module.exports = {
    requireUser: requireUser,
    checkRevoked: checkRevoked
};
