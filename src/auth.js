const {validateToken} = require('./engine')

async function authenticateAPI(req, res, next) {
    const {authorization} = req.headers

    if (authorization && authorization.startsWith('Bearer ')) {
        const codeRatingEngineToken = authorization.replace('Bearer ', '')
        const tokenFound = await validateToken(codeRatingEngineToken)
        if (Array.isArray(tokenFound) && tokenFound.length > 0) {
            next()
        } else {
            return res.status(401).json({
                status: 401,
                message:
                    'Invalid Authorization Token !! Please send the valid token',
            })
        }
    } else {
        return res.status(401).json({
            status: 401,
            message:
                'Invalid Authorization Token !! Please send the valid token',
        })
    }
}

module.exports = {
    authenticateAPI,
}
