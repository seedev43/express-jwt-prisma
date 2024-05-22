const User = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


const signUp = async (req, res) => {
    // get value from request body
    const { name, email, password } = req.body
    if (!email || !password) {
        return res.status(400).send({
            message: "email, and password are required"
        })
    }
    // save user to database
    try {
        await User.create({
            data: {
                name: name ?? `User`,
                email: email,
                password: bcrypt.hashSync(password, 12)
            }
        })
        // console.log(user)
        return res.status(201).send({
            message: "User registered successfully"
        })
    } catch (error) {
        return res.status(500).send({
            message: "Something error!"
        })
    }
}

const signIn = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).send({
            message: "email, and password are required"
        })
    }

    try {
        const user = await User.findFirst({
            where: {
                email: req.body.email
            }
        })

        if (!user) {
            return res.status(404).send({
                message: "User Not found."
            })
        }
        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                message: "Invalid Password!",
            })
        }

        const token = jwt.sign({ id: user.id },
            process.env.SECRET_KEY,
            {
                algorithm: 'HS256',
                allowInsecureKeySizes: true,
                expiresIn: 86400, // 24 hours
            });

        console.log(token);
        res.status(200).send({
            accessToken: token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Something error!"
        })
    }
}
module.exports = { signUp, signIn }