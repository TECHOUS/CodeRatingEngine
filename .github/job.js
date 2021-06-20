const { default: axios } = require('axios');
const { exec } = require('child_process');
const codeRatingModel = require('../models/codeRatingModel');
const mongoose = require('mongoose');

const connectMongoDB = () => {
    require('dotenv').config()
    mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true});
    const db = mongoose.connection;
    db.on('error',console.error.bind(console, 'Connection error:'));
    return db;
}

// this function handles calling the API
const callGithubCodeBaseAPI = () => {
    axios.get('https://api.github.com/repos/TechOUs/HacktoberFest21Community/contents/CodeBase')
        .then(res => {
            const db = connectMongoDB()
            const values = res.data.map((codeObject) => {
                return {
                    codeId: codeObject.sha,
                    codeName: codeObject.name,
                    codeUrl: codeObject.url,
                    codeRating: 0
                };
            })
            // console.log(values);
            codeRatingModel.insertMany(values)
            .then(()=>{
                console.log("Data added successfully")
                db.close();
            })
            .catch((err) => {
                console.log("Data is not added: "+err);
                db.close();
            })
        })
        .catch(err => console.log(err))
}

// create the .env file for linking
exec('echo "MONGODB_URI=mongodb+srv://techous:EH0bCYSBk6pk0PMD@initialcluster.ng9ou.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" > .env', (err, stdout, stderr) => {
    if (err) {
        console.log(err);
    } else {
        callGithubCodeBaseAPI()
    }
})
