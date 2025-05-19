const jwt = require('jsonwebtoken')

module.exports = async (paylod) => {
    const jsonToken = await jwt.sign(paylod, process.env.JWT_SECRYT_KEY, {expiresIn:'10m'})

    return jsonToken
} 