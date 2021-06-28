const mongoose = require('mongoose');
const codeRatingModel = require('../models/codeRatingModel');
const { default: axios } = require('axios');

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true});
const db = mongoose.connection;
db.on('error',console.error.bind(console, 'Connection error:'));

/**
 * @description get the count of the total docs present in mongo
 * @author gaurav
 * @return Promise
 **/
function getCodeBaseFilesCount(){
    return codeRatingModel.countDocuments({})
}

/**
 * @description get the array of docs from mongo
 * @author gaurav
 * @return Promise
 **/
function getCodeBaseFilesArray(){
    return codeRatingModel.find()
}

/**
 * @description generate random indexes
 * @author gaurav
 * @param count total no of records
 * @param index discard this index if it is generated as its already generated
 * @return new random index
 **/
function generateDocumentIndex(count, index){
    let multiplyFactor = Math.round(Math.pow(10, count.toString().length));
    let newIndex = multiplyFactor+1;
    while(newIndex==index || newIndex>=count){
        newIndex = Math.round(Math.random()*multiplyFactor)
    }
    return newIndex;
}

/**
 * @description call the github contents API for getting the code
 * @author gaurav
 * @param url unique github file url
 * @return Promise
 **/
function callGithubApiToGetFileContent(url){
    return axios.get(url, {
        headers: {
            'Accept': 'application/vnd.github.VERSION.raw'
        }
    }); 
}

function updateCodeBaseMongoDocument(codeId, codeRating){
    mongoose.set('useFindAndModify', false);
    return codeRatingModel.findOneAndUpdate({codeId},{codeRating},{new: true})
}

async function rateCodeAndUpdate({codeId1, codeId2, codeRating1, codeRating2, winner}){
    const K = 24;
    let expectedCodeRating1 = 1 / (1 + Math.pow(10, (codeRating2 - codeRating1)/400)) 
    let expectedCodeRating2 = 1 / (1 + Math.pow(10, (codeRating1 - codeRating2)/400))

    if(winner===1){
        codeRating1 = Math.round(codeRating1 + K*(1-expectedCodeRating1))
        codeRating2 = Math.round(codeRating2 + K*(0-expectedCodeRating2))
        
        const update1 = await updateCodeBaseMongoDocument(codeId1, codeRating1);
        const update2 = await updateCodeBaseMongoDocument(codeId2, codeRating2);

        return new Promise((resolve, reject)=>{
            resolve({update1, update2});
        })
    }else if(winner===2){
        codeRating1 = Math.round(codeRating1 + K*(0-expectedCodeRating1))
        codeRating2 = Math.round(codeRating2 + K*(1-expectedCodeRating2))

        const update1 = await updateCodeBaseMongoDocument(codeId1, codeRating1);
        const update2 = await updateCodeBaseMongoDocument(codeId2, codeRating2);

        return new Promise((resolve, reject)=>{
            resolve({update1, update2});
        })
    }else{
        return new Promise((resolve, reject)=>{
            reject('rejected');
        })
    }
}

/**
 * @description return the codeBase files for the user
 * @author gaurav
 * @return Promise
 **/
function getCodeBaseFileForUser(userName){
    return codeRatingModel.find({userName})
}

module.exports = {
    getCodeBaseFilesCount,
    generateDocumentIndex,
    getCodeBaseFilesArray,
    callGithubApiToGetFileContent,
    rateCodeAndUpdate,
    getCodeBaseFileForUser
}

