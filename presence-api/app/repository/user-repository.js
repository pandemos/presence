/**
 * Created by aknauss on 6/21/17.
 */

const db = require('../db.js')();
const User = require('../model/user.js');

module.exports = {
    save: (user) => { db.save(user); },
    find: async pattern => User.find(pattern)

};
