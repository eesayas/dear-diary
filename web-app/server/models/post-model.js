const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema(
    {
        title: String, //has title and body
        body: String,
        author: { type: Schema.Types.ObjectId, ref: 'User' }, //belongs to a User
    },
    {
        timestamps: true //each post must have a timestamp
    }
);

module.exports = mongoose.model('Post', PostSchema);