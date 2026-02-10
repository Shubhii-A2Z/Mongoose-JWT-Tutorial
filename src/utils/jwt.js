const jwt=require('jsonwebtoken');

const { JWT_SECRET } = require('../config/serverConfig');

function generateToken(userData){
    // Genarating a new JWT token using user data
    return jwt.sign({userData},JWT_SECRET,{expiresIn: 8*60*60}); // Setting expiry of token as 8 hrs
}

module.exports={
    generateToken
}