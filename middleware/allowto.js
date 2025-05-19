const apperror = require('../utility/apperror')

module.exports = (...roals) => {
    return (req, res, next) => {
        if (!roals.includes(req.decoded.role)) {
            const data = apperror.creat('you not have primtion to open this', 401, 'fail')
            return next(data)
        }

        next();
    }
}