/**
 * Created by aknauss on 6/21/17.
 */

UserRepository = require('../repository/user-repository.js');

module.exports = {
    setCoreHours: async (ctx, uid, startTime, endTime, timezone) => {
        await UserRepository
            .find({uid: uid})
            .then(async users => {
                let user = users[0];
                console.log(user);
                if (!user.availability) {
                    user.availability = {};
                }
                user.availability.coreHours = {
                    start: startTime,
                    end: endTime,
                    tz: timezone
                };
                return UserRepository
                    .save(user)
                    .then(() => {
                        ctx.body = 'Ok'
                    });
            });
    }
};
