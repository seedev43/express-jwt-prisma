const dotenv = require("dotenv")
const express = require("express")
const cors = require("cors")
const router = require("./routers")
const userRoute = require("./routers/user")

const app = express()
dotenv.config()
const PORT = process.env.PORT || 8080;

// setting cors
app.use(cors())

// parse requests of content-type - application/json
app.use(express.json())

app.use(router)
app.use("/user", userRoute)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});