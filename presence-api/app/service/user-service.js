/**
 * Created by aknauss on 6/21/17.
 */

User = require('../model/user.js');
UserRepository = require('../repository/user-repository.js');

module.exports = {
    all: (ctx) => {
        return UserRepository
            .find()
            .then(results => {
                return results.map(user => {
                    return {
                        username: user.username,
                        role: user.role,
                        uid: user.uid,
                        email: user.email
                    };
                })
            })
            .then(profiles => {
                ctx.body = profiles;
                console.log(profiles);
                return profiles;
            });

    }
}
