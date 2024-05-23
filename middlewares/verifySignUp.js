const { StatusCodes } = require('http-status-codes');
const prisma = require('../config/prisma');

const checkDuplicateEmailOrUsername = async (req, res, next) => {
    try {
        const { email, username } = req.body;

        // Check for existing email
        const emailUser = await prisma.user.findUnique({
            where: { email }
        });

        if (emailUser) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "email is already in use"
            });
        }

        // Check for existing username
        const usernameUser = await prisma.user.findUnique({
            where: { username }
        });

        if (usernameUser) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "username is already in use"
            });
        }

        next();
    } catch (error) {
        console.error('Error checking duplicate email or username:', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "something went wrong"
        });
    }
}

module.exports = checkDuplicateEmailOrUsername;
