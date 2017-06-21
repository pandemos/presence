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
        let role = "user" // TODO: Should come from DB
        let email = request.username + "@email.com" // TODO: Should come from DB
        let uid = 1; // TODO: Should come from DB
        let profile = {
            username: request.username,
            role: role,
            uid: uid,
            email: email

        }
        let token = jwt.sign(profile, process.env.TOKEN_KEY);
        ctx.body = token;
    }
};
