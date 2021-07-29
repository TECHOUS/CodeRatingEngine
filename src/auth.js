import {validateToken} from './engine';

async function authenticateAPI(req, res, next){
    const { codeRatingEngineToken } = req.body;

    if (codeRatingEngineToken === undefined){
        return res.status(401).json({
            status: 401,
            message: "Invalid Token !! Please send the valid token"
        })
    }else{
        const tokenFound = await validateToken(codeRatingEngineToken);
        if(Array.isArray(tokenFound) && tokenFound.length>0){
            next();
        }else{
            return res.status(401).json({
                status: 401,
                message: "Invalid Token !! Please send the valid token"
            })
        }
    }
}

export {
    authenticateAPI
} 