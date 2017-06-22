/**
 * Created by aknauss on 6/21/17.
 */

UserRepository = require('../repository/user-repository.js');

function convertUserToProfile(user) {
    return {
        username: user.username,
        role: user.role,
        uid: user.uid,
        email: user.email,
        teams: user.teams,
        availability: user.availability
    };
}

function convertUsersToProfiles(users) {
    return users.map(convertUserToProfile);
}

module.exports = {

    all: (ctx) => {
        return UserRepository
            .find()
            .then(convertUsersToProfiles)
            .then(profiles => {
                ctx.body = profiles;
                return profiles;
            })
    },

    get: (ctx, uid) => {
        return UserRepository
            .find({uid: uid})
            .then(convertUsersToProfiles)
            .then(profiles => {
                ctx.body = profiles[0];
                return profiles[0];
            })
    },

    save: user => {
        UserRepository.save(user);
    },

    create: (ctx, user) => {
       UserRepository
           .create(user)
           .then(() => {
               ctx.status = 200;
               ctx.body = 'Ok';
           });
    },

    convertUserToProfile: convertUserToProfile,
    convertUsersToProfiles: convertUsersToProfiles
}
