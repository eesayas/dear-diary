const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: { type: String, require: true}, //user must have an email
    posts: [ {type: Schema.Types.ObjectId, ref: 'Post'} ], //each user has an array of their authored Posts

    //if time permits...integrate reset password
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', UserSchema);