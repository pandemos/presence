/**
 * Created by aknauss on 6/21/17.
 */


module.exports = () => {
    const mongoose = require('mongoose');
    mongoose.Promise = global.Promise;
    mongoose.connect(process.env.DB_URL);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    return {
        mongoose: mongoose,
        db: db,
        save: (model) => {
            model.save((err) => {
               if (err) {
                   throw err;
               } else {
                   console.log("saved");
               }
            });
        }
    };
}
