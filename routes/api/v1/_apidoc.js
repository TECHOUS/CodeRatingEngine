/**
 * @api {GET} /api/v1/randomCodes GET: get the random Code files
 * @apiName randomCodes
 * @apiDescription api to get the Random Code files present in code base
 * @apiVersion 1.0.0
 *
 * @apiGroup randomCodes
 * @apiSuccess (200 Success Response) {Number} status 200 (Status Code)
 * @apiSuccess (200 Success Response) {Object} codeObject1 First CodeObject
 * @apiSuccess (200 Success Response) {Object} codeObject2 Second CodeObject
 * @apiSuccess (200 Success Response) {String} accessToken Access Token for the secured APIs
 * @apiSuccess (CodeObject) {String} codeId unique code Id
 * @apiSuccess (CodeObject) {Number} codeRating current code rating of the file
 * @apiSuccess (CodeObject) {String} codeUrl file URL of the code file
 * @apiSuccess (CodeObject) {String} codeName file name of the code file
 * @apiSuccess (CodeObject) {String} content content of the code file
 *
 * @apiSuccessExample {json} Success Response Example
 *
 * {
 *      "status": 200,
 *      "codeObject1": {
 *          "codeId": "9f6ca40579efdee44097ccf62c93fa192b6efb2b",
 *          "codeRating": 45,
 *          "codeUrl": "https://api.github.com/repos/<path>/CodeBase/UnixTimeStampToHumanReadableFormat.cpp",
 *          "codeName": "UnixTimeStampToHumanReadableFormat.cpp",
 *          "content": "#include<bits/stdc++.h>\n\nusing namespace std;\n......."
 *      },
 *      "codeObject2": {
 *          "codeId": "55dfc162f8163243c9c7e155e9a9a26b9528be73",
 *          "codeRating": 2361,
 *          "codeUrl": "https://api.github.com/repos/<path>/CodeBase/SelectionSort.java",
 *          "codeName": "SelectionSort.java",
 *          "content": "public class SelectionSort{public static void main(String[] args){......."
 *      },
 *      "accessToken": "96d3371e-9da8-4261-b8a6-ea9b8e68f770"
 * }
 *
 * @apiError (4xx Error Response) {Number} 429 Too many requests, please try again later!!!
 * @apiError (4xx Error Response) {Number} 405 Method not Allowed
 * @apiError (4xx Error Response) {Number} 404 No results found
 * @apiError (4xx Error Response) {Number} 400 Bad Request
 * @apiError (500 Error Response) {Number} 500 Internal Server Error
 **/
/**
 * @api {PUT} /api/v1/rateCode PUT: rate the code file
 * @apiName rateCode
 * @apiDescription api to rate the Random Code files present in code base
 * @apiVersion 1.0.0
 * @apiBody {Number} winner Marked winner 1 or 2
 * @apiBody {String} codeId1 code Id for code 1
 * @apiBody {String} codeId2 code Id for code 2
 * @apiBody {String} codeRatingEngineToken Access token received from randomCodes request
 *
 * @apiGroup rateCode
 * @apiSuccess (200 Success Response) {Object} update1 First UpdatedCodeObject
 * @apiSuccess (200 Success Response) {Object} update2 Second UpdatedCodeObject
 * @apiSuccess (200 Success Response) {Number} status 200 (Status Code)
 * @apiSuccess (200 Success Response) {String} message Code Ratings are updated
 * @apiSuccess (UpdatedCodeObject) {String} codeId unique code Id
 * @apiSuccess (UpdatedCodeObject) {Number} codeRating updated code rating of the file
 * @apiSuccess (UpdatedCodeObject) {String} codeUrl file URL of the code file
 * @apiSuccess (UpdatedCodeObject) {String} codeName file name of the code file
 * @apiSuccess (UpdatedCodeObject) {String} userName user name of the contributed user
 *
 * @apiSuccessExample {json} Success Response Example
 *
 * {
 *   "update1": {
 *       "codeId": "55dfc162f8163243c9c7e155e9a9a26b9528be73",
 *       "codeRating": 2369,
 *       "codeUrl": "https://api.github.com/repos/..../CodeBase/SelectionSort.java",
 *       "codeName": "SelectionSort.java",
 *       "userName": "GauravWalia19",
 *   },
 *   "update2": {
 *       "codeId": "489e8fe91b2db73cc0f8f78b831fabb1b927d2b5",
 *       "codeRating": 2235,
 *       "codeUrl": "https://api.github.com/repos/..../CodeBase/LinearSearch.c",
 *       "codeName": "LinearSearch.c",
 *       "userName": "GauravWalia19",
 *   },
 *   "status": 200,
 *   "message": "Code Ratings are updated"
 * }
 *
 * @apiError (4xx Error Response) {Number} 429 Too many requests, please try again later!!!
 * @apiError (4xx Error Response) {Number} 405 Method not Allowed
 * @apiError (4xx Error Response) {Number} 401 Invalid Token !! Please send the valid token
 * @apiError (4xx Error Response) {Number} 400 Bad Request
 * @apiError (500 Error Response) {Number} 500 Internal Server Error
 **/
/**
 * @api {GET} /api/v1/searchUser GET: searching the user name
 * @apiName searchUser
 * @apiDescription search and return the code rating for the specific user
 * @apiVersion 1.0.0
 * @apiBody {String} codeRatingEngineToken Access token received from randomCodes request
 * @apiQuery {String} username Username to search
 * @apiQuery {Boolean} sendContent Whether content is needed from the API or not
 *
 * @apiGroup searchUser
 * @apiSuccess (200 Success Response) {Number} status 200 (Status Code)
 * @apiSuccess (200 Success Response) {Array} userCodeBaseFiles CodeBaseFile
 *
 * @apiSuccess (CodeBaseFile) {String} _id unique mongo Id
 * @apiSuccess (CodeBaseFile) {String} codeId unique code Id
 * @apiSuccess (CodeBaseFile) {Number} codeRating current code rating of the file
 * @apiSuccess (CodeBaseFile) {String} codeUrl file URL of the code file
 * @apiSuccess (CodeBaseFile) {String} codeName file name of the code file
 * @apiSuccess (CodeBaseFile) {String} userName user name of the contributed user
 * @apiSuccess (CodeBaseFile) {String} content content of the code file
 *
 * @apiSuccessExample {json} Success Response Example
 *
 * {
 *    "status": 200,
 *    "userCodeBaseFiles": [
 *        {
 *            "_id": "60d877a541d44f4a2350d1b1",
 *            "codeId": "55dfc162f8163243c9c7e155e9a9a26b9528be73",
 *            "codeRating": 2384,
 *            "codeUrl": "https://api.github.com/repos/..../CodeBase/SelectionSort.java?ref=master",
 *           "codeName": "SelectionSort.java",
 *            "userName": "GauravWalia19",
 *            "__v": 0,
 *            "content": "Scanner in = new Scanner(System.in)"
 *        }
 *    ]
 * }
 *
 * @apiError (4xx Error Response) {Number} 429 Too many requests, please try again later!!!
 * @apiError (4xx Error Response) {Number} 405 Method not Allowed
 * @apiError (4xx Error Response) {Number} 404 No Code Base file found for the respective user
 * @apiError (4xx Error Response) {Number} 401 Invalid Token !! Please send the valid token
 * @apiError (4xx Error Response) {Number} 400 Bad Request
 * @apiError (500 Error Response) {Number} 500 Internal Server Error
 **/
