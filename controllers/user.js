const User = require("../models/user")
const bcrypt = require("bcryptjs")
const utils = require("../utils/jsonWebToken")


const signUp = async (req, res) => {
    // get value from request body
    const { username, name, email, password } = req.body
    if (!username || !email || !password) {
        return res.status(400).send({
            message: "username, email, and password are required"
        })
    }
    // save user to database
    try {
        await User.create({
            data: {
                name: name ?? `User`,
                username: username,
                email: email,
                password: bcrypt.hashSync(password, 12)
            }
        })
        // console.log(user)
        return res.status(201).send({
            message: "user registered successfully"
        })
    } catch (error) {
        return res.status(500).send({
            message: "something error"
        })
    }
}

const signIn = async (req, res) => {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
        return res.status(400).send({
            message: "username, email, and password are required"
        })
    }

    try {
        const user = await User.findFirst({
            where: {
                username: req.body.username
            }
        })

        if (!user) {
            return res.status(404).send({
                message: "user not found"
            })
        }
        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                message: "invalid password",
            })
        }

        const token = utils.generateAccessToken({
            id: user.id,
            name: user.name,
            username: user.username
        })

        return res.status(200).send({
            accessToken: token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "something error"
        })
    }
}
module.exports = { signUp, signIn }