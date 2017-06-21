/**
 * Created by aknauss on 6/21/17.
 */

var jwt = require('jsonwebtoken');

module.exports = {
    login: ctx => {
        let request = ctx.request.body;
        console.log(request);
        if (!(request.username && request.password)) {
            throw {status: 401};
        }
        // TODO: Authenticate against a database
        let profile = {
            username: request.username
        }
        let token = jwt.sign(profile, 'secure-key');
        ctx.body = token;
    }
};