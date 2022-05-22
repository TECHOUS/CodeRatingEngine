# /bin/bash
# this shell script it to read all the code from the community project and
# upload to mongodb run this script locally only from root

git clone "https://github.com/TECHOUS/$CODE_SRC.git"

node .github/job.js

# cleanup
echo "Cleanup..."
rm -rf $CODE_SRC
echo "Cleanup...Done"