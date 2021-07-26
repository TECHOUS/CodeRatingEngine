import mongoose from 'mongoose';

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

export default mongoose.model('accessToken', accessTokenModel);