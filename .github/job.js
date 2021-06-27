const { default: axios } = require('axios');
const codeRatingModel = require('../models/codeRatingModel');
const mongoose = require('mongoose');
const fs = require('fs');

// function to read the code file and sends the username in callback function
const getUserNameFromCodeBaseFile = (fileName) => {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, (err, buf) => {
            if (err) {
                reject(err)
            } else {
                const lines = buf.toString().split("\n");
                let username = "";
                for (let i = 0; i < lines.length; i++) {
                    if (lines[i].search('AUTHOR:') != -1) {
                        username = lines[i].split('AUTHOR:')[1].trim()
                        break;
                    }
                }
                fileName = fileName.split('/')[2]
                resolve({ username, fileName })
            }
        })
    })
}

// function to connect to mongodb using mongoose
const connectMongoDB = () => {
    require('dotenv').config()
    mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error:'));
    return db;
}

// uses single call to mongo db
const insertDataInMongo = (records) => {
    const db = connectMongoDB()

    codeRatingModel.insertMany(records,{ordered: false})
        .then(() => {
            console.log("Data added successfully")
            db.close();
        })
        .catch((err) => {
            console.log("Data is not added: " + err);
            db.close();
        })
}

// this function handles calling the API
const callGithubCodeBaseAPI = () => {
    axios.get('https://api.github.com/repos/TechOUs/HacktoberFest21Community/contents/CodeBase')
        .then(res => {

            // get all the names from the files
            const filePromises = res.data.map((codeObject) => {
                return getUserNameFromCodeBaseFile(`HacktoberFest21Community/${codeObject.path}`)
            })

            // resolve/reject all the file promises
            Promise.allSettled(filePromises)
                .then((fileObjects) => {

                    // creating a map of filename to usernames
                    const fileMap = new Map(fileObjects.map((fileObject) => {
                        return [fileObject.value.fileName, fileObject.value.username];
                    }))

                    const dataToInsert = res.data.map((data) => {
                        return {
                            codeId: data.sha,
                            codeRating: 0,
                            codeUrl: data.url,
                            codeName: data.name,
                            userName: fileMap.get(data.name)
                        }
                    })

                    insertDataInMongo(dataToInsert);
                })
        })
        .catch(err => console.log(err))
}

callGithubCodeBaseAPI();
