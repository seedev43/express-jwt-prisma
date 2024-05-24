const express = require("express")
const { verifyToken } = require("../middlewares/authJsonWebToken")

const router = express.Router()

router.get("/", (req, res) => {
    return res.send("Hello World")
})

router.get("/dashboard", verifyToken, (req, res) => {
    return res.send("halaman dashboard")
})

module.exports = router