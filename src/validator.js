function updateValidator(req, res, next) {
    const {codeId1, codeId2, winner} = req.body

    if (
        typeof codeId1 !== 'string' ||
        typeof codeId2 !== 'string' ||
        typeof winner !== 'number'
    ) {
        res.status(400).json({
            status: 400,
            message: 'Invalid request parameters !!',
        })
    } else if (winner !== 1 && winner !== 2) {
        res.status(400).json({
            status: 400,
            message: 'Winner can either be 1 or 2 only',
        })
    } else {
        next()
    }
}

function searchValidator(req, res, next) {
    const {username} = req.query
    if (username === undefined) {
        res.status(400).json({
            status: 400,
            message: 'Bad Request !! Please send username in the query',
        })
    } else {
        next()
    }
}

module.exports = {
    updateValidator,
    searchValidator,
}
