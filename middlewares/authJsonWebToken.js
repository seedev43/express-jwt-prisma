const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    let tokenHeader = req.header('Authorization');

    if (tokenHeader?.split(' ')[0] !== 'Bearer') {
        return res.status(500).send({
            message: "Incorrect token format"
        });
    }

    let token = tokenHeader?.split(' ')[1];

    if (!token) {
        return res.status(403).send({
            message: "No token provided!",
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        req.userId = decoded.id
        next()

    } catch (error) {
        return res.status(401).send({
            message: "Unauthorized!",
        })
    }
}

module.exports = { verifyToken }