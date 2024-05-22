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
                message: "Failed! email is already in use!"
            })
        }
        next()
    } catch (error) {
        return res.status(500).send({
            message: "Something error!"
        })
    }
}

module.exports = { checkDuplicateEmail }