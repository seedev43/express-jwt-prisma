const User = require("../models/user")
const bcrypt = require("bcryptjs")
const utils = require("../utils/jsonWebToken")
const { getRandomNumber } = require("../utils/functions")
const { StatusCodes, getReasonPhrase } = require('http-status-codes');


const register = async (req, res) => {
    // get value from request body
    const { username, name, email, password } = req.body
    if (!username || !email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "username, email, and password are required"
        })
    }
    // save user to database
    try {
        const user = await User.create({
            data: {
                name: name ?? `User #${getRandomNumber(1, 99)}`,
                username: username,
                email: email,
                password: bcrypt.hashSync(password, 12)
            }
        })

        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "user registered successfully",
            data: user
        })
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "something error",
            error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
        })
    }
}

const login = async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "username, and password are required"
        })
    }

    try {
        const user = await User.findFirst({
            where: {
                username: req.body.username
            }
        })

        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "user not found"
            })
        }
        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
                message: "invalid password",
            })
        }

        const token = utils.generateAccessToken({
            id: user.id,
            name: user.name,
            username: user.username
        })

        return res.status(StatusCodes.OK).json({
            success: true,
            accessToken: token
        })

    } catch (error) {
        // console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "something error"
        })
    }
}
module.exports = { register, login }