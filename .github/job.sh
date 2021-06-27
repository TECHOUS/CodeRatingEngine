# /bin/bash
# this shell script it to read all the code from the community project and
# upload to mongodb 

echo "MONGODB_URI=mongodb+srv://techous:EH0bCYSBk6pk0PMD@initialcluster.ng9ou.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" > .env

git clone "https://github.com/TechOUs/HacktoberFest21Community.git"

node .github/job.js

# cleanup
echo "Cleanup..."
# rm .env
# rm -rf HacktoberFest21Community