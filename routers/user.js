const express = require("express")
const { checkDuplicateEmail } = require("../middlewares/verifySignUp")
const controller = require("../controllers/user")

const router = express.Router()

router.post("/sign-up", checkDuplicateEmail, controller.signUp)
router.post("/sign-in", controller.signIn)

module.exports = router