const express = require("express")
const { checkDuplicateEmail, checkDuplicateUsername } = require("../middlewares/verifySignUp")
const controller = require("../controllers/user")

const router = express.Router()

router.post("/register", [checkDuplicateEmail, checkDuplicateUsername], controller.signUp)
router.post("/login", controller.signIn)

module.exports = router