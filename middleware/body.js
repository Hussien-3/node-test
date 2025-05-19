const {body} = require('express-validator')

function validator () {
    return [
        body('email').notEmpty().withMessage('email is empty'),
        body('password').notEmpty().withMessage('passwrod is empty')
    ]
}



module.exports = {
    validator
}