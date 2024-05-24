const express = require("express")
const controller = require("../controllers/user")
const checkDuplicateEmailOrUsername = require("../middlewares/verifySignUp")

const router = express.Router()

router.post("/register", checkDuplicateEmailOrUsername, controller.register)
router.post("/login", controller.login)

module.exports = router