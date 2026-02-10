const { StatusCodes } = require('http-status-codes');
const jwt=require('jsonwebtoken');

const { JWT_SECRET } = require('../config/serverConfig');

function jwtAuthMiddleware(req,resp,next){

    // Extracting the jwt token from request headers 
    const token=req.headers.authorization.split(' ')[1]; // Token will be of the form: Bearer <token>

    if(!token) return resp.status(StatusCodes.UNAUTHORIZED).json({
        Error: 'Unauthorized Access'
    });

    try {
        // verifying jwt token
        const decodedPayload=jwt.verify(token,JWT_SECRET);

        // Attaching user information to request object
        req.userPayload=decodedPayload;
        next();
    } catch (error) {
        return resp.status(StatusCodes.UNAUTHORIZED).json({
            Error: 'Invalid Token'
        }) ;
    }

}

module.exports={
    jwtAuthMiddleware
}