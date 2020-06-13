const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema(
    {
        title: { type: String, required: true }, //has title and body
        body: { type: String, required: true },
        author: { type: Schema.Types.ObjectId, ref: 'User' }, //belongs to a User
    },
    {
        timestamps: true //each post must have a timestamp
    }
);

module.exports = mongoose.model('Post', PostSchema);