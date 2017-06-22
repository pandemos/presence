/**
 * Created by aknauss on 6/21/17.
 */

var jwt = require('jsonwebtoken');

User = require('./model/user.js');
UserRepository = require('./repository/user-repository.js');

module.exports = {
    login: async ctx => {
        let request = ctx.request.body;
        console.log(request);
        if (!(request.username && request.password)) {
            throw {status: 401};
        }

        // We use UserRepository directly here because we
        // need the passwords, which are not exposed in the service layer.
        await User.find({username: request.username})
        .then(result => {
            if (result.length == 0) {
                throw {status: 401};
            }
            let user = result[0];

            // TODO: Hash the password!
            if (request.password != user.password) {
                throw {status: 401};
            }
            let token = jwt.sign(user, process.env.TOKEN_KEY);
            ctx.body = token;
        })
        .catch(err => {
            throw err;
        });
    },
    getTestToken(secret, profile) {
        const token = jwt.sign(profile, secret);
        return token;

    }
};
