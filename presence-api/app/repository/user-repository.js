/**
 * Created by aknauss on 6/21/17.
 */

const db = require('../db.js')();
const User = require('../model/user.js');

module.exports = {
        save: async (user) => { return db.save(user); },
        find: async pattern => User.find(pattern),
        create: async profile => {
            User.find({uid: profile.uid})
                .then ((user) => {
                    if (!user) {
                        user = new User(profile);
                    } else {
                        user = user[0];
                    }
                    return db.save(user);
                });
        }
};
