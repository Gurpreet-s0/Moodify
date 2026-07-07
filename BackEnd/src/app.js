require("dotenv").config()
const express = require("express")
const cors = require("cors")
const authRouter = require("./routes/Auth.routes")
const cookie = require("cookie-parser")
const app = express()

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json())
app.use(cookie())
app.use("/api/auth",authRouter)


module.exports = app
