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
                   console.log(result);
                   ctx.body = result;
                   return result;
               });
           })
    }
};
