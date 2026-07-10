require("dotenv").config()
const express = require("express")
const cors = require("cors")
const authRouter = require("./routes/Auth.routes")
const cookie = require("cookie-parser")
const songRouter = require("../src/routes/Songs.routes")
const app = express()

app.use(cors({
    origin:"https://moodify-v1wp2gav3-gurpreet-s0s-projects.vercel.app",
    credentials:true
}))
app.use(express.json())
app.use(cookie())
app.use("/api/auth",authRouter)
app.use("/api",songRouter)

module.exports = app
