import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const codeRatingModel = new Schema({
    codeId: {
        type: String,
        unique: true
    },
    codeName: {
        type: String,
        unique: true
    },
    codeRating:{
        type: Number
    },
    codeUrl: {
        type: String
    },
    userName: {
        type: String
    }
});

export default mongoose.model('codeRating',codeRatingModel);