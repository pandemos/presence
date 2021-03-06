/**
 * Created by aknauss on 6/21/17.
 */

UserRepository = require('../repository/user-repository.js');
UserService = require('./user-service.js');

function updateAvailability(ctx, uid, update) {
    return UserRepository
        .find({uid: uid})
        .then(async users => {
            let user = users[0];
            if (!user.availability) {
                user.availability = {};
            }
            update(user)
            return UserRepository
                .save(user)
                .then(() => {
                    ctx.body = 'Ok'
                });
        });
}

module.exports = {
    setCoreHours: async (ctx, uid, startTime, endTime, timezone) => {
        await updateAvailability(ctx, uid, user => {
            user.availability.coreHours = {
                start: startTime,
                end: endTime,
                tz: timezone
            };
        });
    },
    setInOffice: async (ctx, uid) => {
        await updateAvailability(ctx, uid, user => {
            user.availability.inOffice = true;
            user.availability.outOfOffice = false;
            user.availability.oooReason = null;
        });
    },
    setOutOfOffice: async (ctx, uid, reason) => {
        await updateAvailability(ctx, uid, user => {
            user.availability.inOffice = false;
            user.availability.outOfOffice = true;
            user.availability.oooReason = reason;
        });
    },
    setOutOfOfficeAt: async(ctx, uid, timestampWithTz, reason) => {
        await updateAvailability(ctx, uid, user => {
            if (!user.availability.scheduledOutOfOffice) {
                user.availability.scheduledOutOfOffice = [];
            }
            user.availability.scheduledOutOfOffice.push({
                when: timestampWithTz,
                reason: reason
            });
        })
    },
    cancelOutOfOfficeAt: async(ctx, uid, timestampWithTz) => {
        await updateAvailability(uid, user => {
            // TODO
        });
    },
    getTeamAvailability: async(ctx, uid) => {
        await UserRepository
            .find({uid: uid})
            .then(users => {
                let user = users[0];
                return user.teams.map(team => {
                    return UserRepository.find({teams: team});
                });
            })
            .then(async teamMembers => {
                return await Promise.all(teamMembers).then(members => {
                    let result = [].concat.apply([], members);
                    result = UserService.convertUsersToProfiles(result);
                    ctx.body = result;
                    return result;
                });
            })
    },

    getFrontendData: async(ctx, user) => {
        await UserRepository
            .find()
            .then(users => {
                const result = {
                    teams: [],
                    user: user ? {
                        username: user.username,
                        email: user.email,
                        name: user.username,
                        uid: user.uid,
                        tz: user.tz,
                        coreHours: user.availability.coreHours,
                        ooo: user.availability.scheduledOutOfOffice
                    } : null
                };

                const flatten = arr => arr.reduce(
                    (acc, val) => acc.concat(
                        Array.isArray(val) ? flatten(val) : val
                    ), []
                );

                const teams = flatten(users.map(user => user.teams));

                result.teams = teams.map(team => {
                    const teamData = {
                        name: team,
                        people: users
                            .filter(user => user.teams && user.teams.indexOf(team) > -1)
                            .map(user => {
                                return {
                                    uid: user.uid,
                                    name: user.username,
                                    value: user.availability.inOffice == true ? 'In' : 'Out',
                                    info: user.availability.oooReason
                                };
                            })
                    };
                    return teamData;
                });
                ctx.body = result;
                return result;
            });
    }
};
