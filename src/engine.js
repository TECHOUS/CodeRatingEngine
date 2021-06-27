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

module.exports = {
    getCodeBaseFilesCount,
    generateDocumentIndex,
    getCodeBaseFilesArray,
    callGithubApiToGetFileContent
}

