const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    let token = req.header('Authorization');

    // console.log(token);
    if (token?.split(" ")[0] !== 'Bearer') {
        return res.status(500).send({
            message: "bearer token is missing"
        });
    }

    token = token.split(" ")[1]

    if (!token) {
        return res.status(403).send({
            message: "no token provided",
        })
    }

    // console.log(token);
    try {
        const user = jwt.verify(token, process.env.SECRET_KEY)

        // console.log(user);
        req.user = user
        next()

    } catch (error) {
        return res.status(401).send({
            message: "unauthorized",
        })
    }
}

module.exports = { verifyToken }