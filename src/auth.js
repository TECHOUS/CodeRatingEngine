const {validateToken} = require('./engine')

async function authenticateGetAPI(req, res, next) {
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

async function authenticatePutAPI(req, res, next) {
    const {codeRatingEngineToken} = req.body

    if (codeRatingEngineToken === undefined) {
        return res.status(401).json({
            status: 401,
            message: 'Invalid Token !! Please send the valid token',
        })
    } else {
        const tokenFound = await validateToken(codeRatingEngineToken)
        if (Array.isArray(tokenFound) && tokenFound.length > 0) {
            next()
        } else {
            return res.status(401).json({
                status: 401,
                message: 'Invalid Token !! Please send the valid token',
            })
        }
    }
}

module.exports = {
    authenticateGetAPI,
    authenticatePutAPI,
}
