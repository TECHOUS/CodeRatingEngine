const {exec} = require('child_process');

exec('echo "MONGODB_URI=mongodb+srv://techous:EH0bCYSBk6pk0PMD@initialcluster.ng9ou.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" > .env', (err, stdout, stderr)=>{
    if(err){
        return;
    }else{
        console.log(`stdout: ${stdout}`);
        const MongoClient = require('mongodb').MongoClient;
        require('dotenv').config()

        const uri = process.env.MONGODB_URI;
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log(client);
    }
})

// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     client.close();
// });

exec('ls', (err, stdout, stderr)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log(`ls: ${stdout}`)
    }
})