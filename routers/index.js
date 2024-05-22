const express = require("express")
const { verifyToken } = require("../middlewares/authJsonWebToken")

const router = express.Router()

router.get("/", (req, res) => {
    return res.send("Hello World")
})

router.get("/access-jwt", verifyToken, (req, res) => {
    return res.send("oke masuk")
})

module.exports = router