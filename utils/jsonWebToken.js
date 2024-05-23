const jwt = require("jsonwebtoken")

const generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.SECRET_KEY)
}

module.exports = { generateAccessToken }