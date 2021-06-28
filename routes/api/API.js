const express = require('express');
const router = express.Router();
const {
    getCodeBaseFilesCount,
    generateDocumentIndex,
    getCodeBaseFilesArray,
    callGithubApiToGetFileContent,
    rateCodeAndUpdate,
    getCodeBaseFileForUser
} = require('../../src/engine');

/**
 * @endpoint /api/v1/randomCodes
 * @description api get the randomCodes present in code base
 * @url http://localhost:5000/api/v1/randomCodes
 * 
 * @method GET
 * @access private
 * @author gaurav
 * @return
 * {
 *      status: 200,
 *      codeObject1: {},
 *      codeObject2: {}
 * }
 **/
router.get('/randomCodes', async (req, res) => {
    const count = await getCodeBaseFilesCount();
    if (count > 0) {
        let index1 = generateDocumentIndex(count, -1);
        let index2 = generateDocumentIndex(count, index1);
        let fileDocuments = await getCodeBaseFilesArray();
        let content1 = await callGithubApiToGetFileContent(
            fileDocuments[index1].codeUrl
        );
        let content2 = await callGithubApiToGetFileContent(
            fileDocuments[index2].codeUrl
        );

        // remove the author from the contents due to security
        content1 = content1.data.replace(
            content1.data.substring(
                content1.data.indexOf('AUTHOR:'),
                content1.data.indexOf('\n', content1.data.indexOf('AUTHOR:'))
            ),
            ''
        );
        content2 = content2.data.replace(
            content2.data.substring(
                content2.data.indexOf('AUTHOR:'),
                content2.data.indexOf('\n', content2.data.indexOf('AUTHOR:'))
            ),
            ''
        );
        res.json({
            status: 200,
            codeObject1: {
                codeId: fileDocuments[index1].codeId,
                codeRating: fileDocuments[index1].codeRating,
                codeUrl: fileDocuments[index1].codeUrl,
                codeName: fileDocuments[index1].codeName,
                content: content1
            },
            codeObject2: {
                codeId: fileDocuments[index2].codeId,
                codeRating: fileDocuments[index2].codeRating,
                codeUrl: fileDocuments[index2].codeUrl,
                codeName: fileDocuments[index2].codeName,
                content: content2
            },
        });
    } else {
        res.status(404).json({
            status: 404,
            message: 'Not Found',
        });
    }
});

/**
 * @endpoint /api/v1/rateCode/:codeId1/:codeId2
 * @description API to generate the rating for the winner and update
 * 
 * @method PUT
 * @access private
 * 
 * @author gaurav
 * @return
 * {
 *      "update1":{},
 *      "update2":{},
 *      "status": 200,
 *      "message": ""
 * }
 **/
router.put('/rateCode/:codeId1/:codeId2', async (req, res) => {
    const { codeId1, codeId2 } = req.params;
    const { codeRating1, codeRating2, winner } = req.body;

    if (codeId1 === undefined || codeId2 === undefined || codeRating1 === undefined
        || codeRating2 === undefined || winner === undefined) {
        res.status(400).json({
            status: 400,
            message: 'Invalid request body parameters !!'
        })
    } else if (winner !== 1 && winner !== 2) {
        res.status(400).json({
            status: 400,
            message: 'Winner can be either 1 or 2 only'
        })
    } else {
        const updateResult = await rateCodeAndUpdate({
            codeId1, codeId2, codeRating1, codeRating2, winner
        })
            .catch((err) => {
                res.status(400).json({
                    status: 400,
                    message: 'Bad Request'
                })
            })

        updateResult.status = 200;
        updateResult.message = 'Code Ratings updated'
        res.status(200).json(updateResult);
    }
});

/**
 * @endpoint /api/v1/searchUser?username=__
 * @description search and return the code rating for the specific user
 * @method GET
 * @access private
 * 
 * @param username
 * @param sendContent
 * 
 * @author gaurav
 * @return
 * {
 *      status: 200,
 *      userCodeBaseFiles: []
 * }
 **/
router.get('/searchUser', async (req, res) => {
    const { username, sendContent } = req.query;
    if (username === undefined) {
        res.status(400).json({
            status: 400,
            message: "Bad Request !! Please send username in the query"
        })
    } else {
        let userCodeBaseFiles = await getCodeBaseFileForUser(username)
            .catch(err =>
                res.status(500).json({
                    status: 500,
                    err,
                    message: 'Internal Server Error'
                })
            )
        if (userCodeBaseFiles.length <= 0) {
            res.status(404).json({
                status: 404,
                message: 'No Code Base file found for the respective user'
            })
        } else if (sendContent === 'true') {
            userCodeBaseFiles = userCodeBaseFiles.map(async fileObj => {
                const content = await callGithubApiToGetFileContent(fileObj._doc.codeUrl);
                const newFileObject = {
                    ...fileObj._doc,
                    content: content.data
                }
                return newFileObject
            })
            Promise.all(userCodeBaseFiles)
                .then(data => res.status(200).json({
                    status: 200,
                    userCodeBaseFiles: data
                }))
        } else {
            res.status(200).json({
                status: 200,
                userCodeBaseFiles
            });
        }
    }
});

module.exports = router;
