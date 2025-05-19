const apperror = require('../utility/apperror')
const jsend = require('../utility/statustext')
const jwt = require('jsonwebtoken'); 
const asyncHandler = require("express-async-handler") 

const verifyHeader = asyncHandler((req, res, next) => {
    const authHeader = req.headers['authorization'] || req.headers['Authorization']

    if (!authHeader) {
        const data = apperror.creat('authHeader', 401, jsend.fail);
        return next(data);
    }

    const token = authHeader.split(' ')[1]; 

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRYT_KEY);

        req.decoded = decoded

        next(); 
    } catch (err) {
        const data = apperror.creat("invald token", 401, jsend.error);
        return next(data);
    }
});

module.exports = verifyHeader