# /bin/bash
# this shell script it to read all the code from the community project and
# upload to mongodb run this script locally only from root
# bash .github/job.sh

git clone "https://github.com/TechOUs/HacktoberFest21Community.git"

node .github/job.js

# cleanup
echo "Cleanup..."
rm -rf HacktoberFest21Community
echo "Cleanup...Done"