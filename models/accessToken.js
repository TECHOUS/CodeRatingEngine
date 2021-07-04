const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const accessTokenModel = new Schema({
    token: {
        type: String,
        unique: true,
        required: true
    },
    timestamp: {
        type: Date
    }
})

module.exports = mongoose.model('accessToken', accessTokenModel);