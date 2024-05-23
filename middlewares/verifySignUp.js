const User = require("../models/user")

const checkDuplicateEmail = async (req, res, next) => {
    try {
        const user = await User.findUnique({
            where: {
                email: req.body.email
            }
        })
        // console.log(user);
        if (user) {
            return res.status(400).send({
                message: "email is already in use"
            })
        }
        next()
    } catch (error) {
        return res.status(500).send({
            message: "something error"
        })
    }
}

const checkDuplicateUsername = async (req, res, next) => {
    try {
        const user = await User.findUnique({
            where: {
                username: req.body.username
            }
        })
        // console.log(user);
        if (user) {
            return res.status(400).send({
                message: "username is already in use"
            })
        }
        next()
    } catch (error) {
        return res.status(500).send({
            message: "something error"
        })
    }
}
module.exports = { checkDuplicateEmail, checkDuplicateUsername }