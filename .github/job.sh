# /bin/bash
# this shell script it to read all the code from the community project and
# upload to mongodb 
# run this script locally only from root
# bash .github/job.sh

echo "MONGODB_URI=mongodb+srv://techous:EH0bCYSBk6pk0PMD@initialcluster.ng9ou.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" > .env
echo "RATE_LIMIT_MINUTES=1" >> .env
echo "RATE_LIMIT_MAX_REQUEST=10" >> .env
echo "CACHE_STORAGE_SECONDS=30" >> .env

git clone "https://github.com/TechOUs/HacktoberFest21Community.git"

node .github/job.js

# cleanup
echo "Cleanup..."
rm .env
rm -rf HacktoberFest21Community
echo "Cleanup...Done"