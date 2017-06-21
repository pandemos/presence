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

        await User.find({username: request.username})
        .then(result => {
            if (result.length == 0) {
                let u = new User({
                    username: request.username,
                    password: request.password,
                    role: "user",
                    email: request.username + "@gmail.com",
                    uid: 1,
                    availability: {}
                })
                UserRepository.save(u);
                console.log("User not found. Failing");
                throw {status: 401};
            }
            let user = result[0];

            // TODO: Hash the password!
            if (request.password != user.password) {
                throw {status: 401};
            }
            let profile = {
                username: user.username,
                role: user.role,
                uid: user.uid,
                email: user.email

            };
            let token = jwt.sign(profile, process.env.TOKEN_KEY);
            ctx.body = token;
        })
        .catch(err => {
            throw err;
        });

    }
};
