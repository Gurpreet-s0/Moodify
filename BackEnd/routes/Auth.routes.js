const express = require("express")
const authRouter = express.Router()
const {authRegisterController, authLoginController} = require("../controllers/auth.controller")

authRouter.post("/register", authRegisterController)
authRouter.post("/login",authLoginController)

module.exports = authRouter