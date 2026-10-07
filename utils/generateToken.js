
const jwt = require('jsonwebtoken')
module.exports = async (payLoad) => {
        const token =  jwt.sign(payLoad, process.env.JWT_TOKEN_KEY)
        return token
} 