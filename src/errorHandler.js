function badRequestHandler(req, res) {
    return res.status(400).json({
        status: 400,
        message: 'Bad Request !!',
    })
}

function requestMethodHandler(req, res, next) {
    console.log(req.path)
    switch (req.path) {
        case '/api/v1/randomCodes':
            if (req.method !== 'GET') {
                res.set('Allow', 'GET')
                return res.status(405).json({
                    status: 405,
                    message: 'Method not allowed',
                })
            }
            break
        case '/api/v1/rateCode':
            if (req.method !== 'PUT') {
                res.set('Allow', 'PUT')
                return res.status(405).json({
                    status: 405,
                    message: 'Method not allowed',
                })
            }
            break
    }
    next()
}

function internalServerErrorHandler(err, req, res, next) {
    console.error(err.stack)
    return res.status(500).json({
        status: 500,
        message: 'Internal Server Error',
    })
}

module.exports = {
    badRequestHandler,
    requestMethodHandler,
    internalServerErrorHandler,
}
