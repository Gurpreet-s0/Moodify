require("dotenv").config()
const express = require("express")
const app = express()
const authRouter = require("./routes/Auth.routes")
app.use(express.json())
const cookie = require("cookie-parser")
app.use(cookie())
app.use("/api/auth",authRouter)

module.exports = app
